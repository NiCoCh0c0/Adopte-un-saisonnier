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
function swipeCardLeft() {
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
document.getElementById('passButton').addEventListener('click', swipeCardLeft); // Swipe pour "annuler"
