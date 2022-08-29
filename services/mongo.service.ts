import { MongoClient } from 'mongodb';

export async function getMongoClient(): Promise<MongoClient> {
  const { DB_CONNECTION } = process.env;

  if (!DB_CONNECTION) throw new Error('missing connection string to database');

  const client = new MongoClient(DB_CONNECTION);

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
