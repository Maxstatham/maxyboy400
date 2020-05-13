//MAX STATHAM
//YETIJUMP
//IML 

//Game requires external p5.play library

// SPRITE IMAGES
let font;
let spr_player;
let spr_background = [];
let spr_platform;
let spr_poacher;
let spr_hunter;
let spr_hunter2;
let spr_gameover;
let spr_gameover2;
let spr_gameover3;
let spr_logo;
let spr_yetiInt;
let spr_huntInt;
let spr_bullet;

//INTRO OBJECTS
let yetiInt;
let huntInt;

// OBJECTS
let yeti;
let p = [];
let pr = [];
let poach;
let hunt;
let hunt2;

//OBJECT GROUPS;
let platforms;
let bullets;

// GLOBALS
let free = 100;
let points;
let gSpeed = 2;
let bSpeed = 2;
let y = 570;
let ySpeed = 0.5;
let huntSpeed = 1;

//STATES
let state = 0;
let INTRO = 0;
let PLAYING = 1;
let GAMEOVER = 2;
let GAMEOVER2 = 3;
let GAMEOVER3 = 4;

//
let platIndex = 0;

function preload() {

  // SPRITES
  font = loadFont('sprites/font.ttf');
  spr_player = loadImage('sprites/player.png');

  spr_background = [
    loadImage('sprites/yjbg1.png'),
    loadImage('sprites/yjbg2.png')
  ];

  spr_yetiInt = loadImage('sprites/player1.png');
  spr_huntInt = loadImage('sprites/introhunter.png');

  spr_platform = loadImage('sprites/platform.png');
  spr_poacher = loadImage('sprites/poacher4.png');
  spr_hunter = loadImage('sprites/hunter.png');
  spr_hunter2 = loadImage('sprites/hunter2.png');
  spr_gameover = loadImage('sprites/gameover.png');
  spr_gameover2 = loadImage('sprites/gameover2.png');
  spr_gameover3 = loadImage('sprites/gameover3.png');
  spr_logo = loadImage('sprites/yjlogo.png');
  spr_bullet = loadImage('sprites/bullet.png');
}

function setup() {
  createCanvas(360, 640);
  yetiInt = createSprite(-20, 96, 40, 40);
  yetiInt.addImage(spr_yetiInt);
  huntInt = createSprite(-140, 96, 40, 40);
  huntInt.addImage(spr_huntInt);


  yetiInt.velocity.x = yetiInt.velocity.x + 1.5;
  huntInt.velocity.x = huntInt.velocity.x + 1.5;
}

function draw() {
  if (state == INTRO) {
    drawOne();
  } else if (state == PLAYING) {
    drawTwo();
  } else if (state == GAMEOVER) {
    drawThree();
  } else if (state == GAMEOVER2) {
    drawFour();
  } else if (state == GAMEOVER3) {
    drawFive();
  }
}

function keyPressed() {
  if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)) {
    if (state == PLAYING) {
      if (keyCode == RIGHT_ARROW) {
        yeti.velocity.x = 4.5;
        yeti.mirrorX(1);
        yeti.changeAnimation('moving');
      } else if (keyCode == LEFT_ARROW) {
        yeti.velocity.x = -4.5;
        yeti.mirrorX(-1);
        yeti.changeAnimation('moving');
      } else {}
    }
  }

  if (keyIsDown(32)) {
    if (state == INTRO) {
      state++;
      gameStart();
    } else if (state == GAMEOVER) {
      state = INTRO;
      yetiInt.position.x = -20;
      huntInt.position.x = -140;
    } else if (state == GAMEOVER2) {
      state = INTRO;
      yetiInt.position.x = -20;
      huntInt.position.x = -140;
    } else if (state == GAMEOVER3) {
      state = INTRO;
      yetiInt.position.x = -20;
      huntInt.position.x = -140;
    }
  }
}


function drawOne() {
  renderSprite(spr_background[0], CORNER, 0, 0);
  renderSprite(spr_logo, CENTER, width / 2, height / 2);

  if (yetiInt.position.x >= width + 20) {
    yetiInt.position.x = -20;
  }

  if (huntInt.position.x >= width + 20) {
    huntInt.position.x = -20;
  }

  drawSprite(yetiInt);
  drawSprite(huntInt);


}

function drawTwo() {
  for (let i = 0; i < p.length; i++) {
    p[i].update();
    pr[i].update();
  }
  
  if (yeti.position.y > p[platIndex].pos.y ) {
    points += 1;
    platIndex++;
    platIndex %= 3;
  }
  
  if (platforms.displace(yeti)) {
    yeti.velocity.y = 0;
  }

  if (yeti.position.x >= width - yeti.width / 2 || yeti.position.x <= 0 + yeti.width / 2) {
    yeti.velocity.x = 0;
    yeti.changeAnimation('still');
  }

  if (yeti.position.y >= height - yeti.width / 2 && !platforms.displace(yeti)) {
    state = GAMEOVER2;
    gSpeed = 2;
    bSpeed = 2;
  }

  if (poach.position.y >= 35) {
    poach.velocity.y = 0;
  }

  if (hunt.position.y >= 40 && hunt2.position.y >= 40) {
    hunt.velocity.y = 0;
    hunt.velocity.x = huntSpeed;
    hunt2.velocity.y = 0;
    hunt2.velocity.x = huntSpeed;
  }

  if (hunt.position.x >= 330 && hunt2.position.x >= 330) {
    huntSpeed = -1;
  }

  if (hunt.position.x <= 30 && hunt2.position.x <= 30) {
    huntSpeed = 1;
  }

  if (yeti.overlap(poach)) {
    state = GAMEOVER;
    gSpeed = 2;
    bSpeed = 2;
  }

  if (frameCount % 220 == 0) {
    let bullet = createSprite(hunt2.position.x, hunt2.position.y + 20,
      10, 20);
    // bullet.shapeColor = color (253,147,44);
    bullet.addImage(spr_bullet);
    bullet.setSpeed(bSpeed, 90);
    bullets.add(bullet);
    bullet.life = 300;

    bSpeed += 0.1;
  }

  if (yeti.overlap(bullets)) {
    state = GAMEOVER3;
    gSpeed = 2;
    bSpeed = 2;
  }



  yeti.addSpeed(0.25, 90);
  base.UpdateAndRender();

  drawSprites(platforms);
  drawSprite(hunt);
  drawSprite(poach);
  drawSprites(bullets);
  drawSprite(hunt2);
  drawSprite(yeti);


  fill(255);
  textSize(40);
  textFont(font);
  textAlign(CENTER)
  text(points, width / 2, 610);
}

function drawThree() {
  base.UpdateAndRender();
  base.spd = 0;

  drawSprites(platforms);
  hunt.velocity.x = 0;
  drawSprite(hunt);
  drawSprite(poach);
  hunt2.velocity.x = 0;
  drawSprite(hunt2);
  yeti.velocity.y = 0;
  yeti.velocity.x = 0;
  drawSprite(yeti);

  fill(253, 147, 44, 200);
  rect(0, 0, width, height);

  fill(255);
  textSize(40);
  textFont(font);
  textAlign(CENTER)
  text(points, width / 2, 610);

  renderSprite(spr_gameover, CENTER, width / 2, height / 2);

}

function drawFour() {
  base.UpdateAndRender();
  base.spd = 0;

  drawSprites(platforms);
  hunt.velocity.x = 0;
  hunt.velocity.y = 0;
  drawSprite(hunt);
  poach.velocity.y = 0;
  drawSprite(poach);
  hunt2.velocity.x = 0;
  hunt2.velocity.y = 0;
  drawSprite(hunt2);
  yeti.velocity.y = 0;
  yeti.velocity.x = 0;
  drawSprite(yeti);

  fill(253, 147, 44, 200);
  rect(0, 0, width, height);

  fill(255);
  textSize(40);
  textFont(font);
  textAlign(CENTER)
  text(points, width / 2, 610);

  renderSprite(spr_gameover2, CENTER, width / 2, height / 2);
}

function drawFive() {
  base.UpdateAndRender();
  base.spd = 0;

  drawSprites(platforms);
  hunt.velocity.x = 0;
  drawSprite(hunt);
  drawSprite(poach);
  hunt2.velocity.x = 0;
  drawSprite(hunt2);
  yeti.velocity.y = 0;
  yeti.velocity.x = 0;
  drawSprite(yeti);

  fill(253, 147, 44, 200);
  rect(0, 0, width, height);

  fill(255);
  textSize(40);
  textFont(font);
  textAlign(CENTER)
  text(points, width / 2, 610);

  renderSprite(spr_gameover3, CENTER, width / 2, height / 2);
}