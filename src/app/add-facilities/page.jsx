"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Input,
  TextArea,
} from "@heroui/react";
import { ToastContainer, toast } from 'react-toastify';
import { authClient } from "@/lib/auth-client";

export default function AddFacilityForm() {
  const [loading, setLoading] = useState(false);

  const facilityTypes = [
    "Football Turf",
    "Cricket Ground",
    "Badminton Court",
    "Swimming Pool",
    "Basketball Court",
    "Gymnasium",
    "Tennis Court",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const facilityData = Object.fromEntries(formData.entries());


    // const facilityData = {
    //   name: form.name.value,
    //   facility_type: form.facility_type.value,
    //   image_url: form.image_url.value,
    //   location: form.location.value,
    //   price_per_hour: form.price_per_hour.value,
    //   capacity: form.capacity.value,
    //   available_slots: form.available_slots.value,
    //   description: form.description.value,
    //   owner_email: form.owner_email.value,
    // };

    console.log(facilityData);

    const {data: tokenData} = await authClient.token()

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilities`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(facilityData)
    })
    const data = await res.json();
    console.log(data);
    toast.success("Facility added successfully!");
   
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Card className="shadow-2xl border border-default-200 rounded-[28px]">
        <CardContent className="p-8 md:p-10">
          <div className="mb-8 space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
              Facility Details
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Add New Facility
            </h1>
            <p className="max-w-2xl text-base text-slate-600">
              Share the facility details clearly so recruiters and visitors can review the location, price, capacity, and availability at a glance.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <fieldset className="grid grid-cols-1 gap-6">

              {/* Facility Name */}
              <Input
                name="name"
                label="Facility Name"
                placeholder="Enter facility name"
                variant="bordered"
                required
              />

              {/* Facility Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Facility Type</label>
                <select
                  name="facility_type"
                  className="input input-bordered w-full"
                  required
                >
                  <option value="" disabled>
                    Select facility type
                  </option>
                  {facilityTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image URL */}
              <Input
                name="image_url"
                type="url"
                label="Image Upload URL"
                placeholder="https://i.ibb.co/example.jpg"
                description="Use imgbb or postimage link"
                variant="bordered"
                required
              />

              {/* Location */}
              <Input
                name="location"
                label="Location"
                placeholder="Dhaka, Bangladesh"
                variant="bordered"
                required
              />

              {/* Price */}
              <Input
                name="price_per_hour"
                type="number"
                label="Price Per Hour"
                placeholder="2500"
                variant="bordered"
                required
              />

              {/* Capacity */}
              <Input
                name="capacity"
                type="number"
                label="Capacity"
                placeholder="20 Players"
                variant="bordered"
                required
              />

              {/* Available Slots */}
              <Input
                name="available_slots"
                label="Available Time Slots"
                placeholder="6AM-8AM, 4PM-6PM"
                variant="bordered"
                required
              />

              {/* Description */}
              <TextArea
                name="description"
                label="Description"
                placeholder="Write facility details..."
                variant="bordered"
                rows={5}
                required
              />

              {/* Owner Email */}
              <Input
                name="owner_email"
                type="email"
                label="Owner Email"
                defaultValue="owner@gmail.com"
                variant="bordered"
                readOnly
                className="md:col-span-2"
              />
            </fieldset>

            <Button
              type="submit"
              color="primary"
              size="lg"
              className="w-full mt-8 font-semibold"
              isLoading={loading}
            >
              Add Facility
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}