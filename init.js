setupCards(cardContainer, cardsNumber);
loadCardsContent();
setupCardsSwiping(cards);
setupDescriptionsSwiping(cards);
cards[0].classList.remove('reset-after-swipe');
showTopCard(cards[0]);
setupSecondCard(cards[1]);