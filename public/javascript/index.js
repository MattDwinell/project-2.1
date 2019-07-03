$(document).ready(() => {
    highScores();
    function highScores(){
        $.get("/api/scores", (data)=>{
            $("#tags").empty();
            $("#times").empty();
            for (let i=0; i<data.length ; i++){
                if (i<10){
                let tempUser = $("<p>").text((i+1) + '. ' + data[i].username);
                let tempTime =$("<p>").text(data[i].userTimes);
                if (i===0){
                    tempUser.css("color", "#00e676");
                    tempTime.css("color", "#00e676");
                } else if (i===1){
                    tempUser.css("color", "#69f0ae");
                    tempTime.css("color", "#69f0ae");

                }else if (i===2){
                    tempUser.css("color", "#b9f6ca" );
                    tempTime.css("color", "#b9f6ca");

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
    let obstacle3Height = 10 + Math.ceil(Math.random()*28);
    let obstacle3Bottom = 12 + Math.ceil(Math.random()*20);
    let obstacle3Right =  Math.ceil(Math.random()* 25);
    let obstacle4Bottom = 8 + Math.ceil(Math.random()* 10);
    let obstacle4Height = 5 + Math.ceil(Math.random()* 10);
    let obstacle4Width = 15 + Math.ceil(Math.random()*10);
    let obstacle4Right = 10 + Math.ceil(Math.random()*35);
    let obstacle5Right = 10 + Math.floor(Math.random()*40);
    let obstacle5Bottom = 20 + Math.ceil(Math.random()*10);
    let obstacle5Width = 3 + Math.ceil(Math.random()*5);
    let obstacle5Height = 3 + Math.ceil(Math.random()*6);
    let obstacle6Width = 5;
    let obstacle6Height = 3;
    let obstacle6Top = 3;
    let obstacle6Left = 5 + Math.ceil(Math.random()*50);
    let obstacle7Width = 5;
    let obstacle7Height = 5;
    let obstacle7Bottom = 5;
    let obstacle7Left = 10 + Math.ceil(Math.random()* 50);
    let obstacle8Width = 5;
    let obstacle8Height = 5;
    let obstacle8Bottom = 0;
    let obstacle8left = 30 + Math.ceil(Math.random()* 40);
    // //obstacle 7 stuff
    // .obstacle-7{
    //     border: 2px solid blue;
    //     background-color: #1976d2;
    //     border-radius: 5px;
    //     width: 5%;
    //     height: 5vh;
    //     bottom: 5vh;
    //     left: 5vh;
    
    // }


    let tempLevel = new Level (obstacle1Margin, obstacle1Width, obstacle1Height, obstacle1Top, obstacle2Top, obstacle2Width, obstacle2Height, obstacle2Bottom, obstacle3Width, obstacle3Height, obstacle3Bottom, obstacle3Right, obstacle4Bottom, obstacle4Height, obstacle4Width, obstacle4Right, obstacle5Right, obstacle5Bottom, obstacle5Width, obstacle5Height, obstacle6Width, obstacle6Height, obstacle6Top, obstacle6Left, obstacle7Width, obstacle7Height, obstacle7Bottom, obstacle7Left, obstacle8Width, obstacle8Height, obstacle8Bottom, obstacle8left);

    //map through temp level instead of writing out each attribute after testing is done
    $(".obstacle-wrapper").append(tempLevel.obstacle1, tempLevel.obstacle2, tempLevel.obstacle3, tempLevel.obstacle4, tempLevel.obstacle5, tempLevel.obstacle6, tempLevel.obstacle7, tempLevel.obstacle8);

   // on hover effects  for randomly generated divs
    $(".obstacle").hover(() => {

        //would like to show the div for a second upon hovering, need to look into this more
        $(this).css("border", "red");
        lifeLost();
    })

    //adding animation to obstacles 6 and 7;
    let randomDistance = 50 + Math.ceil(Math.random()* 400);
    let randomHeight = 25 + Math.ceil(Math.random()* 250);
    anime({
        targets: ['.obstacle-6', '.obstacle-7'],
        translateX: randomDistance,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });
      anime({
        targets: '.obstacle-8',
        translateY: -randomHeight,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });


}

//level creator
function Level (ob1m, ob1w, ob1h, ob1t, ob2t, ob2w, ob2h, ob2b, ob3w, ob3h, ob3b, ob3r, ob4b, ob4h, ob4w, ob4r, ob5r, ob5b, ob5w, ob5h, ob6w, ob6h, ob6t, ob6l, ob7w, ob7h, ob7b, ob7l, ob8w, ob8h, ob8b, ob8l) {
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
        bottom: ob2b + 'vh',
        left: Math.ceil(Math.random()*10) + '%'
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
    this.obstacle5 = $("<p>").addClass('obstacle').css({
        right: ob5r + '%',
        bottom: ob5b + 'vh',
        width: ob5w + '%',
        height: ob5h + 'vh'
    });
    this.obstacle6 = $("<p>").addClass('obstacle obstacle-6').css({
        width: ob6w + '%',
        height: ob6h + 'vh',
        top: ob6t + 'vh',
        left: ob6l + '%'
    });
    this. obstacle7 = $("<p>").addClass('obstacle obstacle-7').css({
        width: ob7w + '%',
        height: ob7h + 'vh',
        bottom: ob7b + 'vh',
        left: ob7l + '%'

    });
    this.obstacle8 = $("<p>").addClass('obstacle obstacle-8').css({
        width: ob8w + '%',
        height: ob8h + 'vh',
        left: ob8l + '%',
        bottom: ob8b + 'vh'
    })

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
        levelsCompleted = 0;
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
        console.log(start , gamePause);
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
        levelsCompleted = 0;
        nextLevel();
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

