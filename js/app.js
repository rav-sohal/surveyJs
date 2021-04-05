'use strict';

class Question {
  constructor (question, answerOne, answerTwo) {
    this.question = question;
    this.answerOne = answerOne;
    this.answerTwo = answerTwo;
  }
}

const questionClass = [
  new Question ('Do you agree with the current lockdown?', 'Yes', 'No'),
  new Question ('Are you on the Furlough Scheme?', 'Yes', 'No'),
  new Question ('Have you been vaccinated?', 'Yes', 'No'),
  new Question ('Are you working from Home?', 'Yes', 'No'),
  new Question ('Have you had Covid-19 symptoms?', 'Yes', 'No'),
];

const arrData = () => {
  return questionClass;
};

const yesBtn = document.querySelector ('#answer1');
const noBtn = document.querySelector ('#answer2');
const startBtn = document.querySelector ('#start');
let mainDiv = document.getElementById ('main');
let yesCount = 0;
let noCount = 0;
let i = 0;
let totalScore = 0;
const image = './assets/nhs.png';
const header = document.createElement ('DIV');
header.setAttribute ('id', 'header');
if (mainDiv) {
  mainDiv.insertAdjacentElement ('beforebegin', header);
}
header.innerHTML = `<img src=${image} class="nhs-logo">`;

const calcScorePromise = number => {
  return new Promise ((resolve, reject) => {
    number = yesCount + noCount;
    if (number === questionClass.length) {
      resolve (number);
    } else {
      reject ('Total score not calculated, questions not complete');
    }
  });
};

async function funcAsync () {
  try {
    await calcScorePromise (totalScore);
      if (yesCount > 2 && noCount < 2) {
        mainDiv.innerHTML = `<span>Thank you for completing this survey - Yes More</span><br /><div class="text">Get the latest advice about coronavirus, including information about symptoms, self-isolation and testing.
        </div>`;
      } else {
        mainDiv.innerHTML = `<span>Thank you for completing this survey - No More</span><br /><div class="text">Get the latest advice about coronavirus, including information about symptoms, self-isolation and testing.
        </div>`;
      }
      yesBtn.style.display = 'none';
      noBtn.style.display = 'none';
    
    console.log (
      'Success - Total questions answered =',
      totalScore,
      'no count =',
      noCount,
      'yes count =',
      yesCount
    );
  } catch (error) {
    console.log (error);
  }
}

const clickEv = () => {
  if (startBtn) {
    startBtn.addEventListener ('click', () => {
      if (i < questionClass.length) {
        if (mainDiv) {
          mainDiv.innerHTML = `${questionClass[i].question}`;
        }
        yesBtn.innerHTML = `${questionClass[i].answerOne}`;
        yesBtn.style.display = 'inline-block';
        noBtn.innerHTML = `${questionClass[i].answerTwo}`;
        noBtn.style.display = 'inline-block';
      }
      i++;
      startBtn.style.display = 'none';
    });
  }

  if (yesBtn || noBtn) {
    yesBtn.addEventListener ('click', () => {
      if (i < questionClass.length) {
        if (mainDiv) {
          mainDiv.innerHTML = `${questionClass[i].question}`;
        }
        yesBtn.innerHTML = `${questionClass[i].answerOne}`;
        noBtn.innerHTML = `${questionClass[i].answerTwo}`;
      }
      yesCount++;
      i++;
      if (i == questionClass.length + 1) {
        funcAsync();
      }
    });

    noBtn.addEventListener ('click', () => {
      if (i < questionClass.length) {
        if (mainDiv) {
          mainDiv.innerHTML = `${questionClass[i].question}`;
        }
        yesBtn.innerHTML = `${questionClass[i].answerOne}`;
        noBtn.innerHTML = `${questionClass[i].answerTwo}`;
      }
      noCount++;
      i++;
      if (i == questionClass.length +1) {
        funcAsync();
        }
      });
  }
};

const genHtmlTwo = callback => {
  window.onload = function () {
    if (i == 0) {
      mainDiv.innerHTML = `<span class="welcome">Welcome to the Covid-19 Survey</span>`;
    }
    callback ();
    return mainDiv;
  };
};

genHtmlTwo (clickEv);
arrData ();

var module = module || {};
module.exports = {arrData, genHtmlTwo, clickEv, calcScorePromise};
