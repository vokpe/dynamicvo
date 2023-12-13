//import p5 from 'p5';
//import '../src/p5.sound.js'

const breakoutSketch = (highScore, setHighScore) => (s) => {
    // Place your existing variables and functions here, for example:
    let gameState;

    // assign artwork
    let artworkBackground;
    let artworkForeground;
    let treasure;

    let backgroundSpeed = 1.0;
    let foregroundSpeed = 2.5;

    let bgy1 = 0;
    let bgy2 = -1000;
    let fgy1 = 0;
    let fgy2 = -1000;

    let paddleX;
    let paddleWidth = 200;
    let paddleY;

    let originalBallX;
    let originalBallY;
    let originaltreasure1X; 
    let originaltreasure1Y;
    let originaltreasure2X; 
    let originaltreasure2Y;



    let ballX;
    let ballY;

    let bspeedX;
    let bspeedY;

    let t1speedX;
    let t1speedY;
    let t2speedX;
    let t2speedY;

    let hueValue;
    let colorChangeSpeed;
    let r;
    let g;
    let b;

    let treasure1X;  // right side
    let treasure1Y;

    let treasure2X;  // left side
    let treasure2Y;

    // sounds
    // let lose;
    // let collect;
    // let bounce;


    let score;

    s.preload = () => {
        // Your preload code
        artworkBackground = s.loadImage('background.png');
        artworkForeground = s.loadImage('foreground.png');

        treasure = s.loadImage('salsaypicante.png');

        // lose = s.loadSound("i-am-sorry-every-follow-me-[AudioTrimmer.com].mp3");
        // collect = s.loadSound("melee-menu-select.mp3");
        // bounce = s.loadSound("ssbhomerun.mp3");
    };

    s.setup = () => {
        var c = s.createCanvas(500,1000);
        c.parent("gameCanvasContainer");
        s.background(0);

        score = 0;

        paddleX = s.width/2 - 100;
        paddleY = 990;

        originalBallX = s.width/2;
        originalBallY = 50;

        originaltreasure1X = 510;
        originaltreasure1Y = s.random(200,800);
        originaltreasure2X = -50;
        originaltreasure2Y = s.random(200,800);

        ballX = originalBallX;
        ballY = originalBallY;

        treasure1X = originaltreasure1X;
        treasure1Y = originaltreasure1Y;

        treasure2X = originaltreasure2X;
        treasure2Y = originaltreasure2Y;
        
        gameState = "start";

        bspeedX = s.random(-8,8);
        bspeedY = s.random(3,6);

        do {
            t1speedX = s.random(-6, -3);
            t1speedY = s.random(-2, 2);
        } while (Math.abs(t1speedX) < 1 && Math.abs(t1speedY) < 1);

        do {
            t2speedX = s.random(3, 6);
            t2speedY = s.random(-2, 2);
        } while (Math.abs(t2speedX) < 1 && Math.abs(t2speedY) < 1);

        r = s.random(255);
        g = s.random(255);
        b = s.random(255);
        hueValue = 0;
        colorChangeSpeed = 0.7;
    };

    s.draw = () => {
        s.frameRate(120);

        var paddleTop = paddleY;
        var paddleBottom = paddleY + 10;


        // draw background at its two x positions (right next to one another)
        s.image(artworkBackground, 0, bgy1, s.width, s.height);
        s.image(artworkBackground, 0, bgy2, s.width, s.height);

        // move both of these copies based on the layer speed
        bgy1 += backgroundSpeed;
        bgy2 += backgroundSpeed;

        // if the first copy goes fully off the screen to the left
        if (bgy1 >= s.height) {
            // teleport it so that it now appears on the right side of the other copy
            bgy1 = bgy2 - s.height;
        }

        // if the second copy goes fully off the screen to the left
        if (bgy2 >= s.height) {
            // teleport it so that it now appears on the right side of the other copy
            bgy2 = bgy1 - s.height;
        }

        // draw foreground at its two x positions (right next to one another)
        s.image(artworkForeground, 0, fgy1, s.width, s.height);
        s.image(artworkForeground, 0, fgy2, s.width, s.height);

        //image(treasure, treasure1X, treasure1Y, 20, 20);

        // move both of these copies based on the layer speed
        fgy1 += foregroundSpeed;
        fgy2 += foregroundSpeed;

        // if the first copy goes fully off the screen to the left
        if (fgy1 >= s.height) {
            // teleport it so that it now appears on the right side of the other copy
            fgy1 = fgy2 - s.height;
        }

        // if the second copy goes fully off the screen to the left
        if (fgy2 >= s.height) {
            // teleport it so that it now appears on the right side of the other copy
            fgy2 = fgy1 - s.height;
        }

        // Draw left border
        s.noStroke();
        s.fill(0,255,0);
        //s.rect(0, 0, 10, s.height);

        // Draw right border
        //s.rect(s.width - 10, 0, 10, s.height);

        
        // Draw top border
        //s.rect(0, 0, s.width, 10);

        if (gameState === "playing"){

            ballX += bspeedX;
            ballY += bspeedY;

            treasure1X += t1speedX;
            treasure1Y += t1speedY;

            treasure2X += t2speedX;
            treasure2Y += t2speedY;

    
        }

        // CREATE MOVING PADDLE
        s.rect(paddleX,paddleY,paddleWidth,10);

        // CREATE MOVING BALL

        hueValue = (hueValue + colorChangeSpeed);
        r = hueValue;
        g = bspeedX;

        s.fill(r,g,b);
        s.ellipse(ballX, ballY, 50,50);


    
        
        if (s.keyIsDown(65) || s.keyIsDown(s.LEFT_ARROW)) {
            paddleX -= 17;
        }

        if (s.keyIsDown(68) || s.keyIsDown(s.RIGHT_ARROW)) {
            paddleX += 17;
        } 
        
        // Boundary checks for the paddle
        if (paddleX < 0) {
            paddleX = 0; // Prevent paddle from going off the left edge
        }
        if ((paddleX + paddleWidth) > 500) {
            paddleX = 300;
        }

        // Boundary checks for ball
        if (ballX > s.width-38 || ballX < 38) {
            //bounce.play();
            bspeedX *= -1;
        }

        if(ballY < 38){
            //bounce.play();
            bspeedY *= -1
        }

        if(ballY > 1100){
            //lose.play();
            updateHighScore();
            resetBallPosition();
            gameState = "start";
        }

        // Draw treasure

        s.image(treasure, treasure1X, treasure1Y, 70, 70);
        s.image(treasure, treasure2X, treasure2Y, 70, 70);

        // Boundary checks for treasure
        if(treasure1X < -200){
            treasure1X = originaltreasure1X;
            treasure1Y = s.random(100,900);

            do {
                t1speedX = s.random(-6, -3);
                t1speedY = s.random(-2, 2);
            } while (Math.abs(t1speedX) < 1 && Math.abs(t1speedY) < 1);
        }

        if(treasure2X > s.width+200) {
            treasure2X = originaltreasure2X;
            treasure2Y = s.random(100,900);
        }



        // Treasure collision detection
        let distanceToTreasure1 = s.dist(ballX, ballY, treasure1X + 35, treasure1Y + 35); 
        let ballRadius = 25; // Ball's radius
        let treasureRadius = 35; // Treasure's radius

        if (distanceToTreasure1 < ballRadius + treasureRadius) {
            // Collision with treasure 1
            // Reset the treasure's position and speed
            //collect.play();
            treasure1X = originaltreasure1X;
            treasure1Y = s.random(200, 800);

            do {
                t1speedX = s.random(-6, -3);
                t1speedY = s.random(-2, 2);
            } while (Math.abs(t1speedX) < 1 && Math.abs(t1speedY) < 1);
            score++;
        }
        
        // Treasure collision detection
        let distanceToTreasure2 = s.dist(ballX, ballY, treasure2X + 35, treasure2Y + 35); 

        if (distanceToTreasure2 < ballRadius + treasureRadius) {
            // Collision with treasure 2
            // Reset the treasure's position
            //collect.play();
            treasure2X = originaltreasure2X;
            treasure2Y = s.random(200, 800);

            score++;
        }


        let rightMap = s.map(ballX, paddleX, (paddleX + paddleWidth)/2, 2, 0.25);
        let leftMap = s.map(ballX, (paddleX + paddleWidth)/2, paddleX + paddleWidth, 0.25, 2);

        //let mappedBallX = map(ballX, paddleX, (paddleX + paddleWidth)/2, 2, 0.25);

        if ( (ballX >= paddleX) && (ballX <= paddleX + paddleWidth) && (ballY + 25 >= paddleTop) && (ballY - 25 < paddleBottom) ) {
            // Collision with paddle from the top
            if (ballY >= paddleTop - 25) {
                ballY = paddleTop - 25;
            }

            if (ballX <= (paddleX + paddleWidth)/2) {
                bspeedX *= rightMap;
                //bounce.play();
                bspeedY *= -1.1;
                
            }

        else if (ballX >= (paddleX + paddleWidth)/2) {
                bspeedX *= leftMap;
                //bounce.play();
                bspeedY *= -1.1;

            }
        
        }
        s.constrain(bspeedX, -1,1);
        s.constrain(bspeedY, -1,1);

        let shighScore = window.localStorage.getItem('highScore');

        
        s.textSize(24);
        s.fill(255);
        s.text("Points: " + score, 25, 45);
        s.text("High Score: " + shighScore, 325, 45);
    };

    s.mousePressed = () => {
        if (gameState === "start") {
            gameState = "playing";
        }

    }

    function resetBallPosition() { 
        s.setup(); 
    }

    function updateHighScore() {
        let localHighScore = parseFloat(window.localStorage.getItem('highScore'));
    
        if (!localHighScore || score > localHighScore) {
            window.localStorage.setItem('highScore', score);
        }
    }
};

export default breakoutSketch;
