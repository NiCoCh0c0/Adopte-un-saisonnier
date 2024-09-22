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
    const currentJobInfo = card.querySelector('.job-info');
    const currentJobDescription = card.querySelector('.job-description');
    
    // Calcul de la hauteur maximale et minimale
    const currentJobInfoElementMaxHeight = currentJobInfo.scrollHeight; // Hauteur max complète
    const currentJobInfoElementMinHeight = currentJobInfoElementMaxHeight - (window.innerHeight - currentJobDescription.getBoundingClientRect().top); // Hauteur minimale
    
    // Stocker la hauteur minimale dans la carte pour être réutilisée dans CardSwiping.js
    card.minJobInfoHeight = currentJobInfoElementMinHeight;
    
    // Seuil pour la fin du swipe (par exemple 50px de déplacement)
    const threshold = 50;

    currentJobInfo.style.height = `${currentJobInfoElementMinHeight}px`; // Hauteur minimale au début

    // Fonction pour démarrer le swipe (mousedown ou touchstart)
    function startSwipe(y) {
        isSwipingJobInfo = true;
        startSwipingJobInfoY = y; // Capturer la position de départ
        currentHeight = currentJobInfo.clientHeight; // Hauteur actuelle au début du swipe
        document.body.style.userSelect = 'none'; // Désactiver la sélection de texte pendant le swipe
    }

    // Fonction pour gérer le mouvement du swipe (mousemove ou touchmove)
    function moveSwipe(y) {
        if (!isSwipingJobInfo) return;

        const deltaY = startSwipingJobInfoY - y; // Calcul de la différence de mouvement
        let newHeight = currentHeight + deltaY; // Calcul de la nouvelle hauteur

        // Limiter la hauteur à la taille min et max
        if (newHeight > currentJobInfoElementMaxHeight) newHeight = currentJobInfoElementMaxHeight;
        if (newHeight < currentJobInfoElementMinHeight) newHeight = currentJobInfoElementMinHeight;

        // Appliquer la nouvelle hauteur
        currentJobInfo.style.height = `${newHeight}px`;
    }

    // Fonction pour terminer le swipe (mouseup ou touchend)
    function endSwipe(y) {
        if (!isSwipingJobInfo) return;

        const deltaY = startSwipingJobInfoY - y; // Calcul de la différence de mouvement vertical

        // Si le mouvement dépasse un certain seuil, agrandir ou rétrécir entièrement
        if (deltaY > threshold) {
            currentJobInfo.style.height = `${currentJobInfoElementMaxHeight}px`; // Swipe vers le haut, agrandir à la taille max
            currentHeight = currentJobInfoElementMaxHeight;
        } else if (deltaY < -threshold) {
            currentJobInfo.style.height = `${currentJobInfoElementMinHeight}px`; // Swipe vers le bas, rétrécir à la taille min
            currentHeight = currentJobInfoElementMinHeight;
        } else {
            currentJobInfo.style.height = `${currentHeight}px`; // Remettre la hauteur courante si pas assez de swipe
        }

        isSwipingJobInfo = false; // Désactiver le swipe
        document.body.style.userSelect = ''; // Réactiver la sélection de texte
    }

    // Écouteurs d'événements pour la souris
    currentJobInfo.addEventListener('mousedown', (e) => {
        e.stopPropagation(); // Empêche le swipe de la carte en même temps
        startSwipe(e.clientY); // Démarrer le swipe
    });
    document.addEventListener('mousemove', (e) => moveSwipe(e.clientY)); // Mouvement
    document.addEventListener('mouseup', (e) => endSwipe(e.clientY)); // Fin du swipe

    // Écouteurs d'événements pour les écrans tactiles
    currentJobInfo.addEventListener('touchstart', (e) => {
        e.stopPropagation(); // Empêche le swipe de la carte en même temps
        startSwipe(e.touches[0].clientY); // Démarrer le swipe avec le tactile
    });
    document.addEventListener('touchmove', (e) => moveSwipe(e.touches[0].clientY)); // Mouvement tactile
    document.addEventListener('touchend', (e) => endSwipe(e.changedTouches[0].clientY)); // Fin du swipe tactile
}
