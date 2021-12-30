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

    if (req.method === 'GET') {
      const result = await collection.find().toArray();
      if (result.length === 0) {
        res.status(404).json({ body: 'no templates found' });
      } else {
        res.status(200).json({ body: result });
      }
    }
  } catch (err) {
    res.status(500).json({ error: 'server error' });
  } finally {
    await client?.close();
  }
}

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
