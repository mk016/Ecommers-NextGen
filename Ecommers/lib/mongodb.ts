import mongoose, { Mongoose } from "mongoose";
import { DB_NAME } from "./constant";

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend the global type to include mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// let isConnected = false;
// let cached = global.mongoose;
// const MONGODB_URI = process.env.MONGODB_URI;
// export async function connect() {
//   // const MONGODB2_URI =
//   //   "mongodb+srv://itshvsharma_db_user:Ot5n7pFgiDHf7pQm@restaurantmangement.unuvmuf.mongodb.net";
//   const mongoUri = `${process.env.MONGO_URI}/${DB_NAME}`;

//   if (!mongoUri) {
//     throw new Error("Missing MONGO_URI/MONGODB_URI.");
//   }

//   if (isConnected || mongoose.connection.readyState >= 1) {
//     return;
//   }

//   try {
//     await mongoose.connect(mongoUri);
//     isConnected = mongoose.connection.readyState === 1;

//     mongoose.connection.on("connected", () => {
//       console.log("MongoDB connected successfully");
//     });

//     mongoose.connection.on("error", (err) => {
//       console.error("MongoDB connection error:", err);
//       process.exit(1);
//     });
//   } catch (error) {
//     console.error("MongoDB connection failed:", error);
//     throw error;
//   }
// }

// lib/mongodb.ts

const MONGODB_URI = `${process.env.MONGODB_URI}/${DB_NAME}`;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across
 * hot reloads in development. This prevents connections growing
 * exponentially during API route usage.
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend the global type to include mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// Use the global cache if available
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectMongoDB(): Promise<Mongoose> {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      // other options like dbName, authSource, etc. can go here
    };

    cached!.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => mongoose);
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}
