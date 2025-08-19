import PropertyListItem from "./PropertyListItem";
import type { PropertyListSectionPropsType } from "../../types/filters";
import { LucideArrowDown } from "lucide-react";

const ITEMS_PER_PAGE_OPTIONS = [1, 2, 5, 10];

export default function PropertyListSection({
  propertyDetails,
  itemsPerPage,
  setItemsPerPage,
  handleStatusChange,
}: PropertyListSectionPropsType) {
  return (
    <>
      {/* Items per page */}
      <div className="flex justify-end items-center gap-2 mb-4">
        <label htmlFor="itemsPerPage" className="text-sm text-slate-700">
          Items per page:
        </label>

        {/* Wrapper to hold custom dropdown arrow */}
        <div className="relative">
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="appearance-none pr-6 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 py-1 px-2 
                 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
          >
            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {/* Custom dropdown arrow */}
          <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-xs">
            <LucideArrowDown width={15} height={15} />
          </span>
        </div>
      </div>

      {/* Property List */}
      <div className="space-y-6">
        {propertyDetails.length > 0 ? (
          propertyDetails.map((group) => (
            <PropertyListItem
              key={group.property.propertyId}
              propertyDetail={group}
              onStatusChange={handleStatusChange}
            />
          ))
        ) : (
          <p className="text-xl text-slate-400 text-center">No Data</p>
        )}
      </div>
    </>
  );
}
