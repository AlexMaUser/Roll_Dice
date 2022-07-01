'use strict';

// Selecting elements
const scoreEl1 = document.querySelector('#score--0');
const scoreEl2 = document.getElementById('score--1');
const current1 = document.getElementById('current--0');
const current2 = document.getElementById('current--1');

// player 1 & player 2
const playerE1 = document.querySelector('.player--0');
const playerE2 = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions

let scores;
let currScore;
let activePlayer;
let playingStatus;
const init = function () {
  // variables
  scores = [0, 0]; // Player 1 score / Player 2 score
  currScore = 0;
  activePlayer = 0; // current player is Player1(0)
  playingStatus = true;

  scoreEl1.textContent = 0;
  scoreEl2.textContent = 0;
  current1.textContent = 0;
  current2.textContent = 0;
  diceEl.classList.add('hidden');
  playerE1.classList.remove('player--winner');
  playerE2.classList.remove('player--winner');
  playerE1.classList.add('player--active');
  playerE2.classList.remove('player--active');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent =
    currScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currScore = 0;

  // add the active layer effect from CSS
  playerE1.classList.toggle('player--active');
  playerE2.classList.toggle('player--active');
};

init();

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playingStatus) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display rice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. switch to next player && update the current score

    if (dice !== 1) {
      currScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currScore;
    } else {
      // Switch player reset score for the last active player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playingStatus) {
    // 1. Add current score to active player score
    scores[activePlayer] += currScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if score >= 100
    if (scores[activePlayer] >= 100) {
      playingStatus = false;
      diceEl.classList.add('hidden');

      // Finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
