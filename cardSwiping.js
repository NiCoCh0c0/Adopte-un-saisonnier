const leftSwipeSound = document.getElementById('left-swipe-sound');
const rightSwipeSound = document.getElementById('right-swipe-sound');

function setupCardsSwiping(container) {
    container.forEach(card => {
        enableCardSwiping(card);
    });
}

function enableCardSwiping(card) {
    let isSwipingCard = false;
    let startSwipingCardPos = { x: 0, y: 0 };

    // Fonction pour gérer le début du swipe (mousedown ou touchstart)
    function startSwipe(x, y) {
        isSwipingCard = true;
        startSwipingCardPos.x = x;
        startSwipingCardPos.y = y;
    }

    // Fonction pour gérer le mouvement du swipe (mousemove ou touchmove)
    function moveSwipe(x, y) {
        if (!isSwipingCard || !card) return;
        const deltaX = x - startSwipingCardPos.x;
        const deltaY = y - startSwipingCardPos.y;

        card.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${deltaX * 0.05}deg)`;
    }

    // Fonction pour gérer la fin du swipe (mouseup ou touchend)
    function endSwipe(x) {
        if (!isSwipingCard || !card) return;
        const deltaX = x - startSwipingCardPos.x;
        handleSwipeEnd(deltaX, card);
    }

    // Écouteurs d'événements pour la souris
    card.addEventListener('mousedown', (e) => startSwipe(e.clientX, e.clientY));
    document.addEventListener('mousemove', (e) => moveSwipe(e.clientX, e.clientY));
    document.addEventListener('mouseup', (e) => endSwipe(e.clientX));

    // Écouteurs d'événements pour le tactile
    card.addEventListener('touchstart', (e) => startSwipe(e.touches[0].clientX, e.touches[0].clientY));
    document.addEventListener('touchmove', (e) => moveSwipe(e.touches[0].clientX, e.touches[0].clientY));
    document.addEventListener('touchend', (e) => endSwipe(e.changedTouches[0].clientX));

    // Fonction pour traiter la fin du swipe (swipe à gauche ou à droite)
    function handleSwipeEnd(deltaX, card) {
        if (deltaX > 100) {
            // Swiped right
            card.classList.add('swiped-right');

            // Arrêter le son du swipe à gauche
            leftSwipeSound.pause();
            leftSwipeSound.currentTime = 0;

            // Jouer le son du swipe à droite
            rightSwipeSound.currentTime = 0;
            rightSwipeSound.play();

            // Déclencher les confettis
            confetti({
                particleCount: 100,  // Nombre de confettis
                spread: 70,  // Angle de dispersion
                origin: { x: 0.5, y: 0.5 },  // Position des confettis (centre)
                colors: ['#bb0000', '#ffffff'],  // Couleurs des confettis
            });

            showModal(); // Fonction de modal.js
            rollCards(card);
        } else if (deltaX < -100) {
            // Swiped left
            card.classList.add('swiped-left');
            rightSwipeSound.currentTime = 0;
            rightSwipeSound.pause();

            leftSwipeSound.currentTime = 0;
            leftSwipeSound.play();

            rollCards(card);
        } else {
            // Réinitialisation si le swipe n'est pas assez loin
            card.style.transform = '';
        }
        isSwipingCard = false;
    }
}

function showTopCard(newTopCard) {
    newTopCard.classList.remove('second');
    newTopCard.classList.add('top');
}
function setupSecondCard(secondCard) {
    secondCard.classList.remove('reset-after-swipe');
    secondCard.classList.add('second');
}
function placeAtBottom() {
    const newBottomCard = cards.shift();
    cards.push(newBottomCard);
    newBottomCard.classList.remove('top');
    newBottomCard.classList.remove('swiped-left');
    newBottomCard.classList.remove('swiped-right');
    newBottomCard.classList.add('reset-after-swipe');
    
    // Replier la description en utilisant la hauteur minimale stockée
    const jobInfo = newBottomCard.querySelector('.job-info');
    jobInfo.style.height = `${newBottomCard.minJobInfoHeight}px`; // Applique la hauteur minimale stockée
}
function rollCards(card) {
    card.addEventListener('transitionend', (e) => {
        if (e.propertyName === 'transform') { 
            card.style.transform = ''; // Supprime le style inline
            placeAtBottom();
            showTopCard(cards[0]);
            setupSecondCard(cards[1]);
        }
    }, { once: true });
}