export const Review = {
    "name": "Review",
    "type": "object",
    "properties": {
        "property_id": {
            "type": "number"
        },
        "listing_name": {
            "type": "string"
        },
        "main_image": {
            "type": "string"
        },
        "city": {
            "type": "string"
        },
        "country": {
            "type": "string"
        },
        "person_capacity": {
            "type": "number"
        },
        "bedrooms": {
            "type": "number"
        },
        "bathrooms": {
            "type": "number"
        },
        "price": {
            "type": "number"
        },
        "review_id": {
            "type": "number"
        },
        "review_type": {
            "type": "string"
        },
        "review_status": {
            "type": "string"
        },
        "overall_rating": {
            "type": "number"
        },
        "public_review": {
            "type": "string"
        },
        "cleanliness_rating": {
            "type": "number"
        },
        "communication_rating": {
            "type": "number"
        },
        "respect_house_rules_rating": {
            "type": "number"
        },
        "submitted_at": {
            "type": "string",
            "format": "date-time"
        },
        "guest_name": {
            "type": "string"
        },
        "channel": {
            "type": "string"
        },
        "show_on_public_site": {
            "type": "boolean",
            "default": false
        }
    },
    "required": [
        "property_id",
        "listing_name",
        "review_id",
        "guest_name"
    ]
}