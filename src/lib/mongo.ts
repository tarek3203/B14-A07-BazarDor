import { MongoClient } from "mongodb";

// one client per process, reused across hot reloads in dev and across warm
// serverless invocations in production, so we never pile up connections
const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
};

export const mongoClient =
  globalForMongo.mongoClient ??
  new MongoClient(process.env.MONGODB_URL as string, {
    retryReads: true,
    retryWrites: true,
    serverSelectionTimeoutMS: 20000,
    family: 4,
  });

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = mongoClient;
}

export const mongoDb = mongoClient.db("bazar-dor");
