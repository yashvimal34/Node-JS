const contactForm = document.getElementById('contact-form')
const contactResponse = document.getElementById('contact-response')

if (contactForm) {
    contactForm.addEventListener('submit', async event => {
        event.preventDefault()

    const formData = {
        title: contactForm.title.value,
        timeStamp: contactForm.timeStamp.value,
        location: contactForm.location.value,
        text: contactForm.text.value
    }

    try{
        const response = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
    })  

        contactResponse.textContent = 'Thanks for reaching out! Your haunted tour request has been received in spirit.'
        contactForm.reset()

        } catch(err) {
            console.log(err)
        }  
    })
}

