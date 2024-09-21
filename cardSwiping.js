let isSwipingCard = false;
let startSwipingCardPos = { x: 0, y: 0 };
let currentCard = null;

function setupCardsSwiping(container) {
    container.forEach(card => {
        enableCardSwiping(card);
    });
}

function enableCardSwiping(card) {
    card.addEventListener('mousedown', (e) => {
        isSwipingCard = true;
        startSwipingCardPos.x = e.clientX;
        startSwipingCardPos.y = e.clientY;
        currentCard = card;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isSwipingCard || !currentCard) return;
        const deltaX = e.clientX - startSwipingCardPos.x;
        const deltaY = e.clientY - startSwipingCardPos.y;
    
        currentCard.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${deltaX * 0.05}deg)`;
    });
    
    document.addEventListener('mouseup', (e) => {
        if (!isSwipingCard || !currentCard) return;
    
        const deltaX = e.clientX - startSwipingCardPos.x;
        if (deltaX > 100) {
            // Swiped right
            currentCard.classList.add('swiped-right');
            showModal(); // Fonction de modal.js
        } else if (deltaX < -100) {
            // Swiped left
            currentCard.classList.add('swiped-left');
        } else {
            // Reset position if swipe wasn't far enough
            currentCard.style.transform = '';
        }
    
        isSwipingCard = false;
        currentCard = null;
    });
}

function showTopCard() {
    cards[0].style.zIndex = 1;
}

// Gérer la rotation des cartes