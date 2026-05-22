"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAuthToken } from "@/lib/auth-client";

const UpdateFacilityPage = () => {
  const { id } = useParams();

  const router = useRouter();

  const [facility, setFacility] = useState(null);

  // LOAD SINGLE FACILITY
  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const res = await fetch(`/api/facilities/${id}`, {
          cache: "no-store",
          headers: {
            Method: "POST",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to load facility");
        }
        const data = await res.json();
        setFacility(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFacility();
  }, [id]);

  // UPDATE FUNCTION
  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedFacility = {
      name: form.name.value,
      facility_type: form.facility_type.value,
      image_url: form.image_url.value,
      location: form.location.value,
      price_per_hour: form.price_per_hour.value,
      capacity: form.capacity.value,
      available_slots: form.available_slots.value,
      description: form.description.value,
    };

    const token = await getAuthToken();
    const res = await fetch(`/api/facilities/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedFacility),
    });

    const data = await res.json();

    if (data.modifiedCount > 0) {
      alert("Facility Updated Successfully");

      router.push("/manage");
    }
  };

  // LOADING
  if (!facility) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-4xl font-bold">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl">
        {/* TITLE */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold">
            Update Facility
          </h1>

          <p className="mt-3 text-gray-500">
            Update your facility information
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          <input
            type="text"
            name="name"
            defaultValue={facility.name}
            placeholder="Facility Name"
            className="rounded-2xl border p-4 outline-none focus:border-blue-500"
          />

          <input
            type="text"
            name="facility_type"
            defaultValue={facility.facility_type}
            placeholder="Facility Type"
            className="rounded-2xl border p-4 outline-none focus:border-blue-500"
          />

          <input
            type="text"
            name="image_url"
            defaultValue={facility.image_url}
            placeholder="Image URL"
            className="rounded-2xl border p-4 outline-none focus:border-blue-500 md:col-span-2"
          />

          <input
            type="text"
            name="location"
            defaultValue={facility.location}
            placeholder="Location"
            className="rounded-2xl border p-4 outline-none focus:border-blue-500"
          />

          <input
            type="number"
            name="price_per_hour"
            defaultValue={facility.price_per_hour}
            placeholder="Price Per Hour"
            className="rounded-2xl border p-4 outline-none focus:border-blue-500"
          />

          <input
            type="number"
            name="capacity"
            defaultValue={facility.capacity}
            placeholder="Capacity"
            className="rounded-2xl border p-4 outline-none focus:border-blue-500"
          />

          <input
            type="text"
            name="available_slots"
            defaultValue={facility.available_slots}
            placeholder="Available Slots"
            className="rounded-2xl border p-4 outline-none focus:border-blue-500"
          />

          <textarea
            name="description"
            defaultValue={facility.description}
            placeholder="Description"
            rows={5}
            className="rounded-2xl border p-4 outline-none focus:border-blue-500 md:col-span-2"
          />

          <button className="rounded-2xl bg-black py-4 text-lg font-semibold text-white transition hover:bg-blue-600 md:col-span-2">
            Update Facility
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFacilityPage;