export default class Pawn {

  constructor(color, x, y, id){
    this.id = id;
    this.type = 'Pawn';
    this.color = color;
    this.x = x;
    this.y = y;
    this.firstStep = true;
    this.nextAvailableCells = null;
    this.element = null;
    this.position = this._getPosition()
  }

  _getPosition(){
    if(this.color === 'white'){
      return '-595px -116px';
    } else {
      return '-595px -19px';
    }
  }

  searchNextAvailablePosition(cells){
    const forwardCell = this._forwardCell(cells),
      otherCells = this._toBeat(cells),
      availableCells = [];

    if(forwardCell.isEmpty()){
      availableCells.push(forwardCell);

      if(this.firstStep) {
        const setFirstStep = this._setFirstStep(cells);
        availableCells.push(setFirstStep);
      }
    }

    otherCells.forEach(cell => {
      if(cell){
        if(!cell.isEmpty() && cell.figure.color !== this.color){
          availableCells.push(cell);
        }
      }
    });

    this.nextAvailableCells = availableCells;
  }

  _forwardCell(cells){
    if(this.color === 'white'){
      return cells[this.y + 1][this.x]
    } else {
      return cells[this.y - 1][this.x]
    }
  }

  _setFirstStep(cells){
    if(this.color === 'white'){
      return cells[this.y + 2][this.x]
    } else {
      return cells[this.y - 2][this.x]
    }
  }

  _toBeat(cells){
    const toBeatArr = [];

    if(this.color === 'white'){
      toBeatArr.push(cells[this.y + 1][this.x + 1]);
      toBeatArr.push(cells[this.y + 1][this.x - 1]);
    } else {
      toBeatArr.push(cells[this.y - 1][this.x + 1]);
      toBeatArr.push(cells[this.y - 1][this.x - 1]);
    }

    return toBeatArr
  }

  move(cell){
    this.firstStep = false;
    this.x = parseInt(cell.x);
    this.y = parseInt(cell.y);
    this.element.style.left = cell.x * 70 + 'px';
    this.element.style.top = cell.y * 70 + 'px';

    this.element.dataset.x = cell.x;
    this.element.dataset.y = cell.y;
  }

}
