export interface PropertyResponseType {
    property: {
        propertyId: number;
        listingName: string;
        mainImage: string;
        location: {
            city: string;
            country: string;
        };
        propertyDetails: {
            personCapacity: number;
            bedroomsNumber: number;
            bathroomsNumber: number;
            price: number;
        };
    };
    reviews: {
        id: number;
        type: string;
        status: string;
        rating: number;
        publicReview: string;
        categories: {
            category: string;
            rating: number;
            _id: string;
        }[];
        submittedAt: string;
        guestName: string;
        channel: string;
        listingName: string;
    };
}


export type PropertyResponseTypeList = PropertyResponseType[];