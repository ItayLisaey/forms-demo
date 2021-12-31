// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'bson';
import { MongoClient } from 'mongodb';
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
    const collection = client.db('forms-demo').collection('templates');
    const { tid } = req.query;

    if (req.method === 'POST') {
      const template = isTemplate(req.body) && (req.body as FormTemplate);

      if (!template) {
        res.status(400).json({ error: 'validation error' });
      } else {
        const result = await collection.updateOne(
          { id: tid },
          { $set: { ...template } },
          { upsert: true }
        );

        if (!result.acknowledged) {
          throw Error('mongo error');
        }
      }

      res.status(200).json({ body: req.body });
    } else if (req.method === 'GET') {
      const result = await collection.findOne({ id: tid });

      if (!result) {
        res.status(404).json({ body: 'no template found' });
      } else {
        const { _id, ...other } = result;
        res.status(200).json({ body: other });
      }
    } else {
      res.status(405);
    }
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: 'server error' });
  } finally {
    await client?.close();
  }
}

const isTemplate = (candidate: any): candidate is FormTemplate => {
  if (candidate.title === undefined) return false;
  // if (!ObjectId.isValid(candidate.id)) return false;
  if (!Array.isArray(candidate.fields)) return false;

  candidate.fields.forEach((field: any) => {
    if (!isFieldTemplate(field)) {
      return false;
    }
  });

  return true;
};

const isFieldTemplate = (candidate: any): candidate is FormFieldTemplate => {
  if (candidate.title === undefined) return false;
  if (!ObjectId.isValid(candidate.id)) return false;
  if (typeof candidate.required !== 'boolean') return false;
  if (
    !(
      candidate.type === 'text' ||
      candidate.type === 'dropdown' ||
      candidate.type === 'radio' ||
      candidate.type === 'checkbox'
    )
  )
    return false;

  if (candidate.type !== 'text') {
    if (!Array.isArray(candidate.options)) return false;
  }

  return true;
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
