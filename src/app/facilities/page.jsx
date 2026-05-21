"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import FacilityCard from "@/components/FacilityCard";
import { authClient } from "@/lib/auth-client";

const AllFacilityPage = () => {
  const [facilities, setFacilities] = useState([]);
  const [allFacilities, setAllFacilities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status } = authClient.useSession();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status === "unauthenticated") {
      router.replace(`/login?next=${encodeURIComponent("/facilities")}`);
    }
  }, [router, status]);

  const fetchFacilities = async (search, type) => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());
      if (type && type !== "all") params.set("type", type);

      const response = await fetch(`/api/facilities?${params.toString()}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load facilities");
      }

      const data = await response.json();
      setFacilities(data);
    } catch (err) {
      setError("Could not load facilities. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialFacilities = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/facilities", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to load facilities");
        }

        const data = await response.json();
        setAllFacilities(data);
        setFacilities(data);
      } catch (err) {
        setError("Could not load facilities. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialFacilities();
  }, []);

  useEffect(() => {
    if (searchTerm === "" && selectedType === "all") {
      return;
    }

    const loadFacilities = async () => {
      await fetchFacilities(searchTerm, selectedType);
    };

    loadFacilities();
  }, [searchTerm, selectedType]);

  const displayedFacilities = useMemo(() => {
    if (searchTerm === "" && selectedType === "all") {
      return allFacilities;
    }
    return facilities;
  }, [searchTerm, selectedType, allFacilities, facilities]);

  const facilityTypes = useMemo(() => {
    const types = Array.from(
      new Set(allFacilities.map((facility) => facility.facility_type).filter(Boolean))
    );
    return ["all", ...types];
  }, [allFacilities]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10 md:px-8 lg:px-16">
        <p className="text-sm text-slate-600">Checking access…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-8 lg:px-16">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800">All Sports Facilities</h1>

        <p className="mt-3 text-gray-500">
          Find and book your favorite sports facility easily.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="relative flex-1 min-w-0">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search facility name"
            className="w-full rounded-3xl border border-slate-200 bg-white py-3 pl-12 pr-28 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <button
            type="button"
            onClick={() => fetchFacilities(searchTerm, selectedType)}
            className="absolute right-2 top-1/2 flex h-10 -translate-y-1/2 items-center gap-2 rounded-full bg-slate-900 px-4 text-sm font-semibold text-white shadow-lg shadow-slate-200/20 transition hover:bg-slate-800"
          >
            <span className="hidden sm:inline">Search</span>
            <Search className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="min-w-45 rounded-3xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <select
              value={selectedType}
              onChange={(event) => setSelectedType(event.target.value)}
              className="w-full bg-transparent text-sm text-slate-900 outline-none"
            >
              <option value="all">All Sports Types</option>
              {facilityTypes
                .filter((type) => type !== "all")
                .map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => fetchFacilities(searchTerm, selectedType)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-blue-600 px-4 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      {error ? (
        <p className="text-center text-sm font-medium text-red-600">{error}</p>
      ) : null}

      {loading ? (
        <p className="text-center text-sm text-slate-500">Loading facilities...</p>
      ) : displayedFacilities.length === 0 ? (
        <p className="text-center text-sm text-slate-500">
          No facilities match your search or filter.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayedFacilities.map((facility) => (
            <FacilityCard key={facility._id} facility={facility} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllFacilityPage;