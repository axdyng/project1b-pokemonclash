function GameEngine() {
  //get canvas and context
  this.canvas = document.getElementById('canvas');
  this.ctx = this.canvas.getContext('2d');
  this.initialized = false;
  //set tile height and width
  this.tileW = 32;
  this.tileH = 32;
  //offsets to the position of the map
  this.mapIndexValue = null;
  this.mapX = 0;
  this.mapY = 0;
  //create image object and array to create later
  this.Img = {};
  this.Img.array = [];
  //create audio object
  this.Audio = {};
  //player1, 2 and item position
  this.player1X = 1;
  this.player1Y = 1;
  this.player2X = 23;
  this.player2Y = 13;
  this.totalMoves = 0;
  this.itemX = null;
  this.itemY = null;
  this.item2X = null;
  this.item2Y = null;
  //score
  this.p1Score = 0;
  this.p2Score = 0;
  //create map area
  this.gameMap = [
    //terrain: 0, wall: 1, items: 2
    //top of canvas, 25 by 15
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //bottom of canvas
  ];
}

GameEngine.prototype = {
  constructor: GameEngine,

  startScreen: function() {

    this.Audio.loading = new Audio('./audio/palette-town.mp3');
    this.Audio.loading.play();

    this.ctx.font = "45px Arial";
    this.ctx.fillStyle = '#FACD3C';
    //this.ctx.fillRect(0, 0, 800, 480);
    this.ctx.strokeText('CLICK TO PLAY', this.canvas.width / 3.5, 400, 500);
    //console.log(this.canvas);
    this.canvas.addEventListener('click', this.init.bind(this));
  },

  init: function() {
    if (!(this.initialized)) {
      console.log('Initializing game');
      //stop pokemon center music
      this.Audio.loading.pause();
      this.Audio.currentTime = 0;

      //preload images
      this.preload();
      this.randomizeItem();
      //console.log(this.randomizeItem());
    }
    window.addEventListener('keydown', this.keyDowned.bind(this));
    //this.drawItems();
    this.initialized = true;
  },

  preload: function() {
    var holdImages = ["./images/sand.png", "./images/metalwall.png", "./images/charmander.png", "./images/pikachu.png", "./images/pokeball.png", "./images/pokedex.png"];

    for (var i = 0; i < holdImages.length; i++) {
      var newImages = new Image();
      newImages.src = holdImages[i];
      this.Img.array.push(newImages);
      this.Img.array[i].onload = this.drawImages.bind(this);
    }
    //play rival music
    this.Audio.gaming = new Audio('./audio/cycling.mp3');
    this.Audio.gaming.play();
  },

  /**************** -----CHECKERS----- ***********************/
  checkCollision: function(x, y) {
    //check if there is collision
    //0: path, 1: wall, 2: player occupied, 3: item spot
    if (this.gameMap[y][x] !== 1) {
      return true;
    } else {
      return false;
    }
  },

  ballCollected: function(x, y) {
    if (this.gameMap[y][x] == 2) {
      return true;
    } else {
      return false;
    }
  },

  dexCollected: function(x, y) {
    if (this.gameMap[y][x] == 3) {
      return true;
    } else {
      return false;
    }
  },

  scoreUpdate: function(whoScored) {
    var p1ScoreTxt = document.getElementById('p1Score');
    p2ScoreTxt = document.getElementById('p2Score');

    switch (whoScored) {
      case 1:
        this.p1Score++;
        p1ScoreTxt.innerHTML = this.p1Score;
        p1ScoreTxt.style.color = "white";
        p1ScoreTxt.style.backgroundColor = "red";
        //change p2 text color
        p2ScoreTxt.style.color = "black";
        p2ScoreTxt.style.backgroundColor = "transparent";
        break;
      case 2:
        this.p2Score++;
        p2ScoreTxt.innerHTML = this.p2Score;
        p2ScoreTxt.style.color = "white";
        p2ScoreTxt.style.backgroundColor = "red";
        //change p1 text color
        p1ScoreTxt.style.color = "black";
        p1ScoreTxt.style.backgroundColor = "transparent";
        break;
      default:

    }
  },

  /**************** -----IMAGES HANDLING----- ***********************/
  drawImages: function() {
    this.ctx.clearRect(0, 0, 800, 480);
    this.randomizeItem2();
    //0 for paths, 1 for walls, 2 for pokeball, 3 for pokedex
    for (var i = 0; i < this.gameMap.length; i++) {
      for (var j = 0; j < this.gameMap[i].length; j++) {
        this.mapIndexValue = this.gameMap[i][j];

        //draw terrain
        if (this.mapIndexValue === 0) {
          //paths
          this.ctx.drawImage(this.Img.array[0], (j * this.tileW) + this.mapX, (i * this.tileH) + this.mapY);
        } else if (this.mapIndexValue === 1) {
          //walls
          this.ctx.drawImage(this.Img.array[1], (j * this.tileW) + this.mapX, (i * this.tileH) + this.mapY);
        } else if (this.mapIndexValue === 2) {
          //path + pokeball
          this.ctx.drawImage(this.Img.array[0], (j * this.tileW) + this.mapX, (i * this.tileH) + this.mapY);
          this.ctx.drawImage(this.Img.array[4], (j * this.tileW) + this.mapX, (i * this.tileH) + this.mapY);
        } else if (this.mapIndexValue === 3) {
          //path + pokedex
          this.ctx.drawImage(this.Img.array[0], (j * this.tileW) + this.mapX, (i * this.tileH) + this.mapY);
          this.ctx.drawImage(this.Img.array[5], (j * this.tileW) + this.mapX, (i * this.tileH) + this.mapY);
        }

        //draw players
        if (this.player1X == j && this.player1Y == i) {
          //player 1
          this.ctx.drawImage(this.Img.array[2], (j * this.tileW) + this.mapX, (i * this.tileH) + this.mapY);
        } else if (this.player2X == j && this.player2Y == i) {
          //player 2
          this.ctx.drawImage(this.Img.array[3], (j * this.tileW) + this.mapX, (i * this.tileH) + this.mapY);
        }
      }
    }
  },

  randomizeItem: function() {
    var isTileEmpty = true;

    //randomise the itemX and Y coodinates
    this.itemX = Math.floor(Math.random() * this.gameMap[0].length);
    this.itemY = Math.floor(Math.random() * this.gameMap.length);

    if (this.gameMap[this.itemY][this.itemX] === 0) {
      isTileEmpty = false;
      this.gameMap[this.itemY][this.itemX] = 2;
    }
    return [this.itemX, this.itemY];
    //console.log(this.itemX, this.itemY);

  },

  randomizeItem2: function() {
    var isTileEmpty = true;

    if(this.totalMoves % 8 === 0 && this.totalMoves !== 0) {
      //randomise the itemX and Y coodinates
      this.item2X = Math.floor(Math.random() * this.gameMap[0].length);
      this.item2Y = Math.floor(Math.random() * this.gameMap.length);

      if (this.gameMap[this.item2Y][this.item2X] === 0) {
        isTileEmpty = false;
        this.gameMap[this.item2Y][this.item2X] = 3;
      }
    }
    return [this.item2X, this.item2Y];

  },

  /**************** -----KEY EVENTS----- ***********************/
  keyDowned: function(e) {
    //track the next move
    var p1NextX = this.player1X,
      p2NextX = this.player2X,
      p1NextY = this.player1Y,
      p2NextY = this.player2Y;

    switch (e.keyCode) {
      //player 1 keys
      case 65: //a
        p1NextX--;
        break;
      case 68: //d
        p1NextX++;
        break;
      case 87: //w
        p1NextY--;
        break;
      case 83: //s
        p1NextY++;
        break;
        //player 2 keys
      case 37: //left
        p2NextX--;
        break;
      case 39: //right
        p2NextX++;
        break;
      case 38: //up
        p2NextY--;
        break;
      case 40: //down
        p2NextY++;
        break;
      default:
    }
    //player1
    if (e.keyCode == 65 || e.keyCode == 68 || e.keyCode == 87 || e.keyCode == 83) {
      //check if p1 next move is valid
      if (this.checkCollision(p1NextX, p1NextY)) {
        this.player1X = p1NextX;
        this.player1Y = p1NextY;
        this.totalMoves++;
        //this.gameMap[this.player1Y][this.player1X] = 2;
      }
      //check if p1 collected ball
      if (this.ballCollected(p1NextX, p1NextY)) {
        //reset the array value
        //this.p1Score++;
        this.scoreUpdate(1);
        this.gameMap[this.itemY][this.itemX] = 0;
        this.randomizeItem();
        this.scoreUpdate();
      }
      //check if p1 touched pokedex
      if(this.dexCollected(p1NextX, p1NextY)) {
        this.gameMap[this.player1Y][this.player1X] = 0;
        this.player1X = 1;
        this.player1Y = 1;
      }
      //console.log(this.p1Score);

    } else if (e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 38 || e.keyCode == 40) {
      //check if p2 next move is valid
      if (this.checkCollision(p2NextX, p2NextY)) {
        this.player2X = p2NextX;
        this.player2Y = p2NextY;
        this.totalMoves++;
      }
      if (this.ballCollected(p2NextX, p2NextY)) {
        //this.p2Score++;
        this.scoreUpdate(2);
        this.gameMap[this.itemY][this.itemX] = 0;
        this.randomizeItem();
        this.scoreUpdate();
      }
      //check if p2 touched pokedex
      if(this.dexCollected(p2NextX, p2NextY)) {
        this.gameMap[this.player2Y][this.player2X] = 0;
        this.player2X = 23;
        this.player2Y = 13;
      }
    }
    this.drawImages();

  },



};



$(document).ready(function() {
  var newGame = new GameEngine();
  newGame.startScreen();
});



//check player collision
// if( (p1NextX && p1NextY) !== (p2NextX && p2NextY)) {    //this is still buggy
//   this.player1X = p1NextX;
//   this.player1Y = p1NextY;
// }
