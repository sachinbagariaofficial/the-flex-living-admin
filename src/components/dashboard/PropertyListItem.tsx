import { Star, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import type { PropertyResponseType } from "../../types/property";

export default function PropertyListItem({
  propertyDetail,
  onStatusChange,
}: {
  propertyDetail: PropertyResponseType;
  onStatusChange: (reviewId: number, newStatus: boolean) => void;
}) {
  const [isToggled, setIsToggled] = useState(
    propertyDetail.reviews?.status === "published"
  );

  useEffect(() => {
    setIsToggled(propertyDetail.reviews.status === "published");
  }, [propertyDetail?.reviews?.status]);

  const handleToggle = () => {
    const newStatus = !isToggled;
    setIsToggled(newStatus);
    onStatusChange(propertyDetail.property.propertyId, newStatus);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-slate-200/60 rounded-xl shadow-md hover:shadow-lg hover:bg-white transition-all duration-300">
      <div className="flex flex-col md:flex-row items-center md:items-stretch gap-4 md:gap-6 p-4 md:p-6">
        {/* Property Image */}
        <div className="w-full h-40 md:w-24 md:h-16 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={propertyDetail.property.mainImage}
            alt={propertyDetail.property.listingName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Property Info */}
        <div className="flex-1 space-y-1 text-center md:text-left">
          <h3 className="font-semibold text-lg text-slate-900 truncate">
            {propertyDetail.property.listingName}
          </h3>
          <p className="text-sm text-slate-500">
            {propertyDetail.property.location.city},{" "}
            {propertyDetail.property.location.country}
          </p>
        </div>

        {/* Stats + Toggle */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-end gap-4 md:gap-6 mt-2 md:mt-0 w-full md:w-auto">
          {/* Stats */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                <span className="font-semibold text-lg text-slate-900">
                  {propertyDetail.reviews?.rating}
                </span>
              </div>
              <p className="text-xs text-slate-400">Rating</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <MessageSquare className="w-4 h-4 text-blue-500" />
                <span className="font-semibold text-lg text-slate-900">1</span>
              </div>
              <p className="text-xs text-slate-400">Reviews</p>
            </div>
          </div>

          {/* Toggle Switch */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isToggled}
              onChange={handleToggle}
            />
            <div
              className={`w-14 h-8 rounded-full transition-colors duration-300 ${
                isToggled ? "bg-green-600" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                isToggled ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </label>
        </div>
      </div>
    </div>
  );
}
