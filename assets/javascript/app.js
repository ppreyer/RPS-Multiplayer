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

// Declare gameObject
var gameObject = {
      players : 
              {
                one :
                  {
                    name : '',
                    selection : '',
                    wins : 0,
                    losses : 0,
                    ties : 0
                  },

                two :
                  {
                    name : '',
                    selection : '',
                    wins : 0,
                    losses : 0,
                    ties : 0
                  },
              },
        userTurn : 1
    }

// Declare global variables
// Counts user log-in number
var userCounter = 0;
// Firebase variable
var database = firebase.database();
// Stores firebase children for easy access
var usersRef = database.ref().child('users');
var playerOneRef = usersRef.child('players').child('one');
var playerTwoRef = usersRef.child('players').child('two');

function updatePlayerOneSelection() {
  playerOneRef.update({
    'selection' : 'rock'
  })
}

function updatePlayerTwoSelection() {
  playerTwoRef.update({
    'selection' : 'rock'
  })
}

updatePlayerOneSelection();
updatePlayerTwoSelection();

// Store user log-in info
$('#submit').on('click', function(){
  // Prevent from submitting on button click
  event.preventDefault();
  // Assign log-in value to object property
  gameObject.players.one.name = $('#log-in').val().trim();
  // Add one to userCounter
  userCounter++;
  // Conditional -- if first person to log in...
  if(userCounter === 1) {
    // Set firebase database to object
    usersRef.set(gameObject);
    console.log(gameObject);
    // Delete playerOne div in html
    $('#playerOne p').empty();
    // Declare playerTwo variable
    var playerTwo = gameObject.players.two;
    // Look at first player values in firebase...
    playerOneRef.on('value', function(user){
    // Declare first player name with username from firebase
    var userOneName = user.val().name;
    // Append name to playerOne div in html
    $('#playerOne').append(userOneName);      
})
    // Else if player log-in === 2...
  } else if(userCounter === 2) {
      // Declare player two name with second player log-in value
      var playerTwoName = gameObject.players.two.name;
      playerTwoName = $('#log-in').val().trim();
      // Empty player two html div
      $('#playerTwo p').empty();
      // Update firebase database with player two info
      playerTwoRef.update({
      'name' : playerTwoName
      });
      // Look at player two data in firebase
      playerTwoRef.on('value', function(user){
      // Assign a value to user two variable
      var userTwoName = user.val().name;
      // Prepend data to user two div in html
      $('#playerTwo').prepend(userTwoName);
      })
      // Invoke RPS function - defined below...
      renderRockPaperScissorsUserOne();
      // Look at player one values in firebase
      playerOneRef.on('value', function(user){
        // Declare wins and losses variables
        var userOneWins = user.val().wins;
        var userOneLosses = user.val().losses;
        // Append data to player one div in html
        $('#playerOne').append('<p> Wins:' + ' ' + userOneWins + ' ' + 'Losses:' + ' ' + userOneLosses + '</p>');
      })
      // Look at player two data in firebase
      playerTwoRef.on('value', function(user){
        // Declare wins and loss data from firebase
        var userTwoWins = user.val().wins;
        var userTwoLosses = user.val().losses;
        // Append data to html
        $('#playerTwo').append('<div id="rps"></div>')
        $('#playerTwo').append('<p> Wins:' + ' ' + userTwoWins + ' ' + 'Losses:' + ' ' + userTwoLosses + '</p>');      
      })
      // else...
    } else {
      // Tell the next user to wait their turn
      alert('Grab a beer and wait your turn!')
      }
})

// Function appends the appropriate game choices for user one
function renderRockPaperScissorsUserOne() {
  // Declare empty html variable
  var html = '';
  // Add list of RPS choices
  html += '<div class="sectionOne">'
  html += '<ul class="gameChoices">';
  html += '<li class="choiceOne" value="rock">Rock</li>';
  html += '<li class="choiceOne" value="paper">Paper</li>';
  html += '<li class="choiceOne" value="scissors">Scissors</li>';
  html += '</ul>';
  html += '</div>'
  // Append html to the page
  $('#playerOne').append(html);
}

// Function appends appropriate game choices for user two
function renderRockPaperScissorsUserTwo() {
  var html = '';
  html += '<div class="sectionTwo">'
  html += '<ul class="gameChoices">';
  html += '<li class="choiceTwo" value="rock">Rock</li>';
  html += '<li class="choiceTwo" value="paper">Paper</li>';
  html += '<li class="choiceTwo" value="scissors">Scissors</li>';
  html += '</ul>';
  html += '</div>'
  $('#rps').append(html);
}

