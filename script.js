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

// Fonction pour démarrer le swipe (utilisée à la fois pour tactile et souris)
function startSwipe(x) {
    startX = x;
    isSwiping = true;
    currentCard.classList.add('swiping');
}

// Fonction pour suivre le swipe (utilisée pour tactile et souris)
function moveSwipe(x) {
    if (!isSwiping) return;
    const deltaX = x - startX;
    currentCard.style.transform = `translate(${deltaX}px, -50%) rotate(${deltaX / 20}deg)`;
}

// Fonction pour terminer le swipe (utilisée pour tactile et souris)
function endSwipe(x) {
    if (!isSwiping) return;
    isSwiping = false;
    const deltaX = x - startX;

    // Si le swipe est suffisant (ex: plus de 100px de décalage), faire disparaître la carte
    if (Math.abs(deltaX) > 100) {
        currentCard.style.transform = `translate(${deltaX > 0 ? 1000 : -1000}px, -50%) rotate(${deltaX > 0 ? 30 : -30}deg)`;
        currentCard.style.opacity = '0';

        setTimeout(() => {
            currentCard.classList.remove('swiping');
            currentCard.style.transform = 'translate(-50%, -50%) rotate(0deg)';
            currentCard.style.opacity = '1';
            nextProfile(); // Charger le profil suivant
        }, 300);
    } else {
        // Si le swipe est annulé (pas assez loin), remettre la carte en place
        currentCard.style.transform = 'translate(-50%, -50%) rotate(0deg)';
        currentCard.classList.remove('swiping');
    }
}

// Gestion du swipe tactile (mobile)
currentCard.addEventListener('touchstart', (e) => startSwipe(e.touches[0].clientX));
currentCard.addEventListener('touchmove', (e) => moveSwipe(e.touches[0].clientX));
currentCard.addEventListener('touchend', (e) => endSwipe(e.changedTouches[0].clientX));

// Gestion du swipe avec la souris (PC)
currentCard.addEventListener('mousedown', (e) => startSwipe(e.clientX));
window.addEventListener('mousemove', (e) => {
    if (isSwiping) moveSwipe(e.clientX);
});
window.addEventListener('mouseup', (e) => {
    if (isSwiping) endSwipe(e.clientX);
});
