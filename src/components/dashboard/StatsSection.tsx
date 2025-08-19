import { useMemo } from "react";
import { Building2, Star, CheckCircle } from "lucide-react";
import StatsCard from "./StatsCard";
import type { PropertyResponseType } from "../../types/property";

interface Props {
  propertyDetails: PropertyResponseType[];
}

export default function StatsSection({ propertyDetails }: Props) {
  const stats = useMemo(() => {
    return {
      totalReviews: propertyDetails.length,
      propertiesCount: propertyDetails.length,
      averageRating:
        propertyDetails.length > 0
          ? (
              propertyDetails.reduce(
                (sum, r) => sum + (r.reviews?.rating || 0),
                0
              ) / propertyDetails.length
            ).toFixed(1)
          : "0.0",
      shownReviews: propertyDetails.filter(
        (r) => r.reviews?.status === "published"
      ).length,
    };
  }, [propertyDetails]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Properties"
        value={stats.propertiesCount}
        icon={Building2}
        color="slate"
      />
      <StatsCard
        title="Total Reviews"
        value={stats.totalReviews}
        icon={Star}
        color="blue"
      />
      <StatsCard
        title="Average Rating"
        value={stats.averageRating}
        icon={Star}
        color="amber"
      />
      <StatsCard
        title="Publicly Shown"
        value={stats.shownReviews}
        icon={CheckCircle}
        color="emerald"
      />
    </div>
  );
}
