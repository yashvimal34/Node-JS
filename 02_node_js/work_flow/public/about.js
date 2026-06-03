const allCards = document.getElementById("cards")

try {
    const data = await fetch('/api')
    const response = await data.json()
    renderCards(response)
} catch(err) {
    console.log(err)
}

function renderCards(cards){
    let allData = ''
        cards.map(card => 
            allData += `
            <card>
                <h1>${card.title}</h1>
                <h2>${card.location}</h2>
                <p>${card.text}</p>
            </card>
            `
    )
allCards.innerHTML = allData

}