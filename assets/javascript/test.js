// Wrap jQuery in DOM container
$(document).ready(function() {

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCjNWsgxlV_UMSDWSs3lS6mlOqHKeBjQt4",
    authDomain: "rps-c8817.firebaseapp.com",
    databaseURL: "https://rps-c8817.firebaseio.com",
    projectId: "rps-c8817",
    storageBucket: "rps-c8817.appspot.com",
    messagingSenderId: "962287367701"
  };
  firebase.initializeApp(config);
// Declare database variable
var database = firebase.database();

// Declare game object with player data
var gameObject = {
playerOne : {
          name : '',
          losses : 0,
          wins : 0,
          ties : 0,
          gameTurn : false
},
playerTwo : {
          name : '',
          wins : 0,
          losses : 0,
          ties : 0,
          gameTurn : false
},
turn : 0
}

// Determine how many users have logged-in
var userCounter = 0;

// When someone logs-in...
$('#submit').on('click', function() {
  // Refrain from refreshing the page
  event.preventDefault();
  // Add one to user count
  userCounter++;
  // If user count === 1....
  if(userCounter === 1) {
    console.log("THIS SHOULD BE 1", userCounter)
    // Set player one to log-in name
    gameObject.playerOne.name = $('#log-in').val().trim();
    // Push player one info into firebase
    database.ref().push(gameObject.playerOne);
    // Determine turn number
    database.ref().push(gameObject.turn);
    $('#playerOne p').empty();
    // Display user one's name (function declared below)
    renderPlayerOneName();
    // If user counter === 2....
  } else if(userCounter === 2) {
    console.log("THIS SHOULD BE 2", userCounter);
    // Set player two name to log-in value
    gameObject.playerTwo.name = $('#log-in').val().trim();
    // Push player two data into firebase
    database.ref().push(gameObject.playerTwo);
    console.log(gameObject.playerOne.name);
    // Empty player two div
    $('#playerTwo p').empty();
    // Render player two name
//     renderPlayerTwoName();
//     // Render game selections for player one
//     renderRockPaperScissors();
//     // Render player one's record
//     renderPlayerOneUserRecord();
//     changeTurn();
//     console.log('THIS SHOULD BE TURN 1', gameObject.turn)
//   } else {
//     console.log("THIS SHOULD BE > 2");
//     alert("Grab yourself a beer and please wait until the current game is over.")
//     return;
  } 
})

function renderPlayerOneName() {
  var html = '';
  html += `<p>${gameObject.playerOne.name}</p>`;
  $('#playerOne').prepend(html);
}

database.ref().on('child_added', function(userAdded) {
  console.log(userAdded.val().gameObject)
})

})

// function renderPlayerTwoName() {
//   var html = '';
//   html += `<p>${gameObject.playerTwo.name}</p>`;
//   $('#playerTwo').prepend(html);
// }

// function renderRockPaperScissors() {
//   var html = '';
//   html += '<div class="section">'
//   html += '<ul class="gameChoices">';
//   html += '<li class="choice" value="rock">Rock</li>';
//   html += '<li class="choice" value="paper">Paper</li>';
//   html += '<li class="choice" value="scissors">Scissors</li>';
//   html += '</ul>';
//   html += '</div>'
//   $('#playerOne').append(html);
//   // $('.gameChoices').css('list-style-type', 'none');
// }

// function changeTurn() {
//   gameObject.turn++;
// }

// function renderPlayerOneUserRecord() {
//   var html = '';
//   html += `<p>Wins: ${gameObject.playerOne.wins}</p>`
//   html += `<p>Losses: ${gameObject.playerOne.losses}</p>`
//   $('#playerOne').append(html);
// }

// $(document).on('click', '.choice', function(){
//   console.log('CLICKED');
//   console.log($(this).attr('value'));
//   changeTurn();
//   if($(this).attr('value') === 'rock') {
//     $('.section').empty();
//     $('.section').append('<p>Rock</p>');
//   } else if($(this).attr('value') === 'paper') {
//      $('.section').empty();
//       $('.section').append('<p>Paper</p>');
//     } else {
//       $('.section').empty();
//       $('.section').append('<p>Paper</p>');
//       }
// })

// // Once player one makes a selection - change to player two's turn.
// // Display player two choices
// // Player two makes a selection

// function decidePlayerTurn() {
//   if(gameObject.turn > 0 && gameObject.turn % 2 !== 0) {
//     gameObject.playerOne.gameTurn = true;
//     gameObject.playerTwo.gameTurn = false;
//   } else {
//     gameObject.playerTwo.gameTurn = true;
//     gameObject.playerOne.gameTurn = false;
//     } 
// }


// }) 


