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

export async function POST(request) {
  try {
    await clientPromise;
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.facility_type || !body.location) {
      return NextResponse.json(
        { message: "Missing required fields: name, facility_type, location" },
        { status: 400 }
      );
    }

    const newFacility = {
      name: body.name,
      facility_type: body.facility_type,
      image_url: body.image_url,
      location: body.location,
      price_per_hour: body.price_per_hour,
      capacity: body.capacity,
      available_slots: body.available_slots,
      description: body.description,
      owner_email: body.owner_email,
      created_at: new Date(),
    };

    const db = client.db("sportsnest");
    const result = await db.collection("facilities").insertOne(newFacility);

    return NextResponse.json(
      { insertedId: result.insertedId, message: "Facility added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding facility:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
