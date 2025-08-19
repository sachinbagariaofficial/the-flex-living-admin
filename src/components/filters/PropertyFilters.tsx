import { Filter, LucideArrowDown, Search, X } from "lucide-react";
import { filterConfigs, getOptionLabel } from "../../entities/filterConfigs";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import type { PropertyFiltersProps, Filters } from "../../types/filters";

export default function PropertyFilters({
  filters,
  onFiltersChange,
  onActiveFiltersCountChange,
  onApplyFilters,
}: PropertyFiltersProps & { onApplyFilters: (filters: Filters) => void }) {
  const [tempFilters, setTempFilters] = useState<Filters>(filters);

  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  // Determine if tempFilters are different from parent filters
  const filtersChanged = useMemo(() => {
    return Object.keys(tempFilters).some(
      (key) => tempFilters[key] !== filters[key]
    );
  }, [tempFilters, filters]);

  // Count of active filters based on tempFilters
  const activeTempFiltersCount = useMemo(() => {
    return Object.values(tempFilters).filter((val) => val && val !== "Select")
      .length;
  }, [tempFilters]);

  const updateFilter = (key: string, value: string) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    const cleared: Filters = {
      search: "",
      status: "",
      rating: "",
      sortBy: "",
      sortOrder: "",
    };
    setTempFilters(cleared);
    onActiveFiltersCountChange(0);
    onFiltersChange(cleared);
  };

  const handleApplyFilters = () => {
    // Validation: if sortBy is selected, sortOrder must also be selected
    if (
      tempFilters.sortBy &&
      (!tempFilters.sortOrder || tempFilters.sortOrder === "Select")
    ) {
      toast.error("Please select the sort order");
      return;
    }

    const activeCount = Object.values(tempFilters).filter(
      (val) => val && val !== "Select"
    ).length;

    onFiltersChange(tempFilters);
    onActiveFiltersCountChange(activeCount);
    onApplyFilters(tempFilters);
  };

  return (
    <div className="bg-white/95 backdrop-blur-md border border-slate-200/60 rounded-xl p-6 space-y-6 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-slate-600" />
          <h3 className="font-semibold text-slate-900 text-lg">
            Filter & Sort Properties
          </h3>

          {/* Active filters count badge */}
          {activeTempFiltersCount > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-600 text-white">
              {activeTempFiltersCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Clear All */}
          {activeTempFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-white hover:text-red-300 text-sm transition-colors duration-200"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
          )}

          {/* Apply Filters */}
          {filtersChanged && (
            <button
              onClick={handleApplyFilters}
              className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition-colors duration-200"
            >
              Apply Filters
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div
        className="relative"
        onClick={() =>
          toast.info("Right now the search functionality is not added")
        }
      >
        <input
          type="text"
          placeholder="Search properties..."
          value={tempFilters.search || ""}
          readOnly
          className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors duration-200"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {filterConfigs.map(({ key, label, options }) => {
          const sortOrderDisabled =
            key === "sortOrder" &&
            (!tempFilters.sortBy || tempFilters.sortBy === "Select");
          return (
            <div className="space-y-1" key={key}>
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor={key}
              >
                {label}
              </label>

              {/* Wrapper to hold custom arrow */}
              <div className="relative">
                <select
                  id={key}
                  disabled={sortOrderDisabled}
                  value={tempFilters[key] || options[0]}
                  onChange={(e) => updateFilter(key, e.target.value)}
                  className={`w-full rounded-lg border text-sm appearance-none pr-8
                    ${
                      !sortOrderDisabled
                        ? "border-slate-200 bg-white"
                        : "border-black-100 !text-[#bababa]"
                    } text-slate-900 py-2 px-3 
                    focus:outline-none focus:ring-2 focus:ring-blue-400 
                    focus:border-blue-400 transition-all duration-200 hover:border-slate-300`}
                >
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {getOptionLabel(key, option)}
                    </option>
                  ))}
                </select>

                {/* Custom dropdown arrow (replaces Safari/Chrome default) */}
                <span
                  className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none  ${
                    !sortOrderDisabled ? "text-black" : "text-[#bababa]"
                  }`}
                >
                  <LucideArrowDown width={15} height={15} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
