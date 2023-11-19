const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life"),
    }, 
    values:{ 
        gameVelocity: 1000,
        hitPosition: 0,
        
        resultStart: 0,
        result: 0,

        currentTime: 60,
        time: 60,

        remaininglife: 10,
        life: 10,
    },
    actions:{
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function reset(){
    state.values.currentTime = state.values.time;
    state.view.timeleft.textContent = state.values.currentTime;
    state.values.resultStart = state.values.result;
    state.view.score.textContent = state.values.resultStart;
    state.values.remaininglife = state.values.life;
    state.view.life.textContent = state.values.remaininglife;
}

function countDown(){
    state.values.currentTime --;
    state.view.timeleft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        alert("O tempo acabou, voce fez: " + state.values.resultStart);
        reset()
    }
}
function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.resultStart++
                state.view.score.textContent = state.values.resultStart;
                state.values.hitPosition = null;
            }else{
                state.values.remaininglife --;
                state.view.life.textContent = state.values.remaininglife;
                if(state.values.remaininglife <= 0){
                    state.values.remaininglife = 10;
                    state.view.life.textContent = state.values.remaininglife;
                    alert("Voce perdeu!");
                }
            }
        })
    });
}

function init(){
    addListenerHitBox();
}

init();
