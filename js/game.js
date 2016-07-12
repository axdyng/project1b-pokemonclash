// Create scope to nest all variables in
(function(isometric) {

  // Two Dimensional Array storing our isometric map layout. Each number represents a tile.
  var map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //top of canvas
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //bottom of canvas
  ];

  var tileImages = [];
  var bomber1X = 1,
      bomber1Y = 1;

  function loadImg() {

    // Images to be loaded and used.
    // Tutorial Note: As water is loaded first it will be represented by a 0 on the map and land will be a 1.
    var landTiles = ["./images/sand.png", "./images/metalwall.png", "./images/bombertest.png"],
        //bombers = ["./images/bomber.png", "./images/bomber2.png"],
        totalImgsLoaded = 0;

    for (var i = 0; i < landTiles.length; i++) {
      tileImages[i] = new Image();
      tileImages[i].src = landTiles[i];
      tileImages[i].onload = function() {
        // Once the image is loaded increment the loaded graphics count and check if all images are ready.
        totalImgsLoaded++;
        if (totalImgsLoaded === landTiles.length) {
          drawMap();
        }
      };
    }

  }


  function drawMap() {

    // create the canvas context
    var ctx = document.getElementById('canvas').getContext('2d');

    // Set the tile height and width
    var tileH = 32;
    var tileW = 32;

    // X & Y are offsets to position the map as we want
    var mapX = 0;
    var mapY = 0;

    var drawTile;

    // loop through map arry and draw out the image represented by the number.
    for (var i = 0; i < map.length; i++) {
      for (var j = 0; j < map[i].length; j++) {
        drawTile = map[i][j];
        // Draw the represented image number, at the desired X & Y coordinates followed by the graphic width and height.
        ctx.drawImage(tileImages[drawTile], (j * tileH) + mapX, (i * tileH) + mapY);
        //draw bomber 1
        if (bomber1X === i && bomber1Y === j) {
          ctx.drawImage(tileImages[2], (j * tileH) + mapX, (i * tileH) + mapY);
        }
      }
    }
  }

  function init() {
    // Remove Event Listener and load images.
    isometric.removeEventListener('load', init);
    loadImg();
    //add keys Listener
    isometric.addEventListener("keydown", function(e) {
      console.log(e.keyCode);
      switch(e.keyCode) {
        case 37:  //left
          bomber1X--;
        break;
        case 39:  //right
          bomber1X++;
        break;
        case 38:  //top
          bomber1Y--;
        break;
        case 40:  //down
          bomber1Y++;
        break;
      }
      drawMap();
    });
  }


  // Add Event Listener to detect when page has fully loaded.
  isometric.addEventListener('load', init, false);

})(this);




//
// var mapEngine = {};   // create the map object
//
// mapEngine.canvas = document.getElementById('canvas');   // handle canvas element
// mapEngine.handle = mapEngine.canvas.getContext('2d');   // handle canvas' drawing functions
