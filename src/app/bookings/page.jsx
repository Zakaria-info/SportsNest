"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  BadgeDollarSign,
} from "lucide-react";

import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import Loading from "@/components/Loading";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = authClient.useSession();

  const userEmail = session?.user?.email || "user@gmail.com";

  useEffect(() => {
    if (!userEmail) return;

    setLoading(true);

    fetch(`http://localhost:5000/bookings?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((error) => {
        console.error("Failed to load bookings", error);
        toast.error("Could not load bookings");
      })
      .finally(() => setLoading(false));
  }, [userEmail]);

  const handleCancelBooking = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:5000/bookings/${id}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Booking Cancelled");

        const remaining = bookings.filter(
          (booking) => booking._id !== id,
        );

        setBookings(remaining);
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed To Cancel Booking");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 md:px-8 lg:px-16">
      {/* HEADING */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          My Bookings
        </h1>

        <p className="mt-3 text-gray-500">
          Manage your booked sports facilities.
        </p>
      </div>

      {/* EMPTY / LOADING */}
      {loading ? (
        <Loading cards={3} />
      ) : bookings.length === 0 ? (
        <div className="rounded-3xl bg-white p-10 text-center shadow">
          <h2 className="text-2xl font-bold text-gray-700">No Bookings Found</h2>

          <p className="mt-3 text-gray-500">You have not booked any facility yet.</p>
        </div>
      ) : null}

      {/* BOOKING CARDS */}
      <div className="grid sm:grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            {/* IMAGE */}
            <div className="relative h-64 w-full">
              <Image
                src={booking.facility_image}
                alt={booking.facility_name}
                fill
                className="object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="space-y-5 p-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {booking.facility_name}
                </h2>

                <span className="mt-3 inline-block rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold capitalize text-yellow-700">
                  {booking.status}
                </span>
              </div>

              {/* DETAILS */}
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-3">
                  <CalendarDays
                    size={20}
                    className="text-blue-600"
                  />

                  <span>{booking.booking_date}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock3
                    size={20}
                    className="text-orange-500"
                  />

                  <span>{booking.time_slot}</span>
                </div>

                <div className="flex items-center gap-3">
                  <BadgeDollarSign
                    size={20}
                    className="text-green-600"
                  />

                  <span>৳ {booking.price}</span>
                </div>
              </div>

              {/* BUTTON */}
              <button
                onClick={() =>
                  handleCancelBooking(booking._id)
                }
                className="w-full rounded-2xl bg-red-500 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-600"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookingsPage;