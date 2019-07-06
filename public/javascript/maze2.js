$(document).ready(function () {
    let times;
    let lives = 3;
    let time = 0;
    let saiyanGone = false;
    $("#gameOver").hide();
   // $("#win").hide();
    $(".movingObjects").hide();
    $(".power").hide();
    $("#ERwinner").hide();
    $("#start").on("click", function (event) {

        $("#ERtimer").show();
        event.preventDefault();
        console.log("start the game");
        $(this).hide();
        startGame();
        times = setInterval(myTimer, 100);
        $("#ERtimer").css("visibility", "visible");
    });

    startGame = () => {

        $(".movingObjects").show();
        $(".movingObjects").hover(() => {
            gameLives();
        }, () => {
            console.log("you touched a box");
        });
        $(".mazeLine").hover(() => {
            gameLives();
        }, () => {
            console.log("you touched mazeline")
        });

        $("#finish").on("mouseenter", () => {
            youWin();
            stopTime();
        });

        $("#mainGame").on("mouseleave", () => {
            leftGame();
        });
        $(".power").hover(() => {
            $("#ERuser-message").text("WHAT A KAMEHAMEHA WAVE!!!");
        },
            () => {
                gameLives();
            });
        $(".trap").hover(() => {
         if(!saiyanGone) { 
              $(".power").show();
            anime({
                targets: "#wave",
                width: '100%',
                easing: 'easeOutQuad',
                direction: 'alternate',
                duration: 2000,
                scale: {
                    value: 10,
                    duration: 2000,
                    delay: 600,
                    easeing: 'easeInQuad',
                    
                }
            });
        }
        });
        
        
    };

    //amount of lives you get in the game

    gameLives = () => {
        trap();
        lives--;
        $("#ERuser-message").text("Lives Left: " + lives);
        if (lives <= 0) {
            $("#ERuser-message").text("Not Today! Try agian! ");
            gameOver();
        };
    };

    //the displays game-over div
    gameOver = () => {
        console.log("gameover");
        stopTime();
        $("#ERtimer").show();
        $("#gameOver").show();
        $("#mainGame").remove();
        $(".highscores").hide();
        $("#try-again").on("click", () => {
            location.reload();
        });
        lives = 2;
    };

    //the winning logic shows the div with win content and hides the main game
    youWin = () => {
        console.log("you win");
        $("#ERwinner").show();
        $("#mainGame").remove();
    };

    //if you leave the game you have too press the continue button to keep playing
    leftGame = () => {
        if (lives === 0) {
        };
        location.reload();
    };

    //timer for amount it takes user to finish maze
    function myTimer() {
        time += .1;
        $("#ERtimer").text('Time: ' + time.toFixed(2));
        console.log(time);
    };

    function stopTime() {
        clearInterval(times)
    };
    trap = () => {
        $("#saiyan").hide();
        $("#wave").hide();
    }
    ///////////////////////////////////////////////////////////////////////////
    // anime.js to run animations
    anime({
        targets: '#erbox1',
        translateX: -650,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        duration: 1000
    })
    // .add({ targets: '#erbox1', background: ['#1439ff','#00FF00', '#7F00FF']}, 0 );
    anime({
        targets: '#erbox2',
        keyframes: [
            { translateY: -290 },
            { translateX: -120 },
            { translateY: 0 },
            { translateX: 0 }, 
        ],
        loop: true,
        easing: 'easeInOutSine',
        duration: 2000
    });
    anime({
        targets: '#erbox3',
        translateX: 400,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        duration: 1000
    });
    anime({
        targets: '#erbox4',
        keyframes: [
            
            { translateX: 600 },
            { translateY: 100 },
            { translateX: 0 },
            { translateY: 0 }
        ],
        loop: true,
        
        easing: 'easeInOutQuad',
        duration: 4000
    });
    anime({
        targets: '#erbox5',
        keyframes: [
            { translateY: -60 },
            { translateX: 80 },
            { translateX: 0 },
            { translateY: 0 }
        ],
        loop: true,

        easing: 'easeInOutSine',
        duration: 2000
    });
    anime({
        targets: '#trap1',
        translateX: -120,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        duration: 700

    });
    anime({
        targets: '#trap2',
        translateX: 120,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        duration: 700

    });
    anime.timeline({
        targets: '.mazeLine',
        loop: true,
        duration: 3000,
        easing: 'easeInOutBack',
    })
        .add({ background: ['#000000', '#00FF00'] })
});