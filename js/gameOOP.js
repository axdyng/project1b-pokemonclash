function GameEngine() {
  //get canvas and context
  this.canvas = document.getElementById('canvas');
  this.ctx = this.canvas.getContext('2d');
  //set tile height and width
  this.tileW = 32;
  this.tileH = 32;
  //calculate the no. of tiles in X-row and Y-column
  this.tilesX = this.canvas.width / this.tileW; //25 tiles
  this.tilesY = this.canvas.height / this.tileH; //15 tiles
  //offsets to the position of the map
  this.mapX = 0;
  this.mapY = 0;
  //player1, 2 and item position
  this.player1X = 1; this.player1Y = 1;
  this.player2X = 23; this.player2Y = 13;
  this.itemX = null; this.itemY = null;
  //array to store images
  this.tilesImg = [];
  this.playersImg = [];
  this.itemImg = [];
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
    this.ctx.strokeText('CLICK TO PLAY',250,250,500);

    this.canvas.addEventListener('click', this.init.bind(this));
  },

  init: function() {
    console.log('Initializing game');
    this.loadImages();
    // this.drawMap();
  },

  //load the images
  loadImages: function() {
    var tilesArray = ["./images/sand.png", "./images/metalwall.png"],
        playersArray = ["./images/bomber1.png", "./images/bomber2.png"],
        imagesArray = [tilesArray, playersArray];
        //console.log(imagesArray);

    for (var i = 0; i < imagesArray.length; i++) {
      //environment
      this.tilesImg[i] = new Image();
      this.tilesImg[i].src = tilesArray[i];
      //players
      this.playersImg[i] = new Image();
      this.playersImg[i].src = playersArray[i];
      //once all images are loaded, start drawMap
      this.tilesImg[i].onload = loadMap.bind(this);
      this.playersImg[i].onload = loadMap.bind(this);

      //callback drawMap
      function loadMap() {
        this.drawMap();
      }
    }
  },

  //draw map in canvas
  drawMap: function() {
    var drawTile;

    //loop into gameMap then into the array within it
    for (var i = 0; i < this.gameMap.length; i++) {
      for (var j = 0; j < this.gameMap[i].length; j++) {
        drawMapIndex = this.gameMap[i][j];
        //( image, at x, at y )
        this.ctx.drawImage(this.tilesImg[drawMapIndex], (j * this.tileW) + this.mapX, (i * this.tileH) + this.mapY);
        //draw players
        if (this.player1X == j && this.player1Y == i) {
          //player 1
          this.ctx.drawImage(this.playersImg[0], (j * this.tileW) + this.mapX, (i * this.tileH) + this.mapY);
        }
        else if (this.player2X == j && this.player2Y == i) {
          //player 2
          this.ctx.drawImage(this.playersImg[1], (j * this.tileW) + this.mapX, (i * this.tileH) + this.mapY);
        }

      }
    }
  },

  //set timer
};

$(document).ready(function() {
  var newGame = new GameEngine();
  newGame.startScreen();
})
