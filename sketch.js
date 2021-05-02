// Geometry Dash Infinite

var PLAY = 1;
var END = 0;
var gameState = 2;

var player, playerImg;
var ground;

var obstaclesGroup,
  obstacle1Img,
  obstacle2Img,
  obstacle3Img,
  obstacle4Img,
  obstacle5Img,
  obstacle6Img;
var score;

var restartImg, startImg, restart, start;

function preload() {
  playerImg = loadImage("player.png");

  obstacle1Img = loadImage("obstacle1.png");
  obstacle2Img = loadImage("obstacle2.png");
  obstacle3Img = loadImage("obstacle3.png");
  obstacle4Img = loadImage("obstacle4.png");
  obstacle5Img = loadImage("obstacle5.png");
  obstacle6Img = loadImage("obstacle6.png");

  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
  startImg = loadImage("start.png");
}

function setup() {
  createCanvas(800, 400);

  player = createSprite(100, 290, 20, 50);
  player.addImage("player", playerImg);
  player.scale = 5;
  player.setCollider("rectangle", -0.5, -0.5, 7, 7);

  ground = createSprite(400, 350, 800, 100);

  restart = createSprite(400, 200);
  restart.addImage(restartImg);

  start = createSprite(400, 200);
  start.addImage(startImg);

  restart.scale = 0.5;
  start.scale = 2;

  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();

  score = 0;
}

function draw() {
  background(180);
  //displaying score
  text("Score: " + score, 500, 50);

  if (gameState === 2) {
    restart.visible = false;
    start.visible = true;

    if (mousePressedOver(start)) {
      gameState = PLAY;
    }
  }

  if (gameState === PLAY) {
    restart.visible = false;
    start.visible = false;
    //move the ground
    //ground.velocityX = -(4 + 2 * (score / 100));
    //scoring
    score = score + Math.round(getFrameRate() / 60);

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    //jump when the space key is pressed
    if (keyDown("space") && player.y >= 275) {
      player.velocityY = -12;
    }

    //add gravity
    player.velocityY = player.velocityY + 0.8;

    //spawn obstacles on the ground
    spawnObstacles();

    if (obstaclesGroup.isTouching(player)) {
      gameState = END;
    }
  } else if (gameState === END) {
    console.log("hey");
    restart.visible = true;

    ground.velocityX = 0;
    player.velocityY = 0;

    //change the player animation

    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);

    obstaclesGroup.setVelocityXEach(0);

    if (mousePressedOver(restart)) {
      reset();
    }
  }

  //stop player from falling down
  player.collide(ground);

  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(1000, 286, 10, 40);
    obstacle.velocityX = -10;

    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1Img);
        break;
      case 2:
        obstacle.addImage(obstacle2Img);
        break;
      case 3:
        obstacle.addImage(obstacle3Img);
        break;
      case 4:
        obstacle.addImage(obstacle4Img);
        break;
      case 5:
        obstacle.addImage(obstacle5Img);
        break;
      case 6:
        obstacle.addImage(obstacle6Img);
        break;
      default:
        break;
    }

    //assign scale and lifetime to the obstacle
    obstacle.scale = 5;
    obstacle.setCollider("rectangle", -0.5, -0.5, 7, 7);

    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset() {
  obstaclesGroup.destroyEach();
  gameState = PLAY;
  score = 0;
  restart.visible = false;
}
