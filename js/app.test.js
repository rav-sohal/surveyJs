const {arrData, calcScore, clickEv, genHtmlTwo, calcScorePromise} = require ('./app.js');

describe ('app.js tests', () => {
  test ('Test arrData() function to return array of questions', () => {
    const thisQuestionClass = {
      question: 'Do you agree with the current lockdown?',
      answerOne: 'Yes',
      answerTwo: 'No',
    };
    expect (arrData ()).toContainEqual (thisQuestionClass);
  });

  test ('Test genHtmlTwo() function output to not be null', () => {
    expect (genHtmlTwo ()).not.toBe (null);
  });

  test ('Test clicks function to be truthy', () => {
    const myMockElement = {
      addEventListener: jest.fn (),
    };
    clickEv (myMockElement);
    expect (clickEv ()).toBeTruthy;
  });

  test ('Test calcScorePromise() function not to be null', () => {
    expect (calcScorePromise ()).not.toBeNull ();
  });

  
  test ('Test calcScorePromise() function initial value to be 0', () => {
    let totalScore = 0;
    expect (calcScorePromise(totalScore)).toEqual(0);
  });

  test ('Test calcScorePromise() function not to be 1 at initial value', () => {
    let totalScore = 0;
    expect (calcScorePromise (totalScore)).not.toBe (1);
  });

  test ('Test main div inner html not to be "This is some text"', () => {
    document.body.innerHTML = `
        <div id="main"></div>
      `;
    const insideDiv = document.getElementById ('main');
    expect (insideDiv.innerHTML).not.toBe ('This is some text');
  });
});
