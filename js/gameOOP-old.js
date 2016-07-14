function GameEngine() {
  //get canvas and context
  this.canvas = document.getElementById('canvas');
  this.ctx = this.canvas.getContext('2d');
  this.initialized = false;
  //set tile height and width
  this.tileW = 32;
  this.tileH = 32;
  //calculate the no. of tiles in X-row and Y-column
  this.tilesX = this.canvas.width / this.tileW; //25 tiles
  this.tilesY = this.canvas.height / this.tileH; //15 tiles
  //offsets to the position of the map
  this.mapIndexValue = null;
  this.mapX = 0;
  this.mapY = 0;
  this.validMove = null;
  //player1, 2 and item position
  this.player1X = 1;
  this.player1Y = 1;
  this.player2X = 23;
  this.player2Y = 13;
  this.itemX = null;
  this.itemY = null;
  //array to store images
  this.tilesImg = [];
  this.playersImg = [];
  this.itemsImg = [];
  this.imgLoaded = false;
  //create map area
  this.gameMap = [
    //terrain: 0, wall: 1, items: 2
    //top of canvas
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
    // var gradient = this.ctx.createLinearGradient(0,0,200,0);
    // gradient.addColorStop(0,"brown");
    // gradient.addColorStop(1,"black");
    this.ctx.font = "40px Arial";
    this.ctx.fillStyle = '#FACD3C';
    this.ctx.fillRect(0, 0, 800, 480);
    this.ctx.strokeText('CLICK TO PLAY', 250, 250, 500);

    this.canvas.addEventListener('click', this.init.bind(this));
  },

  init: function() {
    if(!(this.initialized)){
      console.log('Initializing game');

      this.loadImages();
    }

    //this.drawItems();
//    window.addEventListener("keydown", this.keyDown.bind(this));
    // this.canvas.removeEventListener('click', this.init) ;
    // window.removeEventListener('click', this.init);
   //console.log(this.init);
   this.initialized = true;
  },

  keyDown: function(e) {
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
      if (this.isValid(p1NextX, p1NextY)) {
        this.player1X = p1NextX;
        this.player1Y = p1NextY;
      }
    } else if (e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 38 || e.keyCode == 40) {
      //check if p2 next move is valid
      if (this.isValid(p2NextX, p2NextY)) {
        this.player2X = p2NextX;
        this.player2Y = p2NextY;
      }
    }
    // update canvas n positions
    this.update();
    //console.log(this.player1X, this.player1Y);
    //console.log(this.p1NextX);

  },

  update: function() {
    //clear canvas and redraw
    this.ctx.clearRect(0, 0, 800, 480);
    this.drawMap();
  },

  isValid: function(x, y) {
    //check if there is collisi
    if (this.gameMap[y][x] !== 1) {
      return true;
    } else {
      return false;
    }
  },

  //load the images
  loadImages: function() {
    var tilesArray = ["./images/sand.png", "./images/metalwall.png"],
      pokemonArray = ["./images/charmander.png", "./images/pikachu.png"],
      itemsArray = ["./images/pokeball.png"],
      imagesArray = [tilesArray, pokemonArray, itemsArray];
    //console.log(imagesArray);

    for (var i = 0; i < imagesArray.length; i++) {
      //environment
      this.tilesImg[i] = new Image();
      //players
      this.playersImg[i] = new Image();
      //items
      this.itemsImg[i] = new Image();
      //once all images are loaded, start drawMap
      this.tilesImg[i].onload = loadMap.bind(this);
      this.playersImg[i].onload = loadMap.bind(this);
      this.itemsImg[i].onload = loadMap.bind(this);

      //callback drawMap
      function loadMap() {
        //this.imgLoaded = true;
      this.drawMap();
        //this.drawItems();
      }

      this.tilesImg[i].src = tilesArray[i];
      this.playersImg[i].src = pokemonArray[i];
      this.itemsImg[i].src = itemsArray[0];

    }
  },

  //draw map in canvas
  drawMap: function() {
    //loop into gameMap then into the array within it
    for (var i = 0; i < this.gameMap.length; i++) {
      for (var j = 0; j < this.gameMap[i].length; j++) {
        this.mapIndexValue = this.gameMap[i][j];

        if (this.mapIndexValue === 0) {
          //path
          this.ctx.drawImage(this.tilesImg[0], (j * this.tileW) + this.mapX, (i * this.tileH) + this.mapY);
        } else if (this.mapIndexValue === 1) {
          //wall
          this.ctx.drawImage(this.tilesImg[1], (j * this.tileW) + this.mapX, (i * this.tileH) + this.mapY);
        } else if (this.mapIndexValue === 2) {
          //item
          this.ctx.drawImage(this.itemsImg[0], this.itemX * 32, this.itemY * 32);
        }


        //draw players
        if (this.player1X == j && this.player1Y == i) {
          //player 1
          this.ctx.drawImage(this.playersImg[0], (j * this.tileW) + this.mapX, (i * this.tileH) + this.mapY);
        } else if (this.player2X == j && this.player2Y == i) {
          //player 2
          this.ctx.drawImage(this.playersImg[1], (j * this.tileW) + this.mapX, (i * this.tileH) + this.mapY);
        }

      }
    }
  },

  drawItems: function() {
    var isEmpty = true;

    this.itemX = Math.floor(Math.random() * this.gameMap[0].length);
    this.itemY = Math.floor(Math.random() * this.gameMap.length);
    //if the randomized position is valid (0)
    if (this.isValid(this.itemX, this.itemY)) {
      //this.ctx.drawImage(this.itemsImg[0], this.itemX * 32, this.itemY * 32);
      //change array value to 2 on item position
      isEmpty = false;
    }
    this.gameMap[this.itemX][this.itemY] = 2;

  },

};

$(document).ready(function() {
  var newGame = new GameEngine();
  newGame.startScreen();
});
