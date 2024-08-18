// global.d.ts
import { MongoClient } from 'mongodb';

declare global {
  namespace NodeJS {
    interface Global {
      _mongoClientPromise?: Promise<MongoClient>;
    }
  }
}
// global.d.ts
interface Window {
  ethereum?: any;
}

export {};
