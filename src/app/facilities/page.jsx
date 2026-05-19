import FacilityCard from "@/components/FacilityCard";

const AllFacilityPage = async () => {
  const res = await fetch("http://localhost:5000/facilities", {

  });

  const data = await res.json();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-8 lg:px-16">
      
      {/* Heading */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          All Sports Facilities
        </h1>

        <p className="mt-3 text-gray-500">
          Find and book your favorite sports facility easily.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.map((facility) => (
          <FacilityCard
            key={facility._id}
            facility={facility}
          />
        ))}
      </div>
    </div>
  );
};

export default AllFacilityPage;