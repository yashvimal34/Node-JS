// Reusable helper for filtering data by a specific field, like name or country.
export const filteringData = (data, nameType, locationName) => {
    return data.filter((destination) => {
      // Compares the selected field with the requested value without caring about uppercase/lowercase.
      return destination[nameType].toLowerCase() === locationName.toLowerCase()
    })
}
