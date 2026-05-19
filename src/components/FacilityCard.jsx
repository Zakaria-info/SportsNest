import Image from "next/image";
import { MapPin, Users, Clock, BadgeDollarSign } from "lucide-react";

const FacilityCard = ({ facility }) => {
  const {
    name,
    facility_type,
    image_url,
    location,
    price_per_hour,
    capacity,
    available_slots,
    description,
  } = facility;

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={image_url}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        
        {/* Title */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
          <p className="text-sm font-medium text-blue-600">
            {facility_type}
          </p>
        </div>

        {/* Info */}
        <div className="space-y-2 text-sm text-gray-600">
          
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-red-500" />
            <span>{location}</span>
          </div>

          <div className="flex items-center gap-2">
            <BadgeDollarSign size={18} className="text-green-600" />
            <span>৳ {price_per_hour} / hour</span>
          </div>

          <div className="flex items-center gap-2">
            <Users size={18} className="text-purple-600" />
            <span>Capacity: {capacity} Players</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={18} className="text-orange-500" />
            <span>{available_slots}</span>
          </div>
        </div>

        {/* Description */}
        <p className="line-clamp-2 text-sm text-gray-500">
          {description}
        </p>

        {/* Button */}
        <button className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-600">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default FacilityCard;