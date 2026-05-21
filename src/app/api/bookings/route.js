import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI is not defined in environment variables.");
}

const client = new MongoClient(uri);
const clientPromise = client.connect();

export async function GET(request) {
  try {
    await clientPromise;
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    const query = {};
    if (email) {
      query.user_email = email;
    }

    const db = client.db("sportsnest");
    const bookings = await db.collection("bookings").find(query).toArray();

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await clientPromise;
    const body = await request.json();

    // Validate required fields
    if (!body.facility_id || !body.booking_date || !body.time_slot || !body.user_email) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newBooking = {
      facility_id: body.facility_id,
      facility_name: body.facility_name,
      facility_image: body.facility_image,
      booking_date: body.booking_date,
      time_slot: body.time_slot,
      hours: body.hours || 1,
      price: body.price || 0,
      status: body.status || "pending",
      user_email: body.user_email,
      created_at: new Date(),
    };

    const db = client.db("sportsnest");
    const result = await db.collection("bookings").insertOne(newBooking);

    return NextResponse.json(
      { insertedId: result.insertedId, message: "Booking created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
