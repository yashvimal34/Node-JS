(async () => {
    try {
        const data = await fetch('/api')
        const response = await data.json()
        renderCards(response)
    } catch (err) {
        console.log(err)
    }
})()

function renderCards(cardData) {
    const cardsEl = document.getElementById("cards")

    let cardsElements = ""

    cardData.forEach((cards) => {
        cardsElements += `
            <cards>
                <h1>${cards.location}</h1>
                <h1>${cards.timeStamp}</h1>
                <h1>${cards.title}</h1>
                <p>${cards.text}</p>
            </cards>
        `
    })

    cardsEl.innerHTML = cardsElements
}
