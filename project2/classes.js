function SVec(xx, yy, sx, sy) {
  this.x = xx;
  this.y = yy;
  this.xscl = sx;
  this.yscl = sy;
}

function Platform(xx, yy, ind) { 
  this.spriteIndex = spr_platform;
  this.index = ind;


  this.pos = new SVec(
    xx,
    yy,
    this.spriteIndex.width,
    this.spriteIndex.height
  );

  this.sprite = createSprite(this.pos.xx, this.pos.yy, this.spriteIndex.width, this.spriteIndex.height);
  this.sprite.addImage(this.spriteIndex);
  
  this.update = function() {
    this.pos.y -= gSpeed;
    gSpeed += 0.0002;

    if (this.pos.y < -this.spriteIndex.height) {
      this.pos.y = height + this.spriteIndex.height/2;
      this.pos.x = getNewPos();
      pr[this.index].pos.x = this.pos.x + width + free;
      pr[this.index].pos.y = height + this.spriteIndex.height/2;
    }

    this.sprite.position.x = this.pos.x;
    this.sprite.position.y = this.pos.y;
  }
}

function Base() {
  this.spd = -1.5;
  this.x = 0;
  this.y = 0;

  this.UpdateAndRender = function() {
    this.y = this.y + this.spd;

    if (this.y < -spr_background[1].height) {
      this.y = 0;
    }

    imageMode(CORNER);
    image(spr_background[1], this.x, this.y);
    image(spr_background[1], this.x, this.y + spr_background[1].height);
  }
}