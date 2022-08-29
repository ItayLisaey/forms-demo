// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getMongoClient } from '../../../services/mongo.service';
import { TemplateService } from '../../../services/template.service';

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
    client = await getMongoClient();
    const templateService = new TemplateService(client);

    if (req.method === 'GET') {
      const result = await templateService.getAll();
      if (result.length === 0) {
        res.status(404).json({ body: 'no templates found' });
      } else {
        res.status(200).json({ body: result });
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
