
var live=3;
//**************Enemy class******************************************
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.width = 80;
    this.height = 60;
    this.speed = 1;
    this.speed = 50+Math.floor(Math.random() * 222);
};
// Update the enemy's position
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
//when the enemy rech the end of canvase x axix reset the position of enemy
    if (this.x > 505) {
        this.x = -50;
    }
    //here check if the collision is happen reset player postion
    //decrese the score 50 and LIVE
    //after each collision check the live if no live the game is over and reset every thing
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
        player.score -= 50; // adds to score when player hits water
        document.getElementById("score").innerHTML = player.score;
        live--;
        document.getElementById("live").innerHTML = live;
        if(live==0){
          alert("GameOver you do't have alive \n Try again");
          player.x = 202;
          player.y =405;
          player.score = 0;
          document.getElementById("score").innerHTML = player.score;
          live=3;
          document.getElementById("live").innerHTML = live;
        }
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Place all enemy objects in an array called allEnemies
var allEnemies = [
    new Enemy(-200, 55),
    new Enemy(-200, 140),
    new Enemy(-200, 225)];
//**************Player class******************************************
var Player = function(x, y) {

    this.x = x;
    this.y = y;
    this.score = 0;
    this.sprite = 'images/char-boy.png';
    this.width = 80;
    this.height = 50;
};

//in update function check the score evry time when score==300
//the player is win and reset the player position and reset live and score
Player.prototype.update = function() {
  if(this.score>=300){
    alert("Congratulation you are awinner");
    this.x = 202;
    this.y =405;
    this.score = 0;
    document.getElementById("score").innerHTML = this.score;
    live=3;
    document.getElementById("live").innerHTML = live;
  }
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//function to move player depend on keyboard key
//increse the score 100 if player reach the sea and reset Player postion
Player.prototype.handleInput = function(direction) {
    if (direction === 'left' && this.x > 0) {
        this.x -= 101;
    }
    if (direction === 'right' && this.x < 400) {
        this.x += 101;
    }
    if (direction === 'up' && this.y > 0) {
        this.y -= 83;
    }
    if (direction === 'down' && this.y < 400) {
        this.y += 83;
    }
    if(this.y<=0){
      setTimeout(function(){
        player.x = 202;
        player.y =405;
      },600);
      this.score += 100;
      document.getElementById("score").innerHTML = this.score;
    }
};

// Place the player object in a variable called player
var player = new Player(202, 405);

//*****************************gem class*******************
const X_POSITIONS = [101, 202, 303,404];
const Y_POSITIONS = [100, 200, 300];
var Gem = function() {
  var g=gems[Math.floor(Math.random() * gems.length)];
    this.name=g.name;
    this.image=g.image;
    this.value=g.value;
    this.x = X_POSITIONS[Math.floor(Math.random() * X_POSITIONS.length)];
    this.y = Y_POSITIONS[Math.floor(Math.random() * Y_POSITIONS.length)];;
};
Gem.prototype.collected= function() {
  if (player.x < this.x + 80 &&
      player.x + 80 > this.x &&
      player.y < this.y + 60 &&
      60 + player.y > this.y) {
        player.score += this.value;
        document.getElementById("score").innerHTML = player.score;
        window.gem = new Gem();
      }
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.image), this.x, this.y);
};

const gems = [
  {name:"green gem",image:'images/Gem Green.png',value:50},
  {name:"blue gem",image:'images/Gem Blue.png',value:30},
  {name:"orange gem",image:'images/Gem Orange.png',value:20}];

window.gem = new Gem();
//*****************************heart class***********************
var Heart = function() {
    this.image='images/Heart.png';
    this.x =X_POSITIONS[Math.floor(Math.random() * X_POSITIONS.length)];
    this.y =Y_POSITIONS[Math.floor(Math.random() * Y_POSITIONS.length)];;
};
Heart.prototype.collected= function() {
  if (player.x < this.x + 80 &&
      player.x + 80 > this.x &&
      player.y < this.y + 60 &&
      60 + player.y > this.y) {
        live++;
        document.getElementById("live").innerHTML = live;
        window.heart ={};
      }
};

Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.image), this.x, this.y);
};


window.heart = new Heart();
//**********************************************************
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
