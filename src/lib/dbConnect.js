import { MongoClient, ServerApiVersion } from "mongodb";
export default function dbConnect(collectionName) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  async function run() {
    try {
      await client.connect();
    } finally {
    }
  }
  return client.db(process.env.DB_NAME).collection(collectionName);
}
