const overlay = document.getElementById('overlay');
const title = document.getElementsByClassName('title')[0];
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const tryList = document.querySelector('#scoreboard ol');
let missed = 0;
const numLives = 5;

const phrases = ['For Once in My Life',
  'Bad Romance',
  'I Say A Little Prayer for You',
  'Thriller',
  'Its Not Unusual'];


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

const checkWin = () => {

  const didWin =
    document.querySelectorAll('.letter').length
    === document.querySelectorAll('.show').length;
  const didLose = missed === numLives;

  if (didWin) {
    overlay.style.display = '';
    overlay.className = 'win';
    title.textContent = 'Congratulations you win!';
  } else if (didLose) {
    overlay.style.display = '';
    overlay.className = 'lose';
    title.textContent = 'Ran out of lives'
  }

}


// Events
document.getElementsByClassName('btn__reset')[0]
  .addEventListener('click', () => {
    overlay.style.display = 'none';
  })

qwerty.addEventListener('click', e => {
  const btn = e.target;
  btn.className = 'chosen';
  btn.disabled = 'true';

  const letterFound = checkLetter(btn);
  if (!letterFound) {
    const lostTry = document.querySelector('.tries');
    tryList.removeChild(lostTry);
    missed += 1;
  }

  checkWin();

})

// Get phrase, add to display
const gamePhrase = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(gamePhrase);

/* Known issues
1. No reset
2. No animations
3. No space between words
4. If you click on space in between, it highlights the entire row as if you
clicked a button.
5. Unsure if the user is meant to be clicking on buttons or typing on keyboard.
*/