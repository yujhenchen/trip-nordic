city_key = "city"
category_key = "categories"
region_key = "region"
seasons_key = "seasons"

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
        city_key: list(cities),
        category_key: list(categories),
        region_key: list(regions),
        seasons_key: seasons,
    }
