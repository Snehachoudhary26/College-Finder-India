import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://toriiijournal_db_user:Sneha%402620@collegediscovery.mg10cas.mongodb.net/college-discovery";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;