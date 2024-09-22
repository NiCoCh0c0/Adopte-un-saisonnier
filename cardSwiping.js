function setupCardsSwiping(container) {
    container.forEach(card => {
        enableCardSwiping(card);
    });
}

function enableCardSwiping(card) {
    let isSwipingCard = false;
    let startSwipingCardPos = { x: 0, y: 0 };
    card.addEventListener('mousedown', (e) => {
        isSwipingCard = true;
        startSwipingCardPos.x = e.clientX;
        startSwipingCardPos.y = e.clientY;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isSwipingCard || !card) return;
        const deltaX = e.clientX - startSwipingCardPos.x;
        const deltaY = e.clientY - startSwipingCardPos.y;
    
        card.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${deltaX * 0.05}deg)`;
    });
    
    document.addEventListener('mouseup', (e) => {
        if (!isSwipingCard || !card) return;
    
        const deltaX = e.clientX - startSwipingCardPos.x;
        if (deltaX > 100) {
            // Swiped right
            card.classList.add('swiped-right');
            showModal(); // Fonction de modal.js
        } else if (deltaX < -100) {
            // Swiped left
            card.classList.add('swiped-left');
            card.addEventListener('transitionend', (e) => {
                if (e.propertyName === 'transform') { 
                    card.style.transform = ''; // Supprime le style inline
                    shiftTopCard();
                    showTopCard();
                }
            }, { once: true });
        } else {
            // Reset position if swipe wasn't far enough
            card.style.transform = '';
        }
    
        isSwipingCard = false;
        currentCard = null;
    });
}

function showTopCard() {
    // Reset la carte en fond
    const bottomCard = cards[cards.length - 1];
    bottomCard.classList.remove('top');
    bottomCard.classList.remove('swiped-left');
    bottomCard.classList.add('reset-after-swipe');
    
    // Setup la carte du dessus
    const topCard = cards[0];
    topCard.classList.remove('reset-after-swipe');
    topCard.classList.add('top');
}
function shiftTopCard() {
    const topCard = cards.shift();
    cards.push(topCard);
    topCard.classList.remove('top');
}
// Gérer la rotation des cartes