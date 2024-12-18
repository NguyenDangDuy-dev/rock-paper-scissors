//score object and get local Storage
const score = JSON.parse(localStorage.getItem('scored')) || {
    Wins: 0,
    Losses: 0,
    Tie: 0
};

/////////////////Listener
// Play Game receive event
const setEvent = document.querySelectorAll('.btn--styled');
//Set event Listener for all class button
for(let i = 0; i < setEvent.length; i++){
    setEvent[i].addEventListener('click', function(){
        const userChoice = setEvent[i].textContent;
        playGame(userChoice);
    });
}

//// Set Emoiji for button
/// Why? 
// Cause i realize a problem aboute active pseudow class in css.
// And make sure people click and no keep the left mouse
// Enable feature
const setEffectButtons = document.querySelectorAll('.btn--styled');
setEffectButtons.forEach(function(buttonEffect){
    buttonEffect.addEventListener('click', function(){
        buttonEffect.classList.add('clicked'); // clicked gonna create here.

        setTimeout(() => {
            buttonEffect.classList.remove('clicked'); // then remove 
        }, 300);
    });
});

//Light and Dark Mode - feature
const modeSwicher = document.querySelector('.select__button');
const modeSave = localStorage.getItem('modeChoice');    
console.log(modeSave);

//Read Local Storage and return function 
modeSelected('data-theme', modeSave);

modeSwicher.addEventListener('change', function(){
    if(modeSwicher.value != 'system'){
        document.documentElement.setAttribute('data-theme', modeSwicher.value);   
    }else{
        document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('modeChoice', modeSwicher.value);
});
//Read Local Storage and return select value 
function modeSelected(dataAttribute, value){
    document.documentElement.setAttribute(dataAttribute, value);
    modeSwicher.value = value;
}

//Reset Scrore receive event
document.querySelector('.btn__remove--styled').addEventListener('click', function(){
    const displayChange = document.querySelector('.btn__remove--styled');
    displayChange.innerHTML = 'Reset!';

    //Changed the text
    setTimeout(function() {
        displayChange.innerHTML = 'Reset Score';
    }, 800);
    
    removeScore();  // Reset Score
    removeCache('scored'); // Reset Cache and print
});



//Display Get Item
function theResultBetween(userChoice, computerChoice, isWinLose){
    let winLoseTie = document.querySelector('.win-lose');
    let resultJS = document.querySelector('.result');
    winLoseTie.innerHTML = ` <p> You ${isWinLose} </p>`;
    resultJS.innerHTML = `You picked ${userChoice}  Computer picked ${computerChoice}`;
    theResultOfScore();
};

//Set Display Result use function
function theResultOfScore(){
    document.querySelector('.scoree').innerHTML = `<p> Wins: ${score.Wins}  Losses: ${score.Losses}  Tie: ${score.Tie} </p>`;
}

//Set local Storage use function
function setLocalStorage(){     
    localStorage.setItem('scored', JSON.stringify(score));
}

//Main Play Game
function playGame(userChoice){
    const randomSc  = Math.ceil(Math.random() * 3); ///Random
    let computerChoice = '';

    if(randomSc === 1){
        computerChoice += '✊';
    }else if(randomSc === 2){
        computerChoice += '🤚';
    }else{
        computerChoice += '✌️';
    }
//////The Logic
    if(userChoice === computerChoice){
       score.Tie++;
       setLocalStorage();
        theResultBetween(userChoice, computerChoice, 'Tie🪨');
    }else if((userChoice === '✊' && computerChoice === '✌️') || (userChoice === '🤚' && computerChoice === '✊') || (userChoice === '✌️' && computerChoice === '🤚')){
        score.Wins++;
        setLocalStorage();
         theResultBetween(userChoice, computerChoice, 'Win✅');
    }else{
        score.Losses++;
        setLocalStorage();
          theResultBetween(userChoice, computerChoice, 'Lose❌');
    }
};

/////////Score Fixed On Screen
theResultOfScore();



//Reset Cache
function removeCache(item){
    localStorage.removeItem(item);
    theResultOfScore();
}
//Reset Score imatediately
function removeScore(){
    score.Wins = 0;
    score.Losses = 0;
    score.Tie = 0;
}

