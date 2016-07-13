function GameEngine() {
  //get canvas context
  this.canvas = document.getElementById('canvas'),
    this.ctx = this.canvas.getContext('2d'),
    //calculate the no. of tiles in X-row and Y-column
    this.tilesX = this.canvas.width / 32, //25 tiles
    this.tilesY = this.canvas.height / 32, //15 tiles
    //offsets to the position of the map
    this.mapX = 0,
    this.mapY = 0,
    //create map data
    this.gameMap = [
      //top of canvas
      [{ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}],
   [{ground:1, item:2}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1, item:2}],
   [{ground:1, item:2}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1, item:2}],
   [{ground:1, item:2}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1, item:2}],
   [{ground:1, item:2}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1, item:2}, {ground:1}, {ground:1}, {ground:1}, {ground:1, item:2}],
   [{ground:1, item:2}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1, item:2}, {ground:1, item:2}, {ground:1}, {ground:1}, {ground:1, item:2}],
    ];
    //bottom of canvas
  //image array
  this.tileImages = [];
  this.imgLoaded = false;


}

GameEngine.prototype = {
  constructor: GameEngine,

  init: function() {
    console.log('initializing game');
    this.storeTiles(0, './images/water.png');
    this.storeTiles(1, './images/sand.png');
    this.storeTiles(2, './images/metalwall.png');

    this.drawMap();
  },

  //include all drawing functions
  // drawAllOfEm: function() {
  //   if(this.allImgsLoaded() === false) {
  //     setTimeout(function(md) {
  //       return md;
  //     }(this.gameMap), 100);
  //   }
  //   this.drawMap();
  // },

  drawMap: function() {
    //offsets to the position of the map
    var mapX = 0;
    var mapY = 0;
    var tile;
    //loop in y-axis first because 2d arrays accessed 'in reverse'
    for (var i = 0; i < this.tilesY.length; i++) {
      for (var j = 0; j < this.tilesX.length; j++) {
        //calculate the map index in the array
        mapY += i;
        mapX += j;

        if (this.gameMap[mapY] && this.gameMap[mapY][mapX]) {
          tile = this.gameMap[mapY][mapX].ground; //get the tile, i.e terrain or wall
        } else {
          tile = {ground: 0};   //terrain, image [0]
        }

        this.drawTile(i, j, tile);
      }
    } //end of for loop
  },

  drawTile: function(x, y, tile) {
    //draw the grounds
    this.ctx.drawImage(this.retrieve(tile.ground), x * 32, y * 32);
    //if the tile has item
    if(tile.item) {
      this.ctx.drawImage(this.retrieve(tile.item), x * 32, y * 32);
   }
  },

  //function to store tiles
  storeTiles: function(id, imgSrc) {
    var imgIdx = this.tileImages.length;
    var tile = [id, new Image()];    //id, image itself

    tile[1].src = imgSrc;

    tile[1].onload = function() {
      this.imgLoaded = true;  //when images loaded, loadedStatus = true
    };

    tile = this.tileImages[imgIdx]; // store this tile
  },

  //retrieve the images
  retrieveImages: function(id) {

   for (var i = 0; i < this.tileImages.length; i++) {
     if(this.tileImages[i][0] == id) {
       return this.tileImages[i][1];    //return the image if id matches it
     }
   }
 },

 //check if all images loaded
 allImgsLoaded: function() {
   for (var i = 0; i < this.tileImages.length; i++) {
     //[2] refer to the boolean checking is loaded?
     if(this.tileImages[i][2] === false) {
       return false;
     }
   }
   return true;
 },

}; //end of GameEngine


var newGame = new GameEngine();
newGame.init();
console.log(newGame.gameMap);
//console.log(newGame.gameMap);
