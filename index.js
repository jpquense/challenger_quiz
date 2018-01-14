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
function loadFinishPage() {
	const passingHtml = `You Passed! Your score was: ${correctAnswers} / 10. Congratulations!`;
	const failingHtml = `You failed. Your score was: "${correctAnswers} / 10". Please try again.`;

	const questionsHtml = QUESTIONS.map(function(QUESTIONS) {
		return `
			<div class="wrapUp col-12">
	        	<h3>${QUESTIONS.question}</h3>
	        	<p>${QUESTIONS.answers[QUESTIONS.correctIndex]}</p>
			</div>`
}).join('');
	let scoreMessage;
	if (correctAnswers > 6) {
		scoreMessage = passingHtml;
	} else {
		scoreMessage = failingHtml;
	}

	$('.js-app').html(`
		<div class="row">
			<div class="col-12">
				<h1>Challenger Quiz</h1>
			</div>
		</div>	
		<div class="row">	
			<div class="col-6">
				<img src="https://media.ed.edmunds-media.com/dodge/challenger/2015/oem/2015_dodge_challenger_coupe_scat-pack_fq_oem_3_1280.jpg" alt="Black Dodge Hellcat parked in an alley way.">
			</div>
			<div class="col-6">
				<img src="https://hothardware.com/ContentImages/NewsItem/39893/content/small_challenger_srt_hellcat.jpg" alt="Green Dodge Hellcat with a black hood parked in an alley way.">
			</div>
		</div>
		<div class="row">
			<div class="finish col-12">
				<p>${scoreMessage}</p>
			</div>
			${questionsHtml}
			<div class="finish col-12">
				<p>Press the peddle to start over again.</p>
			</div>
		</div>
		<div class="row footer">
			<div class="col-12">
				<p><button id="startOver">Start Over</button></p>
			</div>
		</div>`);
}
function respondCorrectAnswer() {
	const correctIndexNum = Number(QUESTIONS[questionIndex].correctIndex);
	$('.js-app').html(`
		<div class="row">
			<div class="solution-correct col-12">
				<p>Answer: "${QUESTIONS[questionIndex].answers[correctIndexNum]}" was Correct!</p>
			</div>
			<div class="col-12">
				<img src="https://i.kinja-img.com/gawker-media/image/upload/s--lBvPB37d--/c_scale,fl_progressive,q_80,w_800/joirohnxmyx1zp6uwe3g.jpg" alt="Red Dodge Demon parked on a race track.">
			</div>
		</div>`);
}
function respondWrongAnswer() {
	const correctIndexNum = Number(QUESTIONS[questionIndex].correctIndex);
	$('.js-app').html(`
		<div class="row">
	        <div class="solution-wrong col-12">
	        	<p>Incorrect! Crash... brake!
	        	<p>Correct Answer: "${QUESTIONS[questionIndex].answers[correctIndexNum]}".</p>
        	</div>
			<div class="col-12">
				<img src="http://s3.amazonaws.com/digitaltrends-uploads-prod/2014/12/hellcat-crash-1.jpg" alt="Totally wrecked Green Dodge Hellcat.">
			</div>
		</div>`);
}
function renderCurrentQuestion() {
	const answersHtml = QUESTIONS[questionIndex].answers.map(function(item, index) {
		return `
			<div class="answer col-12">
	        	<input type="radio" name="answer" value="${index}">
	        	<label for="answer">${item}</label>
			</div>`
	}).join('');
	$('.js-app').html(`
		<div class="row">
			<div class="col-12">
				<h1>Challenger Quiz</h1>
			</div>
		</div>	
		<div class="row">
	        <div class="col-12">
	    	    <h2 class="question">${QUESTIONS[questionIndex].question}</h2>
        	</div>		
        </div>
		<div class="js-answers row">
	    	<form>
				${answersHtml}
			</form>
		</div>
		<div class="row footer">
    		<div class="col-3">
    			<p>Quest: ${questionIndex + 1}</p>
    		</div>
    		<div class="col-3">
    			<p>Score: ${correctAnswers}/${questionIndex}</p>
    		</div>
    		<div class="col-3">
    			<p><button id="prev">Prev. Page</button></p>
    		</div>
    		<div class="col-3">
    		<p><button id="next">Next Page</button></p>
    		</div>
    	</div>`);
}
// listening for clicked events
$('.js-app').on('click', '#prev', function(event) {
	const confirmPrev = confirm("Warning you will lose all your correct answers if you continue!");
	if (confirmPrev === true) {
		console.log(questionIndex, QUESTIONS.length)
		if ((questionIndex < QUESTIONS.length) & (questionIndex > 0)) {
			questionIndex--;
			correctAnswers = 0;
			setTimeout(renderCurrentQuestion, 1000)		
		} else {
			window.location.reload(true);
		}
	} else {
		renderCurrentQuestion();
	}	
});
$('.js-app').on('click', '#startOver', function(event) {
	window.location.reload(true);
});

$('.js-app').on('click', '#next', function(event) {
	const selectedAnswer = $('input[name=answer]:checked').val();
	if (!selectedAnswer) {
		alert('Please select a possible solution');
	}
	else {
		if (selectedAnswer === QUESTIONS[questionIndex].correctIndex) {
			respondCorrectAnswer();
			correctAnswers++;

		} else {
			respondWrongAnswer();
		}
		if (QUESTIONS.length -1 > questionIndex) {
			questionIndex++;
			setTimeout(renderCurrentQuestion, 3000)	
		} else {
			loadFinishPage();
		}
	}
});
$('.js-begin').click(renderCurrentQuestion)
