
export default class Horse {

  constructor(color, x, y){
    this.type = 'Pawn';
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
		console.log(125);
    this.nextAvailableCells = [];
    this.nextAvailableCells = this.nextAvailableCells.concat(this._findAll(cells));
  }

  _findAll(cells){
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
        this._toBeat(firstCell)
      } else {
        horseGCells.push(firstCell);
      }
    }

    if(secondCell){
      if(!secondCell.isEmpty()){
        this._toBeat(secondCell)
      } else {
        horseGCells.push(secondCell);
      }
    }

    if(thirdCell){
      if(!thirdCell.isEmpty()){
        this._toBeat(thirdCell)
      } else {
        horseGCells.push(thirdCell);
      }
    }

    if(fourthCell){
      if(!fourthCell.isEmpty()){
        this._toBeat(fourthCell)
      } else {
        horseGCells.push(fourthCell);
      }
    }

    if(fifthCell){
      if(!fifthCell.isEmpty()){
        this._toBeat(fifthCell)
      } else {
        horseGCells.push(fifthCell);
      }
    }

    if(sixthCell){
      if(!sixthCell.isEmpty()){
        this._toBeat(sixthCell)
      } else {
        horseGCells.push(sixthCell);
      }
    }

    if(seventhCell){
      if(!seventhCell.isEmpty()){
        this._toBeat(seventhCell)
      } else {
        horseGCells.push(seventhCell);
      }
    }

    if(eightCell){
      if(!eightCell.isEmpty()){
        this._toBeat(eightCell)
      } else {
        horseGCells.push(eightCell);
      }
    }

    return horseGCells;
  }

  _toBeat(cell){
    if(cell.figure.color !== this.color){
      this.nextAvailableCells.push(cell)
    }
  }
}
