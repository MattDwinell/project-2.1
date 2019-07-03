$(document).ready(() => {
    highScores();
    function highScores(){
        $.get("/api/scores", (data)=>{
            $("#tags").empty();
            $("#times").empty();
            for (let i=0; i<data.length ; i++){
                if (i<10){
                let tempUser = $("<p>").text(data[i].username);
                let tempTime =$("<p>").text(data[i].userTimes);
                if (i<3){
                    tempUser.css("color", "#00e676");
                    tempTime.css("color", "#00e676");
                }
                $("#tags").append(tempUser);
                $("#times").append(tempTime);
            }
            }
    })
    }
    let time = 0;
    let userMessage = $("#user-message");
    let timerOn = false;

    $("#start").on("click", function(event){
        event.preventDefault();
        if (gamePause) {
            runGame();
        }

    })
    let start = false;
    let gamePause = true;
    let lives = 5;

    //user entering tag on game win
    $("#submit").on("click", (event)=>{
        event.preventDefault();
        let userTag = $("#user-tag").val();
        let userTime = time.toFixed(2);
        
        let highScore = {
            userName: userTag,
            time: userTime
        }
        time = 0;
        $("#timer").text('');
        console.log(highScore);
        setTimeout(highScores, 1000);
        $("#win-box").css("visibility", "hidden");
        $.post('/api/scores', highScore, function(data){
        }).then((res)=>{
            console.log('hi' + res);
        })
    
        
    })

    // $("#start").on("click", runGame)
    // $("#small-box").on("click", (event) => {
    //     event.preventDefault();
    //     if (gamePause) {
    //         runGame();
    //     }
    // })
    function runGame() {
       if(!timerOn){
            setInterval(timer, 100);
            timerOn = true;
       }
        userMessage.text('dis working').css("visibility", "visible");
        $("#start").css("visibility", "hidden");
        gameStart();
    }
    function timer(){
        if(!gamePause && start){
        time += .1;
        $("#timer").text('time: ' + time.toFixed(2));
        }
    }

    function gameStart() {
        start = true;
        gamePause = false;
        userMessage.text('lives remaining ' + lives);
    }

    //on hover and mouse leave events
    $(".obstacle").hover(() => {
        lifeLost();
    })
    $("#goal").hover(() => {
        if (start && !gamePause) {
            gameWin();
        }
    })
    $("#small-box").mouseleave(() => {
        if(start && !gamePause){
        userMessage.text('left the thing!');
        lives --;
        gamePause = true;
        $("#start").css("visibility", "visible").text("Keep Trying");
        }
    })


    function lifeLost() {
        if (start && !gamePause) {
            clearInterval(timer);
            console.log(time);
            lives--;
            if (lives <= 0) {
                gameLoss();
            } else {
                userMessage.text('you have hit a thing. ' + lives + " lives remaining.");
                $("#start").css("visibility", "visible").text(" Keep Trying");
                gamePause = true;
            }
        }
    }

    function gameWin() {
        userMessage.css("visibility", "hidden");
        start = false;
        gamePause = true;
        lives = 5;
        $("#start").css("visibility", "visible").text(" Play again");
        $("#win-box").css("visibility", "visible");
    }
    function gameLoss() {
        userMessage.text('you lose');
        $("#start").css("visibility", "visible").text(" Play again");
        start = false;
        gamePause = true;
        time = 0;
        lives = 5;
    }

    //animations for moving divs
    anime({
        targets: ['.obstacle-6', '.obstacle-7'],
        translateX: 650,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });
      



})

