//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject_1, fallingObject_2;
let playButton, directionsButton, backButton;
let screen = 0;
let score = 0;
let rand = 0;
let level = 1;
var genshinFont, genshinMusic;

/* PRELOAD LOADS FILES */
function preload(){
  genshinFont = loadFont('assets/Genshin_Font.ttf');
  backgroundImg = loadImage("assets/paimon_3.png");
  genshinMusic = loadSound("assets/Genshin_Music.mp3");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
  textFont(genshinFont);
  genshinMusic.loop();
  homeScreen();
}

/* DRAW LOOP REPEATS */
function draw() {
  
  if (screen == 0) {
    if (directionsButton.mouse.presses()) {
      //screen 1 is directions screen
      screen = 1;
      directionsScreen();
    } else if (playButton.mouse.presses()) {
      //screen 2 is play screen 
      screen = 2;
      playScreenAssets();
    }
  } 

  if (screen == 1) {
    if (backButton.mouse.presses()) {
      //screen 0 is home screen
      screen = 0;
      homeScreen();
      backButton.pos = { x: -300, y: -300 };
    }
  }

  if (screen == 2) {
    background("#cae3f2");

    // Draw directions to screen
    if (level == 1) {
      fill("#2b71ca");
      textSize(15);
      text("Help Paimon eat the slimes! \nCatch 7 slimes to level up!", width-231, 27);
    } else if (level == 2) {
      fill("#2b71ca");
      textSize(15);
      text("Help Paimon eat the slimes! \nCatch 14 slimes to level up!", width-231, 27);
    } else if (level == 3) {
      fill("#2b71ca");
      textSize(15);
      text("Help Paimon eat the slimes! \nCatch 28 slimes to win!", width-231, 27);
    }
    
    //If fallingObject reaches bottom, move back to random position at top
    if (fallingObject_1.y >= height+40) {
      fallingObject_1.y = -50;
      fallingObject_1.x = random(width);
      fallingObject_1.vel.y = random(1,5);
      score--;
      changeSlimes(fallingObject_1);
    }
    if (fallingObject_2.y >= height+40) {
      fallingObject_2.y = -50;
      fallingObject_2.x = random(width);
      fallingObject_2.vel.y = random(1,5);
      score--;
      changeSlimes(fallingObject_2);
    }
  
    //Move catcher
    if (kb.pressing("left")) {
      catcher.img = 'assets/paimon_2.png';
      catcher.vel.x = -3;
    } else if (kb.pressing("right")) {
      catcher.img = 'assets/paimon_1.png';
      catcher.vel.x = 3;
    } else {
      catcher.vel.x = 0;
    }
  
    //Stop catcher at edges of screen
    if (catcher.x < 40) {
      catcher.x = 40;
    } else if (catcher.x > 360) {
      catcher.x = 360;
    }
  
    //If fallingObject collides with catcher, move back to random position at top
    if (fallingObject_1.collides(catcher)) {
      fallingObject_1.y = -50;
      fallingObject_1.x = random(width);
      fallingObject_1.vel.y = random(1,5);
      fallingObject_1.direction = "down";
      score++;
      changeSlimes(fallingObject_1);
    }
    if (fallingObject_2.collides(catcher)) {
      fallingObject_2.y = -50;
      fallingObject_2.x = random(width);
      fallingObject_2.vel.y = random(1,5);
      fallingObject_2.direction = "down";
      score++;
      changeSlimes(fallingObject_2);
    }
    if (fallingObject_1.collides(fallingObject_2)) {
      fallingObject_1.direction = "down";
      fallingObject_2.direction = "down";
    }  
  
    //Draw the score to screen
    fill("#2b71ca");
    textSize(20);
    text("Score: " + score, 15, 30);

    //Draw the score to screen
    fill("#2b71ca");
    textSize(20);
    text("Level: " + level, 15, 60);
  
    //Level up
    if (level == 1 && score >= 7) {
      level = 2;
      score = 0;
    }
    if (level == 2 && score >= 14) {
      level = 3;
      score = 0;
    }
    
    //Lose state
    if (level == 1 && score < 0) {
      youLose();
    }
    if (level == 2 && score < 0) {
      level = 1;
      score = 6;
    }
    if (level == 3 && score < 0) {
      level = 2;
      score = 13;
    }
  
    //Win state
    if (level == 3 && score >= 28) {
      youWin();
    }

    //allSprites.debug = mouse.pressing();
  }
}

function youLose() {
  background("#cae3f2");
    
  //Draw sprites off of screen
  fallingObject_1.pos = { x: -100, y: -100 };
  fallingObject_2.pos = { x: -150, y: -150 };
  catcher.pos = { x: -200, y: -200 };

  //Draw end of game text
  textSize(20);
  fill("#2b71ca");
  text("Paimon starved...", width/2 - 93, height/2 - 30);
  textSize(15);
  text("Click the mouse anywhere to play again.", width/2 - 157, height/2);

  restart();
}

