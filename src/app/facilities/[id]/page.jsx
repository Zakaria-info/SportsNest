import Image from "next/image";
import {
  MapPin,
  Users,
  Clock3,
  BadgeDollarSign,
  Mail,
  CalendarDays,
} from "lucide-react";

const FacilityDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/facilities/${id}`);

  const data = await res.json();

  const {
    name,
    facility_type,
    image_url,
    location,
    price_per_hour,
    capacity,
    available_slots,
    description,
    owner_email,
  } = data;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-slate-200 px-4 py-10 md:px-8 lg:px-16">
      {/* Main Layout */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
        {/* LEFT SIDE */}
        <div className="overflow-hidden rounded-[30px] bg-white shadow-2xl lg:col-span-2">
          {/* LARGE IMAGE */}
          <div className="relative h-70 w-full md:h-125 xl:h-150">
            <Image
              src={image_url}
              alt={name}
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
              <div className="inline-block rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                {facility_type}
              </div>

              <h1 className="mt-4 text-3xl font-bold text-white md:text-5xl">
                {name}
              </h1>

              <div className="mt-4 flex items-center gap-2 text-gray-200">
                <MapPin size={20} />
                <span>{location}</span>
              </div>
            </div>
          </div>

          <div className="space-y-8 p-6 md:p-10">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div className="rounded-3xl border border-gray-200 bg-linear-to-br from-white to-slate-50 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
                  <BadgeDollarSign className="text-green-600" size={28} />
                </div>

                <p className="text-sm text-gray-500">Price Per Hour</p>

                <h2 className="mt-2 text-3xl font-bold text-gray-800">
                  ৳ {price_per_hour}
                </h2>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-linear-to-br from-white to-slate-50 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100">
                  <Users className="text-purple-600" size={28} />
                </div>

                <p className="text-sm text-gray-500">Player Capacity</p>

                <h2 className="mt-2 text-3xl font-bold text-gray-800">
                  {capacity}
                </h2>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-linear-to-br from-white to-slate-50 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
                  <Clock3 className="text-orange-500" size={28} />
                </div>

                <p className="text-sm text-gray-500">Available Slots</p>

                <h2 className="mt-2 text-lg font-bold text-gray-800">
                  {available_slots}
                </h2>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-slate-50 p-6 md:p-8">
              <h2 className="mb-5 text-3xl font-bold text-gray-800">
                About This Facility
              </h2>

              <p className="text-lg leading-9 text-gray-600">{description}</p>
            </div>

            <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Mail className="text-blue-600" size={28} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Facility Owner</p>

                  <h3 className="text-lg font-semibold text-gray-800">
                    {owner_email}
                  </h3>
                </div>
              </div>

              <button className="rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-600">
                Contact Owner
              </button>
            </div>
          </div>
        </div>

        <div className="h-fit rounded-[30px] border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-lg md:p-8 lg:sticky lg:top-10">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-800">Book Facility</h2>

            <p className="mt-3 text-gray-500">
              Complete the booking form to reserve your slot.
            </p>
          </div>

          <form className="space-y-5">
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

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Booking Date
              </label>

              <input
                type="date"
                className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Time Slot
              </label>

              <select className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                <option>Select Time Slot</option>
                <option>6 AM - 8 AM</option>
                <option>8 AM - 10 AM</option>
                <option>10 AM - 12 PM</option>
                <option>4 PM - 6 PM</option>
                <option>6 PM - 8 PM</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Hours
              </label>

              <input
                type="number"
                placeholder="Enter total booking hours"
                className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Total Price
              </label>

              <input
                type="text"
                readOnly
                placeholder={`৳ ${price_per_hour}`}
                className="w-full rounded-2xl border border-gray-300 bg-gray-100 px-5 py-4 text-gray-700 outline-none"
              />
            </div>

            <input type="hidden" name="status" value="pending" />

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-black to-gray-800 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:from-blue-600 hover:to-blue-500"
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
      </div>
    </div>
  );
};

export default FacilityDetailsPage;
