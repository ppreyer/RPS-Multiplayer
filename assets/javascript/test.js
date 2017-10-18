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
        players: {
            one: {
                name: '',
                selection: '',
                wins: 0,
                losses: 0,
                ties: 0
            },

            two: {
                name: '',
                selection: '',
                wins: 0,
                losses: 0,
                ties: 0
            },
        },
        userTurn: 1
    }

    // Declare global variables
    // Counts user log-in number
    var userCounter = 0;
    // Firebase variable
    var database = firebase.database();
    // Stores firebase children for easy access
    var usersRef = database.ref().child('users');
    var playerOneRef = database.ref().child('players').child('one');
    var playerTwoRef = database.ref().child('players').child('two');

    function setObjectToFirebase() {
        database.ref().set(gameObject);
    }

    setObjectToFirebase();

    // Store user log-in info
    $('#submit').on('click', function() {
        // Prevent from submitting on button click
        event.preventDefault();
        // Assign log-in value to object property
        gameObject.players.one.name = $('#log-in').val().trim();
        console.log(gameObject);
        userCounter++;
        if (userCounter === 1) {
            $('#playerOne p').empty();
            playerOneRef.update({
                'name': gameObject.players.one.name
            });
            
            $('#playerOne').append(`<p>${gameObject.players.one.name}</p>`);
        } else if (userCounter === 2) {
            // Declare player two name with second player log-in value
           console.log("Two", userCounter);
           gameObject.players.two.name = $('#log-in').val().trim();

           console.log(gameObject);
           playerTwoRef.update({
                'name': gameObject.players.two.name
            });
            $('#playerTwo p').empty();
            $('#playerTwo').prepend(`<p>${gameObject.players.two.name}</p>`);
            renderRockPaperScissorsUserOne();
            $('#playerOne').append('<p> Wins:' + ' ' + gameObject.players.one.wins + ' ' + 'Losses:' + ' ' + gameObject.players.one.losses + '</p>');
            $('#playerTwo').append('<div id="rps"></div>')
            $('#playerTwo').append('<p> Wins:' + ' ' + gameObject.players.two.wins + ' ' + 'Losses:' + ' ' + gameObject.players.two.losses + '</p>');

            } else {
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
    $(document).on('click', '.choiceOne', function() {
        console.log('CLICKED');
        // Update firebase turn number in database
        // usersRef.update({
        //     'userTurn': 2
        // })
        gameObject.userTurn = 1;
        // Conditional - if the choice === 'rock'
        setObjectToFirebase();
        console.log('After Set', gameObject);
        if ($(this).attr('value') === 'rock') {
            // Empty list and append rock
            $('.sectionOne').empty();
            $('.sectionOne').append('<p>Rock</p>');
            // Update firebase with user's selection
            gameObject.players.one.selection = $(this).attr('value');
            var rock = gameObject.players.one.selection;
            // debugger;
            playerOneRef.update({
                'selection': rock
            });
            // Invoke userTwoSelection - defined below...
            renderRockPaperScissorsUserTwo();
            gameObject.userTurn = 2;
            // Repeat above steps with paper
        } else if ($(this).attr('value') === 'paper') {
            $('.sectionOne').empty();
            $('.sectionOne').append('<p>Paper</p>');
            gameObject.players.one.selection = $(this).attr('value');
            var paper = gameObject.players.one.selection;
            playerOneRef.update({
                'selection': paper
            });
            renderRockPaperScissorsUserTwo();
            gameObject.userTurn = 2;
            // Repeat above steps with scissors
        } else {
            $('.sectionOne').empty();
            $('.sectionOne').append('<p>Scissors</p>');
            gameObject.players.one.selection = $(this).attr('value');
            var scissors = gameObject.players.one.selection;
            playerOneRef.update({
                'selection': scissors
            });
            renderRockPaperScissorsUserTwo();
            gameObject.userTurn = 2;
        }
    });

    // Repeat above click event listener but with player two choices
    $(document).on('click', '.choiceTwo', function() {
        console.log('CLICKED');
        // usersRef.update({
        //     'userTurn': 3
        // })
        if ($(this).attr('value') === 'rock') {
            $('.sectionTwo').empty();
            $('.sectionTwo').append('<p>Rock</p>');
            gameObject.players.two.selection = $(this).attr('value');
            var rock = gameObject.players.two.selection
            playerTwoRef.update({
                'selection': rock
            });
            compareUserSelections();
        } else if ($(this).attr('value') === 'paper') {
            $('.sectionTwo').empty();
            $('.sectionTwo').append('<p>Paper</p>');
            gameObject.players.two.selection = $(this).attr('value');
            var paper = gameObject.players.two.selection;
            playerTwoRef.update({
                'selection': paper
            });
            compareUserSelections();
        } else {
            $('.sectionTwo').empty();
            $('.sectionTwo').append('<p>Scissors</p>');
            gameObject.players.two.selection = $(this).attr('value');
            var scissors = gameObject.players.two.selection;
            playerTwoRef.update({
                'selection': scissors
            });
            compareUserSelections();
        }
    });

    // Function to determine if it's player two's turn
    function userTwoSelection() {
        // Look at firebase database
        usersRef.on('value', function(user) {
            // Conditional -- if it's user two's turn...
            if (user.val().userTurn === 2) {
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

    function renderWinner(player) {
        if(player === 'tie') {
            $('#result').append(`<h3>Tie Ballgame!</h3>`);
        }
        else if(player === gameObject.players.one.name) {
            playerOneRef.on('value', function(user){
                playerOneName = user.val().name;
                $('#result').append(`<h3>${playerOneName} Wins!`);
            })
        } else {
            playerTwoRef.on('value', function(user){
            var playerTwoName = user.val().name;
            console.log(playerTwoName);
            $('#result').append(`<h3> ${playerTwoName} Wins!</h3>`);
        })
    }
}
    // Function compares choices made by both players
    function compareUserSelections() {
        // Declare variables to store selections made by both players
        var userOneChoice = $('.sectionOne p').text().toLowerCase();
        var userTwoChoice = $('.sectionTwo p').text().toLowerCase();
        // Conditional - if both choices match up...
        if (userOneChoice === userTwoChoice) {
            // Add one to ties for both players
            gameObject.players.one.ties++;
            gameObject.players.two.ties++;
            var tie = 'tie';
            renderWinner(tie);
            // Update records in firebase
            playerOneRef.update({
                'ties': gameObject.players.one.ties
            })
            playerTwoRef.update({
                'ties': gameObject.players.two.ties
            })
            // Go through and compare RPS choices with each other and update wins/losses appropriately...
        } else if (userOneChoice === 'rock' && userTwoChoice === 'paper') {
            gameObject.players.one.losses++;
            gameObject.players.two.wins++;
            renderWinner(gameObject.players.two.name);
            playerOneRef.update({
                'losses': gameObject.players.one.losses
            })
            playerTwoRef.update({
                'wins': gameObject.players.two.wins
            })
        } else if (userOneChoice === 'rock' && userTwoChoice === 'scissors') {
            gameObject.players.one.wins++;
            gameObject.players.two.losses++;
            console.log(gameObject);
            renderWinner(gameObject.players.one.name);
            playerOneRef.update({
                'wins': gameObject.players.one.wins
            })
            playerTwoRef.update({
                'losses': gameObject.players.two.losses
            })
        } else if (userOneChoice === 'paper' && userTwoChoice === 'rock') {
            gameObject.players.one.wins++;
            gameObject.players.two.losses++;
            playerOneRef.update({
                'wins': gameObject.players.one.wins
            })
            playerTwoRef.update({
                'losses': gameObject.players.two.losses
            })
        } else if (userOneChoice === 'paper' && userTwoChoice === 'scissors') {
            gameObject.players.one.losses++;
            gameObject.players.two.wins++;
            playerOneRef.update({
                'losses': gameObject.players.one.losses
            })
            playerTwoRef.update({
                'wins': gameObject.players.two.wins
            })
        } else if (userOneChoice === 'scissors' && userTwoChoice === 'rock') {
            gameObject.players.one.losses++;
            gameObject.players.two.wins++;
            playerOneRef.update({
                'losses': gameObject.players.one.losses
            })
            playerTwoRef.update({
                'wins': gameObject.players.two.wins
            })
        } else if (userOneChoice === 'scissors' && userTwoChoice === 'paper') {
            gameObject.players.one.wins++;
            gameObject.players.two.losses++;
        }
    }


});