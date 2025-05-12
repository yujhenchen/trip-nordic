city_key = "city"
category_key = "categories"
region_key = "region"
seasons_key = "seasons"

mapped_key_city = "cities"
mapped_key_region = "regions"

def extract_fi_filters(activities):
    cities = set()
    categories = set()
    regions = set()
    
    # NOTE: seasons are fixed
    seasons = ["spring", "summer", "autumn", "winter"]

    for activity in activities:
        if activity.get(city_key) is not None:  # Use get() to safely access the dictionary key
            cities.add(activity[city_key])

        if activity.get(category_key) is not None:
           categories.update(activity[category_key])

        if activity.get(region_key) is not None:
            regions.add(activity[region_key])

    return {
        mapped_key_city: list(cities),
        category_key: list(categories),
        mapped_key_region: list(regions),
        seasons_key: seasons,
    }
