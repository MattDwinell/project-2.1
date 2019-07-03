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

    //code for next level
function nextLevel(){
    $("#start").css("visibility", "visible").text(" begin level " + (levelsCompleted + 1));
    $(".obstacle-wrapper").empty();
    let obstacle1Margin = 20 + Math.ceil(Math.random() * 30);
    let obstacle1Width =  10 + Math.ceil(Math.random() * 50);
    let obstacle1Height = 2 + Math.ceil(Math.random() * 20);
    let obstacle1Top = Math.ceil(Math.random() * 20);
    let obstacle2Top = 10 + Math.ceil(Math.random()*35);
    let obstacle2Width = 5 + Math.ceil(Math.random() * 50);
    let obstacle2Height = 5 + Math.ceil(Math.random()* 15);
    let obstacle2Bottom = 10 + Math.ceil(Math.random()*20);
    let obstacle3Width = 5+ Math.ceil(Math.random()*10);
    let obstacle3Height = 10 + Math.ceil(Math.random()*30);
    let obstacle3Bottom = 12 + Math.ceil(Math.random()*20);
    let obstacle3Right =  Math.ceil(Math.random()* 25);
    let obstacle4Bottom = 8 + Math.ceil(Math.random()* 10);
    let obstacle4Height = 5 + Math.ceil(Math.random()* 10);
    let obstacle4Width = 15 + Math.ceil(Math.random()*10);
    let obstacle4Right = 10 + Math.ceil(Math.random()*35);
    //obstacle 4 stuff
    // .obstacle-4{
    //     bottom: 10vh;
    //     height: 10vh;
    //     width: 20vh;
    //     right: 35vh;
    //     }


    let tempLevel = new Level (obstacle1Margin, obstacle1Width, obstacle1Height, obstacle1Top, obstacle2Top, obstacle2Width, obstacle2Height, obstacle2Bottom, obstacle3Width, obstacle3Height, obstacle3Bottom, obstacle3Right, obstacle4Bottom, obstacle4Height, obstacle4Width, obstacle4Right);

    //map through temp level instead of writing out each attribute after testing is done
    $(".obstacle-wrapper").append(tempLevel.obstacle1, tempLevel.obstacle2, tempLevel.obstacle3, tempLevel.obstacle4);

}

//level creator
function Level (ob1m, ob1w, ob1h, ob1t, ob2t, ob2w, ob2h, ob2b, ob3w, ob3h, ob3b, ob3r, ob4b, ob4h, ob4w, ob4r) {
    this.obstacle1 =  $("<p>").addClass('obstacle').css({
        marginLeft: ob1m + "%",
        width: ob1w + '%',
        height: ob1h + 'vh',
        top: ob1t + 'vh'
    });
    this.obstacle2 = $("<p>").addClass('obstacle').css({
        marginTop: ob2t + 'vh',
        width: ob2w + '%',
        height: ob2h + 'vh',
        bottom: ob2b + 'vh'
    });
    this.obstacle3 = $("<p>").addClass('obstacle').css({
        width: ob3w + '%',
        height: ob3h + 'vh',
        bottom: ob3b + 'vh',
        right: ob3r + '%'
    });
    this.obstacle4 = $("<p>").addClass('obstacle').css({
        bottom: ob4b + 'vh',
        height: ob4h + 'vh',
        width: ob4w + '%',
        right: ob4r + '%'
    });
    this.obstacle5 = $("<p>").addClass('obstacle');
    this.obstacle6 = $("<p>").addClass('obstacle');
    this. obstacle7 = $("<p>").addClass('obstacle');

}


    let levelsCompleted = 0;
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
        $("#start").css("visibility", "visible").text(" Play again");
        $("#timer").css('visibility', 'hidden');
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
            $("#timer").css('visibility', 'visible');
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
            levelWin();
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
function levelWin(){
    levelsCompleted ++;
    console.log('levels completed:' + levelsCompleted);
    start = false;
    gamePause = true;
    lives = 5;
    if (levelsCompleted >=5){
    userMessage.css("visibility", "hidden");
    gameWin();
    } else {
        nextLevel();
    }
}
    function gameWin() {


        
        if (levelsCompleted >= 5){
        $("#win-box").css("visibility", "visible");
        } else {
            nextLevel();
        }
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

