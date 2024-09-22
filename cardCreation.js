const profilesData = profiles; // Récupération des profils depuis profiles.js
const cardContainer = document.querySelector('#card-container');
let cardsNumber = 3; // Nombre de cartes à afficher
let cards = [];
let currentIndex = 0;

function createCard() {
    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('reset-after-swipe');
    card.innerHTML = `
        <img class="profile-image" src="" alt="Profile image">
        <div class="job-info">
            <h2 class="job-title"></h2>
            <p class="job-city"></p>
            <p class="job-work-time"></p>
            <p class="salary"></p>
            <p class="job-description"></p>
        </div>
    `;
    return card;
}
function setupCards(container, numberOfCards) {
    for (let i = 0; i < numberOfCards; i++) {
        const card = createCard();
        container.appendChild(card);
        cards.push(card);
    }
}

function loadCardsContent(){
    cards.forEach((card, index) => {
        const job = profilesData[(currentIndex + index) % profilesData.length];
        loadCard(card, job);
    });
}
function loadCard(card, jobData) {
    fillCard(card, jobData);
}
function fillCard(card, jobData) {
    card.querySelector('.job-title').textContent = jobData.title;
    card.querySelector('.job-city').textContent = jobData.city;
    card.querySelector('.job-work-time').textContent = jobData.workTime;
    card.querySelector('.salary').textContent = jobData.salary;
    card.querySelector('.job-description').textContent = jobData.description;
    card.querySelector('.profile-image').src = jobData.imageUrl;
}