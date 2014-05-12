var RENDERER = (function () {
  var RENDERER = {};

  var render_cells = function(cells,cellsprites){
    for(var x = 0; x < cells.length; x++){
      for(var y = 0; y < cells[x].length; y++){
        cellsprites[x][y].alpha = cells[x][y].color;
      }
    }
  }

  var textureFromPixelArray = function(gl, dataTypedArray, type, width, height) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, type, width, height, 0, type, gl.UNSIGNED_BYTE, dataTypedArray);
    // Other texture setup here, like filter modes and mipmap generation
    return texture;
  }

  RENDERER.init = function(simulationState){

    var stage = new PIXI.Stage(0xD7D7E0);
    var renderer = PIXI.autoDetectRenderer();
    var view_container = new PIXI.DisplayObjectContainer();
    var celltexture = new PIXI.Texture.fromImage("./cell.png");
    var batch = new PIXI.SpriteBatch(celltexture);

    view_container.addChild(batch);
    view_container.scale.x = 2;
    view_container.scale.y = 2;

    stage.addChild(view_container);
    var cellsprites = [];
    var currcells = simulationState.cells;
    for(var x = 0; x < currcells.length; x++){
      cellsprites[x] = [];
      for(var y = 0; y < currcells[x].length; y++){
        var sprite = new PIXI.Sprite(celltexture);
        sprite.x = x;
        sprite.y = y;

        cellsprites[x][y] = sprite;
        batch.addChild(sprite);
      }
    }

    document.body.appendChild(renderer.view);
    requestAnimFrame( animate );

    function animate() {

      render_cells(simulationState.cells, cellsprites);

      renderer.render(stage);
      requestAnimFrame( animate );

    }
  }

  return RENDERER;
}());




