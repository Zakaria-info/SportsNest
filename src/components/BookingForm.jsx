"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const BookingForm = ({ facility }) => {
  const {
    _id,
    name,
    image_url,
    price_per_hour,
  } = facility;

  const [hours, setHours] = useState(1);

  const totalPrice = hours * price_per_hour;

  
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const userEmail = session?.user?.email || "user@gmail.com";

  const handleBooking = async (e) => {
  e.preventDefault();

  const form = e.target;

  const bookingDate = form.bookingDate.value;
  const timeSlot = form.timeSlot.value;

  const bookingData = {
    facility_id: _id,
    facility_name: name,
    facility_image: image_url,
    booking_date: bookingDate,
    time_slot: timeSlot,
    hours,
    price: totalPrice,
    status: "pending",
    user_email: userEmail,
  };

  const {data:tokenData} = await authClient.token()
  



  try {
    const res = await fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify(bookingData),
    });

    if (!res.ok) {
      throw new Error("Failed to save booking");
    }

    await res.json();

    toast.success("Booking successful");
    form.reset();
    router.push("/bookings");

  } catch (error) {
    console.error(error);
    toast.error("Booking failed");
  }
};

  return (
    <div className="h-fit rounded-[30px] border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-lg md:p-8 lg:sticky lg:top-10">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800">
          Book Facility
        </h2>

        <p className="mt-3 text-gray-500">
          Complete the booking form to reserve your slot.
        </p>
      </div>

      <form onSubmit={handleBooking} className="space-y-5">
        {/* Facility Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Facility Name
          </label>

          <input
            type="text"
            defaultValue={name}
            readOnly
            className="w-full rounded-2xl border border-gray-300 bg-gray-100 px-5 py-4 text-gray-700 outline-none"
          />
        </div>

        {/* Booking Date */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Booking Date
          </label>

          <input
            type="date"
            name="bookingDate"
            required
            className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Time Slot */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Time Slot
          </label>

          <select
            name="timeSlot"
            required
            className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="">Select Time Slot</option>

            <option>6 AM - 8 AM</option>

            <option>8 AM - 10 AM</option>

            <option>10 AM - 12 PM</option>

            <option>4 PM - 6 PM</option>

            <option>6 PM - 8 PM</option>
          </select>
        </div>

        {/* Hours */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Hours
          </label>

          <input
            type="number"
            min="1"
            required
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            placeholder="Enter total booking hours"
            className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Total Price */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Total Price
          </label>

          <input
            type="text"
            readOnly
            value={`৳ ${totalPrice}`}
            className="w-full rounded-2xl border border-gray-300 bg-gray-100 px-5 py-4 text-gray-700 outline-none"
          />
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-black to-gray-800 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:from-blue-600 hover:to-blue-500"
        >
          <CalendarDays size={22} />

          Confirm Booking
        </button>
      </form>

      <div className="mt-6 rounded-2xl bg-blue-50 p-4 text-sm leading-7 text-blue-700">
        Your booking request will be saved with
        <span className="font-bold"> pending </span>
        status until approval.
      </div>
    </div>
  );
};

export default BookingForm;