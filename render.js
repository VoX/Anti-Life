var RENDERER = (function () {
  var RENDERER = {};

  var render_cells = function(cells,graphics){
    graphics.clear();
    var fillcount = 0;
    graphics.beginFill(0x6B6B70);

    for(var x = 0; x < cells.length; x++){
      for(var y = 0; y < cells[x].length; y++){
        if(cells[x][y].color === 1){
          fillcount++;
          if(fillcount > 500){
            fillcount = 0;
            graphics.endFill();
            graphics.beginFill(0x6B6B70);
          }
          graphics.drawRect(x, y, 1, 1);
        }
      }
    }
    graphics.endFill();
  }





  RENDERER.init = function(simulationState){

    var stage = new PIXI.Stage(0xD7D7E0);
    var renderer = PIXI.autoDetectRenderer();
    var viewContainer = new PIXI.DisplayObjectContainer();
    var cellGraphics = new PIXI.Graphics();
    viewContainer.addChild(cellGraphics);
    viewContainer.scale.x = 2;
    viewContainer.scale.y = 2;

    stage.addChild(viewContainer);

    document.body.appendChild(renderer.view);
    requestAnimFrame( animate );


    function animate() {

      render_cells(simulationState.cells, cellGraphics);

      renderer.render(stage);
      requestAnimFrame( animate );

    }
  }

  return RENDERER;
}());