function youWin() {
  background("#cae3f2");
    
  //Draw sprites off of screen
  fallingObject_1.pos = { x: -100, y: -100 };
  fallingObject_2.pos = { x: -150, y: -150 };
  catcher.pos = { x: -200, y: -200 };

  //Draw end of game text
  textSize(20);
  fill("#2b71ca");
  text("Paimon is full!", width/2 - 80, height/2 - 30); 
  textSize(15);
  text("Click the mouse anywhere to play again.", width/2 - 157, height/2);

  restart();
}

function restart() {
  if (mouseIsPressed) {
    score = 0;
    level = 1;
    fallingObject_1.pos = { x: random(width), y: -50 };
    fallingObject_2.pos = { x: random(width), y: -50 };
    catcher.pos = { x: 200, y: 320 };
    fallingObject_1.vel.y = random(1,5);
    fallingObject_1.direction = "down";
    fallingObject_2.vel.y = random(1,5);
    fallingObject_2.direction = "down";
  }
}

function changeSlimes(fallingObject) {
  rand = Math.floor(Math.random() * 8)
  print(rand);
  if (rand == 0) {
    fallingObject.img = 'assets/anemo.png';
    fallingObject.scale = 0.2;
  } else if (rand == 1) {
    fallingObject.img = 'assets/cryo.png';
    fallingObject.scale = 0.2;
  } else if (rand == 2) {
    fallingObject.img = 'assets/dendro.png';
    fallingObject.scale = 0.2;
  } else if (rand == 3) {
    fallingObject.img = 'assets/electro_1.png';
    fallingObject.scale = 0.2;
  } else if (rand == 4) {
    fallingObject.img = 'assets/electro_2.png';
    fallingObject.scale = 0.2;
  } else if (rand == 5) {
    fallingObject.img = 'assets/geo.png';
    fallingObject.scale = 0.2;
  } else if (rand == 6) {
    fallingObject.img = 'assets/hydro.png';
    fallingObject.scale = 0.2;
  } else if (rand == 7) {
    fallingObject.img = 'assets/pyro.png';
    fallingObject.scale = 0.2;
  }
}

function homeScreen() {
  background("#cae3f2");
  
  //Create title
  fill("#2b71ca");
  textSize(35);
  text("Slime Catcher", 70, 120);
  
  //Create play button
  playButton = new Sprite(300,250,100,70,"k");
  playButton.color = "#408ede";
  playButton.textColor = "#e9f5fa";
  playButton.textSize = 20;
  playButton.text = "Play";
  noStroke();

  //Create directions button
  directionsButton = new Sprite(125,250,160,70,"k");
  directionsButton.color = "#408ede";
  directionsButton.textColor = "#e9f5fa";
  directionsButton.textSize = 20;
  directionsButton.text = "Directions";
  noStroke();
}

function directionsScreen() {
  background("#cae3f2");
  playButton.pos = { x: -200, y: -100 };
  directionsButton.pos = { x: -500, y: -100 };

  //Draw background image
  image(backgroundImg, 140, 132, 120, 120);
  
  // Draw directions to screen
  fill("#2b71ca");
  textSize(20);
  text("   Move Paimon with the left \n and right arrow keys to catch \nslimes to fill Paimon's stomach!", 30, 52);
  
  //Create back button
  backButton = new Sprite(200,313,185,70,"k");
  backButton.color = "#408ede";
  backButton.textColor = "#e9f5fa";
  backButton.textSize = 20;
  backButton.text = "Back to Home";
  noStroke();
}

function playScreenAssets() {
  background("#cae3f2");
  playButton.pos = { x: -200, y: -100 };
  directionsButton.pos = { x: -500, y: -100 };
  
  //Create catcher
  catcher = new Sprite(200,320,170,100,"k");
  catcher.color = color(95,158,160);
  catcher.img = 'assets/paimon_1.png';
  catcher.scale = 0.25;
    
  //Create falling object
  fallingObject_1 = new Sprite(100,0,200,200);
  fallingObject_1.color = color(0,128,128);
  fallingObject_1.x = random(width);
  fallingObject_1.vel.y = random(1,5);
  fallingObject_1.rotationLock = true;
  changeSlimes(fallingObject_1);

  fallingObject_2 = new Sprite(100,0,200,200);
  fallingObject_2.color = color(0,128,128);
  fallingObject_2.x = random(width);
  fallingObject_2.vel.y = random(1,5);
  fallingObject_2.rotationLock = true;
  changeSlimes(fallingObject_2);
}