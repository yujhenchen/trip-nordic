city_key = "city"
category_key = "category"
region_key = "region"
seasons_key = "seasons" 

def extract_fi_filters(activities):
    cities = set()
    categories = set()
    regions = set()
    seasons = set()

    for activity in activities:
        if activity.get(city_key) is not None:  # Use get() to safely access the dictionary key
            cities.add(activity[city_key])

        if activity.get(category_key) is not None:
            categoryList = activity[category_key].split(',')
            filtered_categories = list(filter(lambda x: x not in [None, ""], categoryList))
            categories.update(filtered_categories)

        if activity.get(region_key) is not None:
            regionList = activity[region_key].split(',')
            filtered_regions = list(filter(lambda x: x not in [None, ""], regionList))
            regions.update(filtered_regions)

        if activity.get(seasons_key) is not None:
            seasonList = activity[seasons_key].split(',')
            filtered_seasons = list(filter(lambda x: x not in [None, ""], seasonList))
            seasons.update(filtered_seasons)

    return {
        city_key: list(cities),
        category_key: list(categories),
        region_key: list(regions),
        seasons_key: list(seasons),
    }
