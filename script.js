'use strict';

// declaring variables

let trials = 24;
let correctCount = 0;

let blockNumber;
let correctBlock;

// grabbing elements

let greenBlock = document.querySelector('.btnOne');
let yellowBlock = document.querySelector('.btnTwo');
let redBlock = document.querySelector('.btnThree');
let blueBlock = document.querySelector('.btnFour');

const progressBarFull = document.querySelector('.progressBarFull');
const resetButton = document.getElementById('resetButton');
const passButton = document.getElementById('passButton');

// randomizing the number to begin a trial

const randomizeNumber = () => {
  // randomizing the number
  blockNumber = Math.trunc(Math.random() * 4) + 1;

  // checking if everything is working
  console.log(blockNumber);
  console.log(trials);

  // assigning the random number to its corresponding block

  // first block
  if (blockNumber === 1) {
    greenBlock.value = blockNumber;
    correctBlock = greenBlock;
    // second block
  } else if (blockNumber === 2) {
    yellowBlock.value = blockNumber;
    correctBlock = yellowBlock;
    // third block
  } else if (blockNumber === 3) {
    redBlock.value = blockNumber;
    correctBlock = redBlock;
    // fourth block
  } else if (blockNumber === 4) {
    blueBlock.value = blockNumber;
    correctBlock = blueBlock;
  }

  // resetting background
  document.querySelector('body').style.backgroundColor = '#F7F5EB';
};

// initializing the game
randomizeNumber();

// grabbing the answer buttons
let answerButtons = document.querySelectorAll('.btn');

answerButtons.forEach((button) => {
  button.addEventListener('click', () => {
    console.log('hello choice below');

    // getting the value of the guess
    let choice = Number(button.value);
    console.log(choice);

    //  if trials left is more than 0
    if (trials >= 1) {
      // if the choice is correct
      if (choice === blockNumber) {
        // changes body background to green indicating correct
        document.querySelector('body').style.backgroundColor = '#408145';

        // increasing score
        ++correctCount;
        document.querySelector('.correctScore').textContent = correctCount;

        // decreasing remaining trials
        --trials;

        // updating trial and score count
        document.querySelector('.trialNumber').textContent = trials;

        // update progress bar
        progressBarFull.style.width = `${(correctCount / 24) * 100}%`;

        setTimeout(randomizeNumber, 500);
      }

      // if the choice is incorrect
      if (choice !== blockNumber) {
        // subtract 1 trial
        --trials;

        // updating trial and score count
        document.querySelector('.trialNumber').textContent = trials;

        // changes body background to red indicating incorrect
        document.querySelector('body').style.backgroundColor = '#771e1e';

        // applying 'correct' to the correct block
        correctBlock.textContent = 'correct block';

        // adding the correct class to the button
        correctBlock.classList.add('correct');

        // clearing the 'correct' text before resetting the correctBlock
        setTimeout(clearText, 500);

        // resetting the correctBlock
        setTimeout(randomizeNumber, 501);
      }
    } else {
      document.querySelector('.trialNumber').textContent =
        '0 = Trial Over, Press Reset';
    }
  });
});

// to clear 'correct' text from correctBlock for setTimeout callback
const clearText = () => {
  correctBlock.textContent = '';
  correctBlock.classList.remove('correct');
};

// pass button
passButton.addEventListener('click', () => {
  console.log('pass pressed');

  // applying 'correct' to the correct block
  correctBlock.textContent = 'correct block';

  // resetting the 'correct' text
  setTimeout(clearText, 500);

  // resetting the 'correct block'
  setTimeout(randomizeNumber, 501);
});

// reset button
resetButton.addEventListener('click', () => {
  console.log('reset pressed');

  //   resetting trials and correctCount
  trials = 24;
  correctCount = 0;

  //   updating trials and correct number
  document.querySelector('.trialNumber').textContent = trials;
  document.querySelector('.correctScore').textContent = correctCount;

  //   resetting progress bar
  progressBarFull.style.width = 0;

  // resetting the 'correct' text
  setTimeout(clearText, 500);

  // resetting the 'correct block'
  setTimeout(randomizeNumber, 501);
});
