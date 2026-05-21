import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI is not defined in environment variables.");
}

const client = new MongoClient(uri);
const clientPromise = client.connect();

export async function GET(request, { params }) {
  await clientPromise;
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid facility ID." }, { status: 400 });
  }

  const db = client.db("sportsnest");
  const facility = await db.collection("facilities").findOne({ _id: new ObjectId(id) });

  if (!facility) {
    return NextResponse.json({ error: "Facility not found." }, { status: 404 });
  }

  return NextResponse.json(facility);
}

export async function PUT(request, { params }) {
  await clientPromise;
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid facility ID." }, { status: 400 });
  }

  const body = await request.json();
  const updateData = {
    name: body.name,
    facility_type: body.facility_type,
    image_url: body.image_url,
    location: body.location,
    price_per_hour: body.price_per_hour,
    capacity: body.capacity,
    available_slots: body.available_slots,
    description: body.description,
  };

  const db = client.db("sportsnest");
  const result = await db.collection("facilities").updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );

  return NextResponse.json(result);
}

export async function DELETE(request, { params }) {
  await clientPromise;
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid facility ID." }, { status: 400 });
  }

  const db = client.db("sportsnest");
  const result = await db.collection("facilities").deleteOne({ _id: new ObjectId(id) });

  return NextResponse.json(result);
}
