// -----------------------Variables-----------------------
/*
question object needs question property, answer property, correct property.
{
String question
array answers
string correct answer
}

array of question objects
int of question count for tracking question number
int for correct
int for wrong
int for unanswered
var for holding the timer

*/

var questList = [
  {
    question: "This hero's ultimate is called Nano Boost",
    ansList: ["Ana", "Ashe", "Baptiste", "Bastion"],
    answer: "Ana"
  },
  {
    question: "This hero's ultimate is called B.O.B",
    ansList: ["Ana", "Ashe", "Baptiste", "Bastion"],
    answer: "Ashe"
  },
  {
    question: "This hero's ultimate is called Amplification Matrix",
    ansList: ["Ana", "Ashe", "Baptiste", "Bastion"],
    answer: "Baptiste"
  },
  {
    question: "This hero's ultimate is called Configuration: Tank",
    ansList: ["Ana", "Ashe", "Baptiste", "Bastion"],
    answer: "Bastion"
  },
  {
    question: "This hero's ultimate is called Rally",
    ansList: ["Brigitte", "D.Va", "Doomfist", "Genji"],
    answer: "Brigitte"
  },
  {
    question: "This hero's ultimate is called Self-Destruct",
    ansList: ["Brigitte", "D.Va", "Doomfist", "Genji"],
    answer: "D.Va"
  },
  {
    question: "This hero's ultimate is called Meteor Strike",
    ansList: ["Brigitte", "D.Va", "Doomfist", "Genji"],
    answer: "Doomfist"
  },
  {
    question: "This hero's ultimate is called Dragonblade",
    ansList: ["Brigitte", "D.Va", "Doomfist", "Genji"],
    answer: "Genji"
  },
  {
    question: "This hero's ultimate is called Dragonstrike",
    ansList: ["Hanzo", "Ashe", "Junkrat", "Bastion"],
    answer: "Hanzo"
  },
  {
    question: "This hero's ultimate is called Rip-Tire",
    ansList: ["Hanzo", "Ashe", "Junkrat", "Bastion"],
    answer: "Junkrat"
  }
];

var questionCnt = 0;
var rightCnt = 0;
var wrongCnt = 0;
var missedCnt = 0;
var timerCnt;
var timerDisp = 30;

// -----------------------Functions-----------------------

// Adjust screen for results.
function dispScreen(wasRight) {
  $('#descBar').css({
    'visibility': 'hidden',
    'display': 'none'
  });
  $('#timeBar').css({
    'visibility': 'hidden',
    'display': 'none'
  });
  $('#butt1').css({
    'visibility': 'hidden',
    'display': 'none'
  });
  $('#butt2').css({
    'visibility': 'hidden',
    'display': 'none'
  });
  $('#butt3').css({
    'visibility': 'hidden',
    'display': 'none'
  });
  $('#butt4').css({
    'visibility': 'hidden',
    'display': 'none'
  });

  if (wasRight) {
    $('#questP').html("That's correct! That ability does belong to " + questList[questionCnt].answer);
  }
  else {
    $('#questP').html("That's incorrect! That ability actually belongs to " + questList[questionCnt].answer);
  }

  if (questionCnt >= questList.length - 1) {
    $('#winP').html("Wins: " + rightCnt);
    $('#lossP').html("Losses: " + wrongCnt);
    $('#missP').html("Missed: " + missedCnt);
    $('#scoreBar').css({
      'visibility': 'visible',
      'display': 'block'
    });
    setTimeout(newGame, 1000 * 5);
  }

  else {
    questionCnt++;
    setTimeout(questScreen, 1000 * 2);
  }


}

// Reveal for question function
function questScreen() {
  $('#descBar').css({
    'visibility': 'visible',
    'display': 'block'
  });
  $('#scoreBar').css({
    'visibility': 'hidden',
    'display': 'none'
  });
  $('#timeBar').css({
    'visibility': 'visible',
    'display': 'block'
  });
  $('#timeP').html("Time Remaining: " + timerDisp);
  $('#questBar').css({
    'visibility': 'visible',
    'display': 'block'
  });
  $('#start').css({
    'visibility': 'hidden',
    'display': 'none'
  });
  $('#butt1').css({
    'visibility': 'visible',
    'display': 'block'
  });
  $('#butt2').css({
    'visibility': 'visible',
    'display': 'block'
  });
  $('#butt3').css({
    'visibility': 'visible',
    'display': 'block'
  });
  $('#butt4').css({
    'visibility': 'visible',
    'display': 'block'
  });

  timerCnt = setInterval(countDown, 1000);
  newQuestion();
}

// Check button function, determine if it sends to start game function or clicked answer function.
function clickedButton(buttonVal) {
  clearInterval(timerCnt);
  timerCnt = 30;
  timerDisp = 30;
  switch (buttonVal) {
    case '0':
      questScreen();
      break;
    default:
      var correctAns = "";
      var wasRight = false;
      while (correctAns === "") {
        questList[questionCnt].ansList.forEach(function (element) {
          if (element === questList[questionCnt].answer) {
            correctAns = questList[questionCnt].ansList.indexOf(element) + 1;
          }
        });

      }
      if (correctAns == buttonVal) {
        rightCnt++;
        wasRight = true;
        dispResults(correctAns, wasRight);
      }

      else {
        wrongCnt++;
        wasRight = false;
        dispResults(correctAns, wasRight);
      }
      break;
  }
}

//Display question function
function newQuestion() {
  $('#questP').html(questList[questionCnt].question);
  $('#butt1').html(questList[questionCnt].ansList[0]);
  $('#butt2').html(questList[questionCnt].ansList[1]);
  $('#butt3').html(questList[questionCnt].ansList[2]);
  $('#butt4').html(questList[questionCnt].ansList[3]);
}

function countDown() {
  if (!timerDisp == 0) {
    $('#timeP').html("Time Remaining: " + timerDisp);
    timerDisp--;
  }
  else {
    clickedButton(9);
  }
}

// reset for newgame
function newGame() {
  rightCnt = 0;
  wrongCnt = 0;
  missedCnt = 0;
  questionCnt = 0;

  $('#start').css({
    'visibility': 'visible',
    'display': 'block'
  });
  $('#scoreBar').css({
    'visibility': 'hidden',
    'display': 'none'
  });
  $('#questBar').css({
    'visibility': 'hidden',
    'display': 'none'
  });
}

//display result function for right or wrong answers
function dispResults(correctIndex, wasRight) {
  dispScreen(wasRight);
}

// -----------------------Main steps-----------------------

// Listener for button click, sending to check button function.
$("button").click(function () {
  clickedButton(this.value);
});

