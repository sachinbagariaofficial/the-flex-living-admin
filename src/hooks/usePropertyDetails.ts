import { useState } from "react";
import { toast } from "sonner";
import type { PropertyResponseType } from "../types/property";
import type { loadDataPropsType } from "../types/filters";

export default function usePropertyDetails() {
    const [propertyDetails, setPropertyDetails] = useState<PropertyResponseType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadData = async (params?: loadDataPropsType) => {
        setIsLoading(true);
        try {
            const url = new URL("https://the-flex-living-backend.onrender.com/api/reviews/hostaway");
            if (params?.itemsPerPage) url.searchParams.append("limit", String(params.itemsPerPage));

            // Add all filters if present
            if (params?.filters) {
                const { search, status, rating, sortBy, sortOrder } = params.filters;
                if (search) url.searchParams.append("search", search);
                if (status) url.searchParams.append("status", status);
                if (rating) url.searchParams.append("rating", rating);
                if (sortBy) url.searchParams.append("sortBy", sortBy);
                if (sortOrder) url.searchParams.append("sortOrder", sortOrder);
            }

            const response = await fetch(url.toString(), { method: "GET" });
            const data = await response.json();

            if (data.status !== "success") throw new Error("Failed to fetch data");

            setPropertyDetails(data.result);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch data");
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusChange = async (reviewId: number, newStatus: boolean) => {
        const prevStatusMap = propertyDetails.reduce((acc, p) => {
            acc[p.property.propertyId] = p.reviews.status;
            return acc;
        }, {} as Record<number, string>);

        setPropertyDetails(prev =>
            prev.map(p =>
                p.property.propertyId === reviewId
                    ? { ...p, reviews: { ...p.reviews, status: newStatus ? "published" : "private" } }
                    : p
            )
        );

        try {
            const response = await fetch(
                `https://the-flex-living-backend.onrender.com/api/reviews/${reviewId}/approve?show=${newStatus}`,
                { method: "PATCH" }
            );
            const result = await response.json();

            if (result.status !== "success") throw new Error("Failed to update review status");

            toast.success(`Review ${reviewId} status updated successfully`);
        } catch (err) {
            console.error(err);
            toast.error("Failed to update review status, reverting...");
            setPropertyDetails(prev =>
                prev.map(p =>
                    p.property.propertyId === reviewId
                        ? { ...p, reviews: { ...p.reviews, status: prevStatusMap[reviewId] } }
                        : p
                )
            );
        }
    };

    return { propertyDetails, isLoading, loadData, handleStatusChange };
}
