export function filterWithQueryParams (data, queryObj) {
    const {name, price} = queryObj

    if(name) {
        data = data.filter(destination => 
        destination.name.toLowerCase() === name.toLowerCase()
    )} 
    if(price) {
        data = data.filter(destination => 
            destination.price === Number(price)
        )
    }
    return data
}