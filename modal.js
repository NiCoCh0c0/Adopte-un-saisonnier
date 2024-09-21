const modal = document.getElementById('likeModal');

function showModal() {
    modal.style.display = 'flex';
}
function closeModal() {
    modal.style.display = 'none';
}

// Gérer la soumission du formulaire
document.getElementById('confirmationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page
    alert('Merci pour votre candidature !');
    closeModal(); // Fermer la modale après soumission
});


document.getElementById('closeModalButton').addEventListener('click', closeModal);
