var LIFE = (function () {
  var LIFE = {};


  var is_neighbor_alive = function(cell){
    if(cell){
      return cell.color > 0 ? 1 : 0;
    }
    return 0;
  }

  var step_cell = function(cell, cells){

    var neighbors = 0;

    neighbors += is_neighbor_alive(cell.neighbors.up);
    neighbors += is_neighbor_alive(cell.neighbors.down);
    neighbors += is_neighbor_alive(cell.neighbors.left);
    neighbors += is_neighbor_alive(cell.neighbors.right);
    neighbors += is_neighbor_alive(cell.neighbors.upperight);
    neighbors += is_neighbor_alive(cell.neighbors.upperleft);
    neighbors += is_neighbor_alive(cell.neighbors.lowerright);
    neighbors += is_neighbor_alive(cell.neighbors.lowerleft);

    if(neighbors < 2){
      return 0;
    }
    if(neighbors > 3 && cell.color > 0){
      return 0;
    }
    if(neighbors === 3 && cell.color === 0){
      return 1;
    }

    return cell.color;

  }


  var test_existance = function(x,y,cells){
    if(cells[x] && cells[x][y]) return true;
    return false;
  }


  var init_cell = function(cell, cells){

    var neighbors = {};

    neighbors.up = test_existance(cell.x, cell.y-1, cells) ? cells[cell.x][cell.y-1] : null;
    neighbors.down = test_existance(cell.x, cell.y+1, cells) ? cells[cell.x][cell.y+1] : null;
    neighbors.left = test_existance(cell.x+1, cell.y, cells) ? cells[cell.x+1][cell.y] : null;
    neighbors.right = test_existance(cell.x-1, cell.y, cells) ? cells[cell.x-1][cell.y] : null;
    neighbors.upperight = test_existance(cell.x+1, cell.y+1, cells) ? cells[cell.x+1][cell.y+1] : null;
    neighbors.upperleft = test_existance(cell.x+1, cell.y-1, cells) ? cells[cell.x+1][cell.y-1] : null;
    neighbors.lowerright = test_existance(cell.x-1, cell.y+1, cells) ? cells[cell.x-1][cell.y+1] : null;
    neighbors.lowerleft = test_existance(cell.x-1, cell.y-1, cells) ? cells[cell.x-1][cell.y-1] : null;

    cell.neighbors = neighbors;
    return cell;
  };

  LIFE.init = function(height, width, speed){

    var cells1 = [];
    var cells2 = [];
    var currcells = cells2;
    var nextcells = cells1;
    for(var x = 0; x < height; x++){
      cells1[x] = [];
      cells2[x] = [];
      for(var y = 0; y < width; y++){
        cells1[x][y] = {color : Math.round(Math.random()), x:x, y:y
                       };
        cells2[x][y] = {color : 0, x:x, y:y
                       };
      }
    }

    for(var x = 0; x < height; x++){
      for(var y = 0; y < width; y++){
        cells1[x][y] = init_cell(cells1[x][y], cells1);
        cells2[x][y] = init_cell(cells2[x][y], cells2);
      }
    }

    var step = function() {

      if(currcells === cells1){
        currcells = cells2;
        nextcells = cells1;
      }
      else{
        currcells = cells1;
        nextcells = cells2;
      }
      for(var x = 0; x < currcells.length; x++){
        for(var y = 0; y < currcells[x].length; y++){
          nextcells[x][y].color = step_cell(currcells[x][y], currcells);
        }
      }



    };
    setInterval(step, speed);


    return {cells:nextcells};

  };

  return LIFE;
}());
