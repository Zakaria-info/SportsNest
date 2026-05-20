import Image from "next/image";
import {
  MapPin,
  Users,
  Clock3,
  BadgeDollarSign,
  Mail,
} from "lucide-react";

import BookingForm from "@/components/BookingForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const FacilityDetailsPage = async ({ params }) => {
  const { id } = await params;
  const {token} = await auth.api.getToken({
    headers: await headers(),
  })
  console.log(token)

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/${id}`,{
      headers: {
        authorization: `Bearer ${token}`
      },
    }
  );

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
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
        {/* LEFT SIDE */}
        <div className="overflow-hidden rounded-[30px] bg-white shadow-2xl lg:col-span-2">
          {/* IMAGE */}
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

          {/* CONTENT */}
          <div className="space-y-8 p-6 md:p-10">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {/* PRICE */}
              <div className="rounded-3xl border border-gray-200 bg-linear-to-br from-white to-slate-50 p-6 shadow-sm">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
                  <BadgeDollarSign
                    className="text-green-600"
                    size={28}
                  />
                </div>

                <p className="text-sm text-gray-500">
                  Price Per Hour
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-800">
                  ৳ {price_per_hour}
                </h2>
              </div>

              {/* CAPACITY */}
              <div className="rounded-3xl border border-gray-200 bg-linear-to-br from-white to-slate-50 p-6 shadow-sm">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100">
                  <Users
                    className="text-purple-600"
                    size={28}
                  />
                </div>

                <p className="text-sm text-gray-500">
                  Player Capacity
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-800">
                  {capacity}
                </h2>
              </div>

              {/* SLOT */}
              <div className="rounded-3xl border border-gray-200 bg-linear-to-br from-white to-slate-50 p-6 shadow-sm">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
                  <Clock3
                    className="text-orange-500"
                    size={28}
                  />
                </div>

                <p className="text-sm text-gray-500">
                  Available Slots
                </p>

                <h2 className="mt-2 text-lg font-bold text-gray-800">
                  {available_slots}
                </h2>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="rounded-3xl border border-gray-200 bg-slate-50 p-6 md:p-8">
              <h2 className="mb-5 text-3xl font-bold text-gray-800">
                About This Facility
              </h2>

              <p className="text-lg leading-9 text-gray-600">
                {description}
              </p>
            </div>

            {/* OWNER */}
            <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Mail className="text-blue-600" size={28} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Facility Owner
                  </p>

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

        {/* RIGHT SIDE */}
        <BookingForm facility={data} />
      </div>
    </div>
  );
};

export default FacilityDetailsPage;