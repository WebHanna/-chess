
export default class Horse {

  constructor(color, x, y, id){
    this.id = id;
    this.type = 'Horse';
    this.color = color;
    this.x = x;
    this.y = y;
    this.nextAvailableCells = [];
    this.element = null;
    this.position = this.getPosition();
    this.isFirstStep = true;
  }

  getPosition(){
    if(this.color === 'white'){
      return '-484px -116px';
    } else {
      return '-484px -22px';
    }
  }

  searchNextAvailablePosition(cells){
    this.nextAvailableCells = [];
    this.nextAvailableCells = this.nextAvailableCells.concat(this.findAll(cells));
  }

  findAll(cells){
    const horseGCells = [],
          firstCell = cells[this.y + 2] && cells[this.y + 2][this.x + 1],
          secondCell = cells[this.y + 2] && cells[this.y + 2][this.x - 1],
          thirdCell = cells[this.y - 2] && cells[this.y - 2][this.x + 1],
          fourthCell = cells[this.y - 2] && cells[this.y - 2][this.x - 1],
          fifthCell = cells[this.y + 1] && cells[this.y + 1][this.x + 2],
          sixthCell = cells[this.y + 1] && cells[this.y + 1][this.x - 2],
          seventhCell = cells[this.y - 1] && cells[this.y - 1][this.x + 2],
          eightCell = cells[this.y - 1] && cells[this.y - 1][this.x - 2];

    if(firstCell){
      if(!firstCell.isEmpty()){
        this.toBeat(firstCell)
      } else {
        horseGCells.push(firstCell);
      }
    }

    if(secondCell){
      if(!secondCell.isEmpty()){
        this.toBeat(secondCell)
      } else {
        horseGCells.push(secondCell);
      }
    }

    if(thirdCell){
      if(!thirdCell.isEmpty()){
        this.toBeat(thirdCell)
      } else {
        horseGCells.push(thirdCell);
      }
    }

    if(fourthCell){
      if(!fourthCell.isEmpty()){
        this.toBeat(fourthCell)
      } else {
        horseGCells.push(fourthCell);
      }
    }

    if(fifthCell){
      if(!fifthCell.isEmpty()){
        this.toBeat(fifthCell)
      } else {
        horseGCells.push(fifthCell);
      }
    }

    if(sixthCell){
      if(!sixthCell.isEmpty()){
        this.toBeat(sixthCell)
      } else {
        horseGCells.push(sixthCell);
      }
    }

    if(seventhCell){
      if(!seventhCell.isEmpty()){
        this.toBeat(seventhCell)
      } else {
        horseGCells.push(seventhCell);
      }
    }

    if(eightCell){
      if(!eightCell.isEmpty()){
        this.toBeat(eightCell)
      } else {
        horseGCells.push(eightCell);
      }
    }

    return horseGCells;
  }

  toBeat(cell){
    if(cell.figure.color !== this.color){
      this.nextAvailableCells.push(cell)
    }
  }
}
