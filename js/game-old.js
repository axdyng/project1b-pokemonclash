// Create scope to nest all variables in
(function(gameEngine) {

  // Two Dimensional Array storing our world map layout. Each number represents a tile.
  var map = [
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
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //bottom of canvas
  ];

  var tileImages = [];
  var bomber1X = 1,
    bomber1Y = 1,
    bomber2X = 23,
    bomber2Y = 13;
    bombs = [];

  function loadImg() {

    // Images to be loaded and used.
    // Tutorial Note: As water is loaded first it will be represented by a 0 on the map and land will be a 1.
    var imagesArray = ["./images/sand.png", "./images/metalwall.png", "./images/bomber1.png", "./images/bomber2.png", ".imaages/bomb.png"],
      totalImgsLoaded = 0;

    for (var i = 0; i < imagesArray.length; i++) {
      tileImages[i] = new Image();
      tileImages[i].src = imagesArray[i];
      tileImages[i].onload = function() {
        // Once the image is loaded increment the loaded graphics count and check if all images are ready.
        totalImgsLoaded++;
        if (totalImgsLoaded === imagesArray.length) {
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
        //draw bomber 1, j= column, i= row
        if (bomber1X === j && bomber1Y === i) {
          ctx.drawImage(tileImages[2], (j * tileW) + mapX, (i * tileH) + mapY);
        } else if (bomber2X == j && bomber2Y == i) {
          ctx.drawImage(tileImages[3], (j * tileW) + mapX, (i * tileH) + mapY);
        }
      }
    }
  }

  function checkCollision() {

    function checkP1() {
      if (bomber1X % 2 === 0 && bomber1Y % 2 === 0 ||
        bomber1X === 0 || bomber1X == 24 || bomber1Y === 0 || bomber1Y == 14) {
        return true;
      } else {
        return false;
      }
    }

    function checkP2() {
      if (bomber2X % 2 === 0 && bomber2Y % 2 === 0 ||
        bomber2X === 0 || bomber2X == 24 || bomber2Y === 0 || bomber2Y == 14) {
        return true;
      } else {
        return false;
      }
    }

    if(checkP1() === true || checkP2() === true) {
      return true;
    }
    else {
      return false;
    }

  }

  function init() {
    // Remove Event Listener and load images.
    gameEngine.removeEventListener('load', init);
    loadImg();
    //add p1keys Listener
    gameEngine.addEventListener("keydown", function(e) {

      switch (e.keyCode) {
        //player 1 keys
        case 65: //a
          bomber1X--;
          if (checkCollision() === true) {
            bomber1X++;
          }
          break;
        case 68: //d
          bomber1X++;
          if (checkCollision() === true) {
            bomber1X--;
          }
          break;
        case 87: //w
          bomber1Y--;
          if (checkCollision() === true) {
            bomber1Y++;
          }
          break;
        case 83: //s
          bomber1Y++;
          if (checkCollision() === true) {
            bomber1Y--;
          }
          break;
          //player 2 keys
        case 37: //left
          bomber2X--;
          if (checkCollision() === true) {
            bomber2X++;
          }
          break;
        case 39: //right
          bomber2X++;
          if (checkCollision() === true) {
            bomber2X--;
          }
          break;
        case 38: //up
          bomber2Y--;
          if (checkCollision() === true) {
            bomber2Y++;
          }
          break;
        case 40: //down
          bomber2Y++;
          if (checkCollision() === true) {
            bomber2Y--;
          }
          break;
        case 70: //p1 place bomber1X

          break;
      }
      //console.log(bomber1X, bomber1Y);
      drawMap();
    });



  }


  // Add Event Listener to detect when page has fully loaded.
  gameEngine.addEventListener('load', init, false);

})(this);




//
// var mapEngine = {};   // create the map object
//
// mapEngine.canvas = document.getElementById('canvas');   // handle canvas element
// mapEngine.handle = mapEngine.canvas.getContext('2d');   // handle canvas' drawing functions
