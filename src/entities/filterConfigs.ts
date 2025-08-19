export const filterConfigs = [
    {
        key: "status",
        label: "Review Status",
        options: ["Select", "published", "private"],
    },
    {
        key: "rating",
        label: "Rating",
        options: ["Select", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0"],

    },
    {
        key: "sortBy",
        label: "Sort By",
        options: ["Select", "guestName", "rating", "status", "channel", "submittedAt"],
    },
    {
        key: "sortOrder",
        label: "Sort Order",
        options: ["Select", "asc", "desc"],
    },
];


export const getOptionLabel = (key: string, option: string | number) => {
    if (option === "all") {
        if (key === "status") return "All Status";
        return "All Ratings";
    }
    if (option === "published") return "Published";
    if (option === "private") return "Private";
    if (option === "asc") return "Ascending";
    if (option === "desc") return "Descending";
    return option;
};
