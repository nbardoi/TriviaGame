var triviaQuestions = [{
	question: "How many sisters does Joey have?",
	answerList: ["Nine", "Five", "Six", "Seven"],
	answer: 3
},{
	question: "The 'Geller Cup' is a prize in which sport?",
	answerList: ["Soccer", "Football", "Basketball", "Tennis"],
	answer: 1
},{
	question: "What is Joey's ethnic origin?",
	answerList: ["Italian", "Russian", "English", "French"],
	answer: 0
},{
	question: "Which actor plays Ross' friend Will from high school?",
	answerList: ["Leonardo Dicaprio", "Alec Baldwin", "Brad Pitt", "Johnny Depp"],
	answer: 2
},{
	question: "Where did Monica and Chandler first get together?",
	answerList: ["London", "Paris", "New York City", "Las Vegas"],
	answer: 0
},{
	question: "How many Friends have worked in the coffee shop?",
	answerList: ["Five", "Two", "Six", "Three"],
	answer: 1
},{
	question: "What does Monica's dad give her to compensate ruining her childhood possesions?",
	answerList: ["Porsche", "Trophy", "Painting", "Cadillac"],
	answer: 0
},{
	question: "Whose catchphrase is 'Oh My God!'?",
	answerList: ["Gunther", "Janice", "Mr.Heckles", "Carol"],
	answer: 1
},{
	question: "What was the nationality of Ross' second wife, Emily?",
	answerList: ["Italian", "Polish", "French", "English"],
	answer: 3
},{
	question: "How many babies are born on the show?",
	answerList: ["Nine", "Seven", "Six", "Three"],
	answer: 1
},{
	question: "To get over Richard, what did Monica start making?",
	answerList: ["Jam", "Marmalade", "Candy", "Pancakes"],
	answer: 0
},{
	question: "In which city is Friends set?",
	answerList: ["Los Angeles", "New York City", "Miami", "Seattle"],
	answer: 1
},{
	question: "What's the title of the Friends theme song?",
	answerList: ["I'll Be There For Them", "I'll Be There For You", "I'll Be There For Those", "I'll Be There For That"],
	answer: 1
},{
	question: "What hangs on the door of Monica's apartment?",
	answerList: ["Coat Hook", "Key Hook", "Yellow Picture Frame", "Baseball Cap"],
	answer: 2
},{
	question: "How many women give birth before Rachel in the hospital (i.e. the same day)?",
	answerList: ["Five", "Seven", "Six", "Three"],
	answer: 0
}];

var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;

var messages = {
	correct: "Yes, that's right!",
	incorrect: "Nope, that's not it.",
	endTime: "You're out of time!",
	finished: "Alright! Let's see how well you did."
}

$("#gameCol").hide();

$("#startBtn").on('click', function(){
    $(".jumbotron").hide();
	$(this).hide();
	newGame();
});

$("#startOverBtn").on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$("#gameCol").show();
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	answered = true;
	
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+' of '+triviaQuestions.length);
	$('.question').html(triviaQuestions[currentQuestion].question);
	
	for(var i = 0; i < 4; i++){

		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}

	countdown();
	
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty();
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 3000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 3000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}