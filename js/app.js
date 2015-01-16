var enemyPosY = [60, 143, 226];
var enemySpeed = [50, 130, 160, 200, 220, 300, 350];
var playerPosY = [];
var playerImages = [
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
];
// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = enemyPosY[Math.floor(Math.random() * 3)];
    this.speed = enemySpeed[Math.floor(Math.random() * 7)];
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    this.x = this.x + (this.speed * dt);
    if(this.x > 960){
        this.x = -100;
        this.y = this.y + 83;
        this.speed = enemySpeed[Math.floor(Math.random() * 7)];
        if (this.y > 226) {
          this.y = 60;
        }  
    }
    // determine collisions with enemy
    if(this.x > -50 && this.x < 50){
        this.tileX = 0;
    }else if(this.x > 50 && this.x < 150){
        this.tileX = 101;
    }else if(this.x > 150 && this.x < 250){
        this.tileX = 202;
    }else if(this.x > 250 && this.x < 350){
        this.tileX = 303;
    }else if(this.x > 350 && this.x < 450){
        this.tileX = 404;
    }else if(this.x > 450 && this.x < 550){
        this.tileX = 505;
    }else if(this.x > 550 && this.x < 650){
        this.tileX = 606;
    }else if(this.x > 650 && this.x < 750){
        this.tileX = 707;
    }else if(this.x > 750 && this.x < 850){
        this.tileX = 808;
    }else if(this.x > 850){
        this.tileX = 1;
    }
    //check for collision with player
    if(player.x === this.tileX && player.y === this.y){
        player.reset();
        if(allEnemies.length <= 10){
            allEnemies.push(new Enemy());
        }
        
    }
}

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Player class
var Player = function() {

     this.sprite = playerImages[Math.floor(Math.random() * 5)];
     this.x = 404;
     this.y = 392;
}

/** 
 * Updates the player's position.
 * The player's position is updated by the direction of Key value.
 * The player's position resets when reach the water.
 */
Player.prototype.update = function() {

   if(this.Pkey == "up"){
    this.y = this.y - 83;
   }else if(this.Pkey == "down" && player.y < 392){
    this.y = this.y + 83;
   }else if(this.Pkey == "right" && player.x < 808){
    this.x = this.x + 101;
   }else if(this.Pkey == "left" && player.x > 0){
    this.x = this.x - 101;
   }
   this.Pkey = null;
   if(this.y < 60){
        player.reset();
   }
}

/**
 * Renders the player on the screen.
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/**
 * Reset player position if he hits enemy
 */
Player.prototype.reset = function() {
     this.x = 404;
     this.y = 392;
}
/**
 * Sets control key for updating player's postion.
 * @param key Direction passed in from user's key input.
 */
Player.prototype.handleInput = function(key) {
    this.Pkey = key;
}

player = new Player();
enemyA = new Enemy();
enemyB = new Enemy();
enemyC = new Enemy();
enemyD = new Enemy();
allEnemies = [enemyA,enemyB,enemyC,enemyD];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
