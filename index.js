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

const otherService = document.querySelector('#other_service');
const messageInput = document.querySelector('#message');

otherService.addEventListener('click', function() {
    if(!messageInput.hasAttribute("required")) {
        messageInput.setAttribute("required", "");
        messageInput.setAttribute("placeholder", "Message (required)");
    } else {
        messageInput.removeAttribute("required", "");
        messageInput.setAttribute("placeholder", "Message (optional)");
    }
})

const form = document.querySelector('#contactForm');
const port = 3000;
const url = `https://ginger-honey-grease.glitch.me`

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const selectedServices = Array.from(formData.getAll('type_of_service'));
    const data = Object.fromEntries(formData.entries());

    Object.assign(data, {type_of_service: selectedServices});

    const trimmedFirst = data.first_name.slice(0,15);
    const trimmedLast = data.last_name.slice(0,15);
    const trimmedEmail = data.email.slice(0,30);
    const trimmedMessage = data.message.slice(0,200);

    Object.assign(data, {first_name: trimmedFirst});
    Object.assign(data, {last_name: trimmedLast});
    Object.assign(data, {email: trimmedEmail});
    Object.assign(data, {message: trimmedMessage});

    try {
        const response = await fetch(`${url}/api/sendmail`, { // replace '/api/data' with url for backend API
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
});

const messageTextArea = document.querySelector('.message-input');
const messageLimit = document.querySelector('#messageLimit');

messageTextArea.addEventListener('keyup', function() {
    let messageLength = messageTextArea.value.length;
    console.log(messageLength);
    let messageRemaining = 200 - messageLength;
    console.log(`Remaining: ${messageRemaining}`);

    messageLimit.innerHTML = `${messageRemaining}/200`;

})
