function gameStart() {
  //GLOBAL DEFINITIONS
  base = new Base();
  platforms = new Group();
  bullets = new Group();
  playing = true;
  points = 0;
  
  
  //CREATE OBJECTS
  yeti = createSprite(width/2, 50, 40, 40);
  yeti.addImage(spr_player);
  yeti.addAnimation('moving','sprites/player1.png');
  yeti.addAnimation('still','sprites/player.png');
  
  poach = createSprite(width/2,-40,33,46);
  poach.addImage(spr_poacher);
  
  hunt = createSprite(width/2,-35,width,70);
  hunt.addImage(spr_hunter);
  hunt2 = createSprite(width/2,-35,width,70);
  hunt2.addImage(spr_hunter2);
  
  let qnt = 3;
    for (let i = 0; i < qnt; i++){

        p[i]  = new Platform(
            getNewPos(),
            height + (height + spr_platform.height) / qnt * i,
            i
        );
      
        platforms.add(p[i].sprite);

        pr[i] = new Platform(
            p[i].pos.x + width + free,
            height + (height + spr_platform.height)  / qnt * i,
            i
        );
      
        platforms.add(pr[i].sprite);
    }
  
  poach.velocity.y++;
  hunt.velocity.y++;
  hunt2.velocity.y++; 
}

function getNewPos(){ //Random x positions for platforms to generate differently
  return random(-180,180-free);
}

function addPoint(){ //Add points to counter
  points++;
  
}

function renderSprite(sprite, mode, x, y) { //funtion to render in object images easier
  imageMode(mode);
  image(sprite, x, y);
}
