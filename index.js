const galleryImgs = document.querySelectorAll('.gallery-img');
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal-content');
const closeButton = document.querySelector('.close');
const backDrop = document.querySelector('.modal-overlay');

for (let img of galleryImgs) {
    img.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = img.src;
    });
}

closeButton.addEventListener('click', closeModal)

backDrop.addEventListener('click', closeModal)

function closeModal() {
    modal.style.display = 'none';
}

function toServices() {
    let e = document.getElementById('services');
    e.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
        inline: 'center'
    });
}

function toGallery() {
    let e = document.getElementById('gallery');
    e.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
        inline: 'center'
    });
}

function toContact() {
    let e = document.getElementById('contact');
    e.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
        inline: 'center'
    });
}

function toTop() {
    let e = document.getElementById('nav');
    e.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
        inline: 'center'
    });
}

const form = document.querySelector('#contactForm');
// const url = 'https://jlw93-automatic-broccoli-6qj4wx9r9r6c5q4p-5500.preview.app.github.dev/jcm-backend';
const port = 3000;
const url = `https://jcm-backend.vercel.app`

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const selectedServices = Array.from(formData.getAll('type_of_service'));
    const data = Object.fromEntries(formData.entries());

    Object.assign(data, {type_of_service: selectedServices});

    try {
        const response = await fetch(`${url}/api/data/email`, { // replace '/api/data' with url for backend API
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Allow': 'POST'
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            // success code, maybe an alert to let the user know that the message sent?
            if(!alert('Message sent! We will contact you soon!')){window.location.reload();}
        } else {
            // error code, maybe try to give different errors depending on the situation?
            alert('Message failed to send. Please try again.')
        }
    } catch (error) {
        // error code for network or other errors
    }
})