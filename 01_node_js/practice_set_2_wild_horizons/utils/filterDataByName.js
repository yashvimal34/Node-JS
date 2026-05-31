export function filterDataByName (place, locationType, placeName) {
    return place.filter((destination) => {
        return destination[locationType].toLowerCase() === placeName.toLowerCase()
    })
}