let isSwipingJobInfo = false;
let startSwipingJobInfoY =  0; // Uniquement sur l'axe Y

function setupDescriptionsSwiping(container) {
    container.forEach(card => {
        enableDescriptionSwiping(card);
    });
}

function enableDescriptionSwiping(card) {
    let isSwipingJobInfo = false;
    let startSwipingJobInfoY = 0;
    let currentHeight = 0;
    
    // Sélectionne les éléments
    const currentJobInfo = document.querySelector('.job-info');
    const currentJobDescription = document.querySelector('.job-description');
    
    // Calcul de la hauteur maximale et minimale
    const currentJobInfoElementMaxHeight = currentJobInfo.scrollHeight; // Hauteur max complète
    const currentJobInfoElementMinHeight = currentJobInfoElementMaxHeight - (window.innerHeight - currentJobDescription.getBoundingClientRect().top); // Hauteur minimale choisie
    
    // Seuil pour la fin du swipe (par exemple 50px de déplacement)
    const threshold = 50; 

    currentJobInfo.style.height = `${currentJobInfoElementMinHeight}px`; // Hauteur minimale au début
    
    // Gestion du début du swipe (mousedown)
    currentJobInfo.addEventListener('mousedown', (e) => {
        e.stopPropagation(); // Empêcher le swipe de la carte en même temps
        isSwipingJobInfo = true;
        startSwipingJobInfoY = e.clientY; // Capturer la position de départ
        currentHeight = currentJobInfo.clientHeight; // Hauteur actuelle au début du swipe
        document.body.style.userSelect = 'none'; // Désactiver la sélection de texte pendant le swipe
    });
    
    // Gestion du mouvement de la souris (mousemove)
    document.addEventListener('mousemove', (e) => {
        if (!isSwipingJobInfo) return; // Si le swipe n'est pas actif, on arrête
    
        const deltaY = startSwipingJobInfoY - e.clientY; // Calcul de la différence de mouvement
    
        // Calcul de la nouvelle hauteur en fonction du mouvement
        let newHeight = currentHeight + deltaY;
    
        // Limiter la hauteur à la taille min et max
        if (newHeight > currentJobInfoElementMaxHeight) newHeight = currentJobInfoElementMaxHeight;
        if (newHeight < currentJobInfoElementMinHeight) newHeight = currentJobInfoElementMinHeight;
    
        // Appliquer la nouvelle hauteur à l'élément
        currentJobInfo.style.height = `${newHeight}px`;
    });
    
    // Gestion de la fin du swipe (mouseup)
    document.addEventListener('mouseup', (e) => {
        if (!isSwipingJobInfo) return;  // Si on n'est pas en train de swiper, on arrête
    
        const deltaY = startSwipingJobInfoY - e.clientY;  // Calcul de la différence de mouvement vertical
    
        // Si le mouvement dépasse un certain seuil, agrandir ou rétrécir entièrement
        if (deltaY > threshold) {
            // Swipe vers le haut, agrandir à la taille max
            currentJobInfo.style.height = `${currentJobInfoElementMaxHeight}px`;  // Agrandir à la hauteur max
            currentHeight = currentJobInfoElementMaxHeight;  // Met à jour la hauteur courante
        } else if (deltaY < -threshold) {
            // Swipe vers le bas, rétrécir à la taille min
            currentJobInfo.style.height = `${currentJobInfoElementMinHeight}px`;  // Réduire à la hauteur min
            currentHeight = currentJobInfoElementMinHeight;  // Met à jour la hauteur courante
        } else {
            // Si le mouvement n'a pas dépassé le seuil, revenir à la hauteur courante
            currentJobInfo.style.height = `${currentHeight}px`;  // Remettre la hauteur courante
        }
    
        isSwipingJobInfo = false;  // Désactiver le swipe
        document.body.style.userSelect = '';  // Réactiver la sélection de texte
    });
}

/*
// Gérer le début du swipe (tactile)
currentJobInfo.addEventListener('touchstart', (e) => {
    isSwipingJobInfo = true;
    startSwipingJobInfoY = e.touches[0].clientY;
    currentHeight = parseInt(window.getComputedStyle(currentJobInfo).height);
});

// Gérer le mouvement du swipe (tactile)
currentJobInfo.addEventListener('touchmove', (e) => {
    if (!isSwipingJobInfo) return;
    handleMove(e.touches[0].clientY);  // Suivi du mouvement du swipe
});

// Gérer la fin du swipe (tactile)
currentJobInfo.addEventListener('touchend', (e) => {
    if (!isSwipingJobInfo) return;
    completeSwipe(e.changedTouches[0].clientY);  // Ajuster à la taille max/min après le swipe
    isSwipingJobInfo = false;
});
*/