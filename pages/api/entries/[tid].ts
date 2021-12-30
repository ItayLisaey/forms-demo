// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'bson';
import { AnyError, MongoClient, UpdateResult } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { FormFieldTemplate, FormTemplate } from '../../../types/builder.types';

type Data = {
  body?: any;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let client: MongoClient | null = null;

  try {
    client = await getMongoClient(res);
    const templateCollection = client.db('forms-demo').collection('templates');
    const entriesCollection = client.db('forms-demo').collection('entries');

    const { tid } = req.query;

    if (req.method === 'POST') {
      const template = (await templateCollection.findOne({
        id: tid,
      })) as unknown as FormTemplate;

      const entry = isEntryValid(req.body, template) && req.body;
      if (!entry) {
        res.status(400).json({ error: 'invalid entry' });
      }
      const result = await entriesCollection.updateOne(
        { tid: tid },
        {
          $set: {
            title: template.title,
            tid: template.id,
          },
          $push: { entries: entry },
        },
        {
          upsert: true,
        }
      );

      if (result.acknowledged) {
        res.status(201).json({ body: 'goodie' });
      } else {
        res.status(500).json({ error: 'server error' });
      }
    } else if (req.method === 'GET') {
      const entries = await entriesCollection.findOne({ tid: tid });
      if (entries) {
        res.status(200).json({ body: entries });
      } else {
        res.status(404).json({ error: 'not found' });
      }
    } else {
      res.status(405);
    }
  } catch (err) {
    res.status(500).json({ error: 'server error' });
  } finally {
    await client?.close();
  }
}

const isEntryValid = (
  candidate: any,
  template: FormTemplate
): candidate is Record<string, string> => {
  if (Object.entries(candidate).length !== template.fields.length) return false;
  return true;
};

const handleUpdateResult = (
  error: AnyError | undefined,
  result: UpdateResult | undefined,
  context: NextApiResponse<Data>
) => {
  if (error) {
    context.status(500).json({ error: 'server error' });
  } else if (result) {
    context.status(201);
  } else {
    context.status(500).json({ error: 'server error' });
  }
};

export async function getMongoClient(
  context: NextApiResponse<Data>
): Promise<MongoClient> {
  if (!process.env.MONGO) {
    context.status(500).json({
      body: 'missing connection string to database',
    });
    throw new Error('missing connection string to database');
  }

  const client = new MongoClient(process.env.MONGO);

  client.on('serverClosed', () => console.log('live connection server closed'));

  client.on('open', () =>
    console.log('live connection to the database opened')
  );
  client.on('close', () =>
    console.log('live connection to the database closed')
  );
  client.on('error', (err) =>
    console.log('live connection to the database errored out', err)
  );

  return await client.connect();
}
