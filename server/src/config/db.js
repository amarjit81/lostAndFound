import mongoose from "mongoose";

let connectionPromise;

export async function connectDatabase(uri = process.env.MONGO_URI) {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (connectionPromise) {
    await connectionPromise;
    return mongoose.connection;
  }
  if (!uri) throw new Error("MONGO_URI is required");
  mongoose.set("strictQuery", true);
  connectionPromise = mongoose.connect(uri).catch((error) => {
    connectionPromise = undefined;
    throw error;
  });
  await connectionPromise;
  return mongoose.connection;
}
