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
        activity_city = activity.get(city_key)
        activity_categories = activity.get(category_key)
        activity_region = activity.get(region_key)
        
        if activity_city is not None and activity_city != "":
            activity_city = activity_city.title().replace(" ", "")
            cities.add(activity_city)

        if activity_categories is not None:
           categories.update(activity_categories)

        if activity_region is not None and activity_region != "":
            activity_region = activity_region.title().replace(" ", "")
            regions.add(activity_region)

    return {
        mapped_key_city: list(cities),
        category_key: list(categories),
        mapped_key_region: list(regions),
        seasons_key: seasons,
    }
