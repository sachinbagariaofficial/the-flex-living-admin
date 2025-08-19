import type { PropertyResponseType } from "./property";

export type Filters = {
    search: string;
    status: string;
    rating: string;
    sortBy: string;
    sortOrder: string;
    [key: string]: string;
};

export type PropertyFiltersProps = {
    filters: Filters | any;
    onFiltersChange: (newFilters: Filters) => void;
    activeFiltersCount: number;
    onActiveFiltersCountChange: (count: number) => void;
};


export interface PropertyListSectionPropsType {
    propertyDetails: PropertyResponseType[];
    itemsPerPage: number;
    setItemsPerPage: (n: number) => void;
    handleStatusChange: (reviewId: number, newStatus: boolean) => void;
}


export type loadDataPropsType = {
    itemsPerPage?: number | string;
    filters?: {
        search?: string,
        status?: string,
        rating?: string,
        sortBy?: string,
        sortOrder?: string,
    }
}