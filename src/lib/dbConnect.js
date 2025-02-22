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
      await client.db("admin").command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } finally {
      await client.close();
    }
  }
  return client.db(process.env.DB_NAME).collection(collectionName);
}
