const cards = document.querySelectorAll('.card');
const scoreDisplay = document.getElementById('score');
const recordDisplay = document.getElementById('record');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;
let record = localStorage.getItem('record') || '--';

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.color === secondCard.dataset.color;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  score += 10;
  scoreDisplay.textContent = score;

  if (score > record || record === '--') {
    record = score;
    localStorage.setItem('record', record);
    recordDisplay.textContent = record;
  }

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 6);
    card.style.order = randomPos;
    card.addEventListener('click', flipCard);
    card.style.backgroundColor = card.getAttribute('data-color');
  });
})();


