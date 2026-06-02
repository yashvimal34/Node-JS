const allCards = document.getElementById('cards')

try{
    const data = await fetch('/api')
    const response = await data.json()
    renderCards(response)
} catch(err) {
    console.log(err)
}

function renderCards(cardsData) {
    let cardsHTML = ''

    cardsData.forEach((card) => {
        cardsHTML += `
            <article class="feature-card">
                <p class="card-timestamp">${card.timeStamp}</p>
                <h2 class="card-title">${card.title}</h2>
                <p class="card-text">${card.text}</p>
            </article>
        `
    })
    allCards.innerHTML = cardsHTML
}