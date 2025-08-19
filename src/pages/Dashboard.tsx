import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import usePropertyDetails from "../hooks/usePropertyDetails";
import StatsSection from "../components/dashboard/StatsSection";
import PropertyListSection from "../components/dashboard/PropertyListSection";
import PropertyFilters from "../components/filters/PropertyFilters";
import { Toaster } from "sonner";

export default function Dashboard() {
  const { propertyDetails, isLoading, handleStatusChange, loadData } =
    usePropertyDetails();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState({});
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  useEffect(() => {
    loadData({ itemsPerPage, filters });
  }, [itemsPerPage, filters]);

  return (
    <>
      <Toaster position="top-right" />
      <div className="relative p-8 space-y-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sticky top-0 bg-slate-50/80 backdrop-blur-sm pb-4 z-10 -mx-8 px-8 border-b border-slate-200">
          <p className="text-4xl font-bold text-slate-900 tracking-tight">
            Reviews Dashboard
          </p>
        </div>
        <StatsSection propertyDetails={propertyDetails} />
        //
        <PropertyFilters
          filters={filters}
          onFiltersChange={setFilters}
          activeFiltersCount={activeFiltersCount}
          onActiveFiltersCountChange={setActiveFiltersCount}
          onApplyFilters={(appliedFilters) =>
            loadData({ itemsPerPage, filters: appliedFilters })
          }
        />
        {isLoading ? (
          <div className="flex items-center justify-center ">
            <Loader2 className="w-12 h-12 text-slate-500 animate-spin" />
          </div>
        ) : (
          <PropertyListSection
            propertyDetails={propertyDetails}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            handleStatusChange={handleStatusChange}
          />
        )}
      </div>
    </>
  );
}
