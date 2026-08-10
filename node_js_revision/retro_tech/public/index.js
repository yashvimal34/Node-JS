const retroText = document.getElementById("retro-text")
const cards = document.getElementById("cardsEl")
const footer = document.getElementById("footerEl")

retroText.textContent = "Retro Tech"

const imageFiles = [
    { src: "images/1.webp", name: "Pic 1" },
    { src: "images/2.webp", name: "Pic 2" },
    { src: "images/3.webp", name: "Pic 3" }
]

const renderImage = imageFiles.map(({ src, name }) => `
        <div>
            <img src="${src}" alt="${name}">
            <h1>${name}</h1>
        </div>
    `)
    .join("")

cards.innerHTML = renderImage
footer.innerHTML = `<p>© ${new Date().getFullYear()} Retro Tech</p>`

