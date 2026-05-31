const myIntro = document.getElementById('intro')
const contactForm = document.getElementById('contact-form')
const contactResponse = document.getElementById('contact-response')

if (myIntro) {
    myIntro.textContent = 'Our haunted tours combine spooky stories, atmospheric settings, and expert guides so every traveler can safely explore the unseen side of historic places.'
}

if (contactForm) {
    contactForm.addEventListener('submit', event => {
        event.preventDefault()
        contactResponse.textContent = 'Thanks for reaching out! Your haunted tour request has been received in spirit.'
        contactForm.reset()
    })
}
