"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/components/Loading";

const ManagePage = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  // LOAD FACILITIES
  useEffect(() => {
    fetch("http://localhost:5000/facilities")
      .then((res) => res.json())
      .then((data) => setFacilities(data))
      .catch((err) => console.error("Failed to load facilities", err))
      .finally(() => setLoading(false));
  }, []);

  // DELETE FUNCTION
  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this facility?"
    );

    if (!confirmDelete) return;

    const {data: tokenData} = await authClient.token()

    const res = await fetch(
      `http://localhost:5000/facilities/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${tokenData?.token}`,
        }
      }
    );

    const data = await res.json();

    if (data.deletedCount > 0) {
      alert("Facility Deleted Successfully");

      const remainingFacilities = facilities.filter(
        (facility) => facility._id !== id
      );

      setFacilities(remainingFacilities);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        {/* TITLE */}
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold text-gray-800">Manage Facilities</h1>

          <p className="mt-3 text-gray-500">Update or Delete your facilities easily</p>
        </div>

        {/* GRID */}
        {loading && <Loading cards={6} />}

        {!loading && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility) => (
              <div
                key={facility._id}
                className="overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* IMAGE */}
                <div className="relative h-60 w-full">
                  <Image src={facility.image_url} alt={facility.name} fill className="object-cover" />
                </div>

                {/* CONTENT */}
                <div className="space-y-4 p-5">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{facility.name}</h2>

                    <p className="text-sm font-medium text-blue-600">{facility.facility_type}</p>
                  </div>

                  <p className="text-gray-500">{facility.location}</p>

                  <p className="font-semibold text-green-600">৳ {facility.price_per_hour} / hour</p>

                  {/* BUTTONS */}
                  <div className="flex gap-3 pt-2">
                    <Link href={`/update-facility/${facility._id}`} className="w-full">
                      <button className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">Edit</button>
                    </Link>

                    <button onClick={() => handleDelete(facility._id)} className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePage;