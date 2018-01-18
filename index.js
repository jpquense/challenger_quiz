'use strict';
// Quiz Data
const QUESTIONS = [
{
	question: 'What type of car is a Dodge Challenger?',
	answers: ['Coupe', 'Sedan', 'Hatchback', 'Pickup Truck'],
	correctIndex: '0'
}, {
	question: 'Which is not a Dodge Challenger model?',
	answers: ['Scat Pack', 'Hellcat', 'Shelby Gt500', 'Demon'],
	correctIndex: '2'
}, {
	question: 'Which Dodge Challenger trim levels have an eight cylinder engine?',
	answers: ['392', 'RT', 'Hellcat', 'All of the above'],
	correctIndex: '3'
}, {
	question: 'Which is not a 2018 Dodge Challenger engine offering?',
	answers: ['2.4 liter 4 cylinder flex fuel', '3.7 liter Pentstar 6 cylinder', '5.7 liter 8 cylinder Hemi', '6.4 liter 8 cylinder392 Hemi'],
	correctIndex: '0'
}, {
	question: 'Which Dodge Challenger has the most horse power?',
	answers: ['Scat Pack', '392', 'Demon', 'Hellcat'],
	correctIndex: '2'
}, {
	question: 'How much horse power does the Dodge Hellcat have?',
	answers: ['500 HP', '475 HP', '707 HP', '815 HP'],
	correctIndex: '2'
}, {
	question: 'Which Dodge Challenger trim utilizes forced induction?',
	answers: ['Demon', 'RT', 'Scat Pack', 'GT'],
	correctIndex: '0'
}, {
	question: 'Which Dodge Challenger model is AWD?',
	answers: ['392', 'Hellcat', 'Demon', 'Gt'],
	correctIndex: '3'
}, {
	question: 'Which Dodge Challenger has the highest MSRP out of the factory?',
	answers: ['SXT', 'Demon', 'GT', 'Hellcat'],
	correctIndex: '1'		
}, {
	question: 'Which Dodge Challenger has a special edition wide body model for 2018?',
	answers: ['GT', 'Hellcat', 'Scat Pack', 'SXT'],
	correctIndex: '1'
}
];

// Quiz counters
let questionIndex = 0;
let correctAnswers = 0;

// Quiz methods

//Render Current Question
function renderCurrentQuestion() {
	const answersHtml = QUESTIONS[questionIndex].answers.map(function(item, index) {
		return `
			<div class="answer col-12">
	        	<input type="radio" name="answer" id="${index}" value="${index}">
	        	<label class="question-answer" for="${index}">${item}</label>
			</div>`
	}).join('');
	$('.js-app').html(`
		<header role="banner" class="row">
			<div class="col-12">
				<h1>Challenger Quiz</h1>
			</div>
    	</header>
		
		<main role="main" class="row">
		  <form action="/some-server-endpoint" method ='post'>
	        <fieldset name="questionsAnswers">
	      	    <legend class="question col-12">${QUESTIONS[questionIndex].question}</legend>
	  				${answersHtml}
	        <div class="col-12 js-errMessage"></div>
	    		<div class="col-12">
	    			<button type="submit">Submit</button>
	    		</div>				
	  				
	   		</fieldset>
			</form>  
		</main>
		
		<footer role="contentinfo" class="row">
  		<div class="col-6 info">
  			<p>Quest: ${questionIndex + 1}/10</p>
  		</div>
  		<div class="col-6 info">
  			<p>Score: ${correctAnswers}/${questionIndex}</p>
  		</div>
  	</footer>`);
}

// Respond when wrong anser is submitted
function respondWrongAnswer() {
	const correctIndexNum = Number(QUESTIONS[questionIndex].correctIndex);
	$('.js-app').html(`
		<main role="main" class="row">
      <section role="region" class="solution-wrong col-12">
      	<p>Incorrect! Crash... brake!
      	<p>Correct Answer: "${QUESTIONS[questionIndex].answers[correctIndexNum]}".</p>
    	</section>
  		<section role="region" class="smallImg">
  			<img src="http://s3.amazonaws.com/digitaltrends-uploads-prod/2014/12/hellcat-crash-1.jpg" alt="Totally wrecked Green Dodge Hellcat.">
  		</section>
	  </main>
	
  <nav role="navigation" class="row">
		<div class="col-12">
		  <p><button id="next">Next Question</button></p>
		</div>
  </nav>
	`);
}

// respond to correct anser input
function respondCorrectAnswer() {
	const correctIndexNum = Number(QUESTIONS[questionIndex].correctIndex);
	$('.js-app').html(`
		<main role="main" class="row">
			<section role="region" class="solution-correct col-12">
				<p>Answer: "${QUESTIONS[questionIndex].answers[correctIndexNum]}" was Correct!</p>
			</section>
			<section role="region" class="smallImg">
				<img src="https://i.kinja-img.com/gawker-media/image/upload/s--lBvPB37d--/c_scale,fl_progressive,q_80,w_800/joirohnxmyx1zp6uwe3g.jpg" alt="Red Dodge Demon parked on a race track.">
			</section>
		</main>
		
	  <nav role="navigation" class="row">
  		<div class="col-12">
  		  <p><button id="next">Next Question</button></p>
  		</div>
   </nav>
		`);
}

// must select answer err scoreMessage
function errMesage() {
  $('.js-errMessage').addClass('errMessage').text('ooooops! select answer').slideDown();
}

// remove err message
function removeErrMessage() {
  $('.js-errMessage').removeClass('errMessage').remove();
}

// load finish page
function loadFinishPage() {
	const passingHtml = `You Passed! Your score was: ${correctAnswers} / 10. Congratulations!`;
	const failingHtml = `You failed. Your score was: "${correctAnswers} / 10". Please try again.`;
	const questionsHtml = QUESTIONS.map(function(QUESTIONS) {
		return `
			<section role="region" class="wrapUp col-12">
	        	<h3>${QUESTIONS.question}</h3>
	        	<p>${QUESTIONS.answers[QUESTIONS.correctIndex]}</p>
			</section>`
    }).join('');
	let scoreMessage;
	if (correctAnswers > 6) {
		scoreMessage = passingHtml;
	} else {
		scoreMessage = failingHtml;
	}

	$('.js-app').html(`
		<header role="banner" class="row">
			<div class="col-12">
				<h1>Challenger Quiz</h1>
			</div>
		</header>
		
		<section role="region" class="row">	
			<div class="col-6">
				<img src="https://media.ed.edmunds-media.com/dodge/challenger/2015/oem/2015_dodge_challenger_coupe_scat-pack_fq_oem_3_1280.jpg" alt="Black Dodge Hellcat parked in an alley way.">
			</div>
			<div class="col-6">
				<img src="https://hothardware.com/ContentImages/NewsItem/39893/content/small_challenger_srt_hellcat.jpg" alt="Green Dodge Hellcat with a black hood parked in an alley way.">
			</div>
		</section>
		
		<main role="main" class="row">
			<div class="finish col-12">
				<p>${scoreMessage}</p>
			</div>
			${questionsHtml}
			<div class="finish col-12">
				<p>Press the peddle to start over again.</p>
			</div>
		</main>
		
		<nav role="navigation" class="row">
			<div class="col-12">
				<p><button id="startOver">Start Over</button></p>
			</div>
		</div>`);
}

// listening for clicked events

// render current question when start button is pressed
$('.js-begin').click(renderCurrentQuestion)

// submit form and go to answer (wrong or right)
$('.js-app').on('submit', 'form', function(event) {
  event.preventDefault();
	const selectedAnswer = $('input[name=answer]:checked').val();
	
	if (!selectedAnswer) {
		errMesage();
	} else {
		if (selectedAnswer === QUESTIONS[questionIndex].correctIndex) {
			respondCorrectAnswer();
			correctAnswers++;
		} else {
			respondWrongAnswer();
		}
		
		if (questionIndex < (QUESTIONS.length)) {
			questionIndex++;
		}
	}
});

// remove err message
$('.js-app').on('click', 'input[type="radio"]', event => removeErrMessage());

// go from answer sheet to next question or final page
$('.js-app').on('click', '#next', function() {
	if (questionIndex < QUESTIONS.length) {
	  renderCurrentQuestion()
  } else {
	  loadFinishPage();
  }
});

// reload start page
$('.js-app').on('click', '#startOver', function(event) {
	window.location.reload(true);
});