// When user one clicks from the first set of choices...
$(document).on('click', '.choiceOne', function(){
  console.log('CLICKED');
  // Update firebase turn number in database
  usersRef.update({
    'userTurn' : 2
  })
  console.log(gameObject.userTurn);
  // Conditional - if the choice === 'rock'
  if($(this).attr('value') === 'rock') {
    // Empty list and append rock
    $('.sectionOne').empty();
    $('.sectionOne').append('<p>Rock</p>');
    // Update firebase with user's selection
    var rock = $(this).attr('value');
    // playerOneRef.update({
    //   'selection' : rock
    // });
    // Invoke userTwoSelection - defined below...
    userTwoSelection();
    console.log(gameObject);
    // Repeat above steps with paper
  } else if($(this).attr('value') === 'paper') {
     $('.sectionOne').empty();
      $('.sectionOne').append('<p>Paper</p>');
      var paper = $(this).attr('value');
      playerOneRef.update({
      'selection' : paper
      });
      userTwoSelection();
      // Repeat above steps with scissors
    } else {
      $('.sectionOne').empty();
      $('.sectionOne').append('<p>Scissors</p>');
      var scissors = $(this).attr('value');
      playerOneRef.update({
      'selection' : scissors
      });
      userTwoSelection();
      }
});

// Repeat above click event listener but with player two choices
$(document).on('click', '.choiceTwo', function(){
  console.log('CLICKED');
  usersRef.update({
    'userTurn' : 3
  })
  if($(this).attr('value') === 'rock') {
    $('.sectionTwo').empty();
    $('.sectionTwo').append('<p>Rock</p>');
    var rock = $(this).attr('value');
    // playerTwoRef.update({
    //   'selection' : rock
    // });
    // compareUserSelections();
  } else if($(this).attr('value') === 'paper') {
     $('.sectionTwo').empty();
      $('.sectionTwo').append('<p>Paper</p>');
      var paper = $(this).attr('value');
      playerTwoRef.update({
      'selection' : paper
      });
    compareUserSelections();  
    } else {
      $('.sectionTwo').empty();
      $('.sectionTwo').append('<p>Scissors</p>');
      var scissors = $(this).attr('value');
      playerTwoRef.update({
      'selection' : scissors
      });
      compareUserSelections();
      }
});

// Function to determine if it's player two's turn
function userTwoSelection() {
  // Look at firebase database
  usersRef.on('value', function(user){
    // Conditional -- if it's user two's turn...
    if(user.val().userTurn === 2) {
      console.log(user.val().userTurn);
      // Invoke function to render RPS choices for that user
      renderRockPaperScissorsUserTwo();
      // playerTwoRef.on('value', function(user){
      // var userTwoWins = user.val().wins;
      // var userTwoLosses = user.val().losses;
      // $('#playerTwo').append('Wins:' + ' ' + userTwoWins + ' ' + 'Losses:' + ' ' + userTwoLosses);
      }
    })
  }

// Function compares choices made by both players
function compareUserSelections() {
  // Declare variables to store selections made by both players
  var userOneChoice = $('.sectionOne p').text().toLowerCase();
  var userTwoChoice = $('.sectionTwo p').text().toLowerCase();
  console.log(userOneChoice);
  console.log(userTwoChoice);
  // Conditional - if both choices match up...
  if(userOneChoice === userTwoChoice) {
    // Add one to ties for both players
    gameObject.players.one.ties++;
    gameObject.players.two.ties++;
    // Update records in firebase
    playerOneRef.update({
      'ties' : gameObject.players.one.ties
    })
    playerTwoRef.update({
      'ties' : gameObject.players.two.ties
    })
    // Go through and compare RPS choices with each other and update wins/losses appropriately...
  } else if(userOneChoice === 'rock' && userTwoChoice === 'paper') {
      gameObject.players.one.losses++;
      gameObject.players.two.wins++;
      playerOneRef.update({
      'losses' : gameObject.players.one.losses
    })
    playerTwoRef.update({
      'wins' : gameObject.players.two.wins
    })
    } else if(userOneChoice === 'rock' && userTwoChoice === 'scissors') {
      gameObject.players.one.wins++;
      gameObject.players.two.losses++;
      playerOneRef.update({
      'wins' : gameObject.players.one.wins
    })
    playerTwoRef.update({
      'losses' : gameObject.players.two.losses
    })
    } else if(userOneChoice === 'paper' && userTwoChoice === 'rock') {
      gameObject.players.one.wins++;
      gameObject.players.two.losses++;
      playerOneRef.update({
      'wins' : gameObject.players.one.wins
    })
    playerTwoRef.update({
      'losses' : gameObject.players.two.losses
    })
    } else if(userOneChoice === 'paper' && userTwoChoice === 'scissors') {
        gameObject.players.one.losses++;
        gameObject.players.two.wins++;
        playerOneRef.update({
        'losses' : gameObject.players.one.losses
        })
        playerTwoRef.update({
          'wins' : gameObject.players.two.wins
        })
      } else if(userOneChoice === 'scissors' && userTwoChoice === 'rock') {
          gameObject.players.one.losses++;
          gameObject.players.two.wins++;
          playerOneRef.update({
          'losses' : gameObject.players.one.losses
          })
          playerTwoRef.update({
          'wins' : gameObject.players.two.wins
          })
        } else if(userOneChoice === 'scissors' && userTwoChoice === 'paper') {
            gameObject.players.one.wins++;
            gameObject.players.two.losses++;
          }
}


});