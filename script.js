let currentIndex = 0;

const profilesData = profiles; // Récupération des profils depuis profiles.js

// Fonction pour charger un profil
function loadProfile(index) {
    const profile = profilesData[index];
    document.getElementById('profileImage').src = profile.image;
    document.getElementById('profileName').textContent = profile.name;
    document.getElementById('profileCity').textContent = `Ville : ${profile.city}`;
    document.getElementById('profileSalary').textContent = `Salaire : ${profile.salary}`;
}

// Charger le premier profil
loadProfile(currentIndex);

// Fonction pour passer au profil suivant après l'animation
function nextProfile() {
    currentIndex = (currentIndex + 1) % profilesData.length;
    loadProfile(currentIndex);
}

// Gérer l'effet swipe uniquement pour le bouton "annuler" (dislike)
function swipeCardLeftButton() {
    const card = document.getElementById('swipeCard');
    card.classList.add('swipe-left-active');
    
    // Attendre que l'animation soit terminée, puis charger le prochain profil
    setTimeout(() => {
        card.classList.remove('swipe-left-active');
        nextProfile();
    }, 500); // 500 ms correspond à la durée de l'animation
}

// Fonction pour afficher la modale
function showModal() {
    const modal = document.getElementById('likeModal');
    modal.style.display = 'flex'; // Afficher la modale
}

// Fonction pour fermer la modale
function closeModal() {
    const modal = document.getElementById('likeModal');
    modal.style.display = 'none'; // Masquer la modale
}

// Écouter le clic sur l'icône de fermeture (croix) pour fermer la modale
document.getElementById('closeModalButton').addEventListener('click', closeModal);

// Écouter le clic sur le bouton "like" pour afficher la modale
document.getElementById('likeButton').addEventListener('click', showModal);

// Gérer la soumission du formulaire
document.getElementById('confirmationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page
    alert('Merci pour votre candidature !');
    closeModal(); // Fermer la modale après soumission
});

// Écouter le clic sur le bouton "like" pour afficher la modale
document.getElementById('likeButton').addEventListener('click', showModal);

// Écouter le clic sur le bouton "Fermer" dans la modale
document.getElementById('closeModalButton').addEventListener('click', closeModal);

// Écouter les clics sur les boutons
document.getElementById('passButton').addEventListener('click', swipeCardLeftButton); // Swipe pour "annuler"



let startX = 0;
let isSwiping = false;
let currentCard = document.getElementById('swipeCard');

// Fonction pour démarrer le swipe
currentCard.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
});

// Fonction pour suivre le mouvement du doigt
currentCard.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;

    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;

    // Limite les mouvements de swipe (max 150px à gauche et droite)
    if (Math.abs(deltaX) < 150) {
        currentCard.style.transform = `translate(${deltaX}px, 0)`;
    }
});

// Fonction pour terminer le swipe
currentCard.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    isSwiping = false;

    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;

    // Si le swipe est suffisant (ex: plus de 100px), faire disparaître la carte
    if (Math.abs(deltaX) > 100) {
        currentCard.style.transition = 'transform 0.3s ease-out';
        currentCard.style.transform = `translate(${deltaX > 0 ? 1000 : -1000}px, 0)`;

        setTimeout(() => {
            currentCard.style.transition = '';
            currentCard.style.transform = 'translate(0, 0)';
            nextProfile(); // Charger le profil suivant après l'animation
        }, 300);
    } else {
        // Sinon, remettre la carte à sa position initiale
        currentCard.style.transition = 'transform 0.3s ease-out';
        currentCard.style.transform = 'translate(0, 0)';

        setTimeout(() => {
            currentCard.style.transition = '';
        }, 300);
    }
});
