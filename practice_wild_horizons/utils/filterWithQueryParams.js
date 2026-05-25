// Filters destination data using query params from the URL.
export const filterQueryParams = ((data, locationName) => {
    // Pulls only the query values this function supports.
    const {name, location} = locationName
    
    // If name query exists, keep only destinations with the same name.
    if(name) {
        data = data.filter(named => 
            named.name.toLowerCase() === name.toLowerCase()
        )

    // If location query exists, keep only destinations with the same location.
    } if(location) {
        data = data.filter(named => 
            named.location.toLowerCase() === location.toLowerCase()
        )
    }

    // Returns the final filtered data.
    return data
})
