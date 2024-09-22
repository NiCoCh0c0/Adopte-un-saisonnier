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
            rollCards(card);
        } else if (deltaX < -100) {
            // Swiped left
            card.classList.add('swiped-left');
            rollCards(card);
        } else {
            // Reset position if swipe wasn't far enough
            card.style.transform = '';
        }
        isSwipingCard = false;
        currentCard = null;
    });
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
// Gérer la rotation des cartes