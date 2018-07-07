$(document).ready(function() {
    var questionCount = 0;
    var time = 15;
    var rightAnswer = 0;
    var wrongAnswer = 0;

    var questions = [
      {
	    question: "Who was not a member of the Avengers?",
	    choices: ["Iron Man", "Captain America", "Wolverine", "Superman"],
	    correctAnswer: "Superman",
	  }, 
	  {
	    question: "Which is not an Infinity Stone?",
	    choices: ["Reality", "Power", "Wisdom", "Mind"],
	    correctAnswer: "Wisdom",
	  }, 
	  {
	    question: "How many Infinity Stones are there?",
	    choices: ["Six", "Three", "Eight:", "Twelve"],
	    correctAnswer: "Six",
	  }, 
	  {
	    question: "What is Peter Parker's superhero alias?",
	    choices: ["Professor X", "Spiderman", "Spider-Man", "Spider Man"],
	    correctAnswer: "Spider-Man",
	  }, 
	  {
	    question: "Who is not a member of the Fantastic Four?",
	    choices: ["Mister Fantastic", "Invisible Woman", "Thing", "Firestorm"],
	    correctAnswer: "Firestorm",
	  }];
	  
	function quizRun() {
    	$("#gameWindow").append("<p><strong>" + 
    		questions[questionCount].question + 
    		"</p><p class='choices'>" + 
    		questions[questionCount].choices[0] + 
    		"</p><p class='choices'>" + 
    		questions[questionCount].choices[1] + 
    		"</p><p class='choices'>" + 
    		questions[questionCount].choices[2] + 
    		"</p><p class='choices'>" + 
    		questions[questionCount].choices[3] + 
    		"</strong></p>");
	}

	function userWin() {
		$("#gameWindow").html("<p>You've got it!</p>");
		rightAnswer++;
		var correctAnswer = questions[questionCount].correctAnswer;
		$("#gameWindow").append("<p>Correct answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>");
		setTimeout(nextQuestion, 4000);
		questionCount++;
	}

	function userLoss() {
		$("#gameWindow").html("<p>Sorry, that's wrong.</p>");
		wrongAnswer++;
		var correctAnswer = questions[questionCount].correctAnswer;
		$("#gameWindow").append("<p>Correct answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>");
		setTimeout(nextQuestion, 4000);
		questionCount++;
	}

	function userTimesUp() {
		if (time === 0) {
			$("#gameWindow").html("<p>Time's Up!</p>");
			wrongAnswer++;
			var correctAnswer = questions[questionCount].correctAnswer;
			$("#gameWindow").append("<p>Correct answer was <span class='answer'>" + 
				correctAnswer + 
				"</span></p>");
			setTimeout(nextQuestion, 4000);
			questionCount++;
		}
	}

	function playerScore() {
		if (rightAnswer === questions.length) {
			var endMessage = "Nothing goes over my head. My reflexes are too fast, I would catch it.";
			var footer = "I could do this all day.";
		}
		else if (rightAnswer > wrongAnswer) {
			var endMessage = "There is nothing more reassuring than realizing the world is crazier than you are.";
			var footer = "We are Groot.";
		}
		else {
			var endMessage = "We have a Hulk.";
			var footer = "Hulk SMASH!";
		}
		$("#gameWindow").html("<p>" + endMessage + "</p>" + "<p>You got <strong>" + 
			rightAnswer + "</strong> right.</p>" + 
			"<p>You got <strong>" + wrongAnswer + "</strong> wrong.</p>");
		$("#gameWindow").append("<h1 id='start'>Start Over?</h1>");
		$("#footer").html(footer);
		gameReset();
		$("#start").click(nextQuestion);
	}

	function timer() {
		clock = setInterval(countDown, 1000);
		function countDown() {
			if (time < 1) {
				clearInterval(clock);
				userTimesUp();
			}
			if (time > 0) {
				time--;
			}
			$("#timer").html("<strong>" + time + "</strong>");
		}
	}

	function nextQuestion() {
		if (questionCount < questions.length) {
			time = 15;
			$("#gameWindow").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
			quizRun();
			timer();
			userTimesUp();
		}
		else {
			playerScore();
		}
	}
	function gameReset() {
		questionCount = 0;
		rightAnswer = 0;
		wrongAnswer = 0;
	}

    $("#start").click(nextQuestion);
	$("#gameWindow").on("click", ".choices", (function() {
		var userGuess = $(this).text();
		if (userGuess === questions[questionCount].correctAnswer) {
			clearInterval(clock);
			userWin();
		}
		else {
			clearInterval(clock);
			userLoss();
		}
	}));
});