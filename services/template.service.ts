import { Collection, MongoClient } from 'mongodb';

export class TemplateService {
  private dbName = 'Forms';
  private collectionName = 'templates';
  private client: MongoClient;
  private collection: Collection;
  constructor(client: MongoClient) {
    this.client = client;
    this.collection = client.db(this.dbName).collection(this.collectionName);
  }

  async getAll() {
    return this.collection.find({}).toArray();
  }

  async getOne(tid: string) {
    return this.collection.findOne({
      tid,
    });
  }

  async create() {}
}
