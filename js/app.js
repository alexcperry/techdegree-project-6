const overlay = document.getElementById('overlay');
const title = document.getElementsByClassName('title')[0];
const resetBtn = document.getElementsByClassName('btn__reset')[0];
const qwerty = document.getElementById('qwerty');
const phrase = document.querySelector('#phrase ul');
const tryImages = document.querySelectorAll('.tries img');
let missed = 0;
const numLives = 5;
const phrases = ['FOR ONCE IN MY LIFE',
  'BAD ROMANCE',
  'I SAY A LITTLE PRAYER FOR YOU',
  'THRILLER',
  'ITS NOT UNUSUAL'];


// Functions
const getRandomPhraseAsArray = arr => {
  const chosenPhrase = phrases[Math.floor(Math.random() * arr.length)];
  return chosenPhrase.split('');
}

const addPhraseToDisplay = arr => {
  for (let i = 0; i < arr.length; i += 1) {
    const li = document.createElement('li');
    li.textContent = arr[i];
    if (arr[i] !== ' ') {
      li.className = 'letter';
    } else {
      li.className = 'space';
    }
    phrase.append(li);
  }
}

const checkLetter = btn => {
  let foundMatch = false;
  let letters = document.querySelectorAll('.letter');

  for (let i = 0; i < letters.length; i += 1) {
    const li = letters[i];
    if (li.className === 'letter' &&
      li.textContent.toLowerCase() === btn.textContent.toLowerCase()) {
      li.className += ' show';
      foundMatch = true;
    }
  }

  return foundMatch ? btn.textContent : null;
}

const winScreen = () => {
  overlay.style.display = '';
  overlay.className = 'win';
  title.textContent = 'Congratulations you win!';
  resetBtn.textContent = 'New game?'
}

const loseScreen = () => {
  overlay.style.display = '';
  overlay.className = 'lose';
  title.textContent = 'Ran out of lives'
  resetBtn.textContent = 'New game?'
}

const checkWin = () => {

  const didWin =
    document.querySelectorAll('.letter').length
    === document.querySelectorAll('.show').length;
  const didLose = missed === numLives;

  if (didWin) {
    setTimeout(winScreen, 1300);
  } else if (didLose) {
    setTimeout(loseScreen, 1300);
  }

}

const reset = () => {

  // Remove previous phrase
  const numChildren = phrase.children.length
  for (let i = 0; i < numChildren; i += 1) {
    const li = phrase.children[0];
    phrase.removeChild(li);
  }

  // Add new phrase
  const newPhrase = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(newPhrase);

  // Reset keyboard
  const btnsToReset = document.querySelectorAll('.chosen');
  for (let i = 0; i < btnsToReset.length; i += 1) {
    btnsToReset[i].className = '';
    btnsToReset[i].disabled = false;
  }

  // Reset lives
  for (let i = 0; i < numLives; i += 1) {
    tryImages[i].src = 'images/liveHeart.png';
  }

  missed = 0;
}


// Events
resetBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
  if (overlay.className === 'win' || overlay.className === 'lose') {
    reset();
  }
})

qwerty.addEventListener('click', e => {
  const btn = e.target;

  // Only check if the user clicked a letter button
  if (btn.tagName === 'BUTTON') {
    btn.className = 'chosen';
    btn.disabled = 'true';

    const letterFound = checkLetter(btn);
    if (!letterFound) {
      const lostTry = tryImages[numLives - 1 - missed];
      lostTry.src = 'images/lostHeart.png';
      missed += 1;
    }

    checkWin();
  }

})


// Get phrase, add to display
const gamePhrase = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(gamePhrase);

/* Known issues
1. No animations
*/