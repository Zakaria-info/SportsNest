import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI is not defined in environment variables.");
}

const client = new MongoClient(uri);
const clientPromise = client.connect();

export async function GET(request) {
  await clientPromise;

  const url = new URL(request.url);
  const search = url.searchParams.get("search")?.trim();
  const type = url.searchParams.get("type")?.trim();

  const query = {};

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  if (type && type !== "all") {
    query.facility_type = { $in: [type] };
  }

  const db = client.db("sportsnest");
  const facilities = await db.collection("facilities").find(query).toArray();

  return NextResponse.json(facilities);
}
