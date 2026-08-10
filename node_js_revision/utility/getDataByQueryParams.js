export const getDataByQueryParams = (data, queryObj) => {
    const {continent, country, is_open_to_public} = queryObj

    if(continent) {
        data = data.filter(destinaion => 
            destinaion.continent.toLowerCase() === continent.toLowerCase())
    } if(country) {
        data = data.filter(destinaion => 
            destinaion.country.toLowerCase() === country.toLowerCase()
        )
    } if(is_open_to_public) {
        data = data.filter(destinaion => 
            destinaion.is_open_to_public === JSON.parse(is_open_to_public.toLowerCase())
        )
    }
    return data
}