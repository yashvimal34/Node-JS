const form = document.getElementById('sightingForm');
const output = document.getElementById('sightingOutput');

if (form && output) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });

            const resultText = await response.text();
            output.innerHTML = `<p>${resultText}</p>`;
        } catch (err) {
            console.log(err);
            output.innerHTML = '<p>Something went wrong.</p>';
        }
    });
}