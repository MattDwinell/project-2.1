$(document).ready(() => {
    highScores();
    function highScores(){
        $.get("/api/scores", (data)=>{
            $("#tags").empty();
            $("#times").empty();
            for (let i=0; i<data.length; i++){
                let tempUser = $("<p>").text(data[i].username);
                let tempTime =$("<p>").text(data[i].userTimes);
                $("#tags").prepend(tempUser);
                $("#times").prepend(tempTime);

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
        console.log(highScore);
        $("#win-box").css("visibility", "hidden");
        $.post('/api/scores', highScore, (data, status)=>{
            console.log(status);
            console.log('data from post: ');
            console.log(data);
            window.location.href= window.location.href;
    
        }).then((data)=>{
            console.log(',then achieved');
            window.location.href= window.location.href;

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
        $("#timer").text(time.toFixed(2));
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
        $("#start").css("visibility", "visible").text(" click me to return to play");
        }
    })


    function lifeLost() {
        if (start && !gamePause) {
            clearInterval(timer);
            console.log(time);
            lives--;
            if(lives<=0){
                gameLoss();
            }
            if (lives <= 0) {
                gameLoss();
            } else {
                userMessage.text('you have hit a thing.');
                $("#start").css("visibility", "visible").text(" Click me to try again");
                gamePause = true;
            }
        }
    }

    function gameWin() {
        userMessage.css("visibility", "hidden");
        start = false;
        gamePause = true;
        lives = 5;
        $("#start").css("visibility", "visible").text(" Click me to play again");
        $("#win-box").css("visibility", "visible");
    }
    function gameLoss() {
        userMessage.text('you lose');
        $("#start").css("visibility", "visible").text(" Click me to play again");
        start = false;
        gamePause = true;
        lives = 5;
    }
    anime({
        targets: '.obstacle-6',
        translateX: 650,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });
      



})

