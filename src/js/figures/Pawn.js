
export default class Pawn {

  constructor(color, x, y){
    this.type = 'Pawn';
    this.color = color;
    this.x = x;
    this.y = y;
    this.nextAvailableCells = null;
    this.element = null;
    this.position = this.getPosition();
    this.isFirstStep = true;
  }

  getPosition(){
    if(this.color === 'white'){
      return '-595px -116px';
    } else {
      return '-595px -19px';
    }
  }

  searchNextAvailablePosition(cells){
    const forwardCells = this._forwardCell(cells),
          otherCells = this._toBeat(cells),
          availableCells = [];

    forwardCells.forEach(item => {
      if(item.isEmpty()){
        availableCells.push(item);
      }
    });

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
      return this.isFirstStep ?
        this._getFirsForwardCell(cells, this.color) :
        [cells[this.y + 1][this.x]]
    } else {
      return this.isFirstStep ?
        this._getFirsForwardCell(cells, this.color) :
        [cells[this.y - 1][this.x]]
    }
  }

  _getFirsForwardCell(cells, color){
    if(color === 'white' && cells[this.y + 1][this.x].isEmpty()) {
      return [cells[this.y + 1][this.x], cells[this.y + 2][this.x]]
    } else if (color === 'white' && !cells[this.y + 1][this.x].isEmpty()){
      return []
    } else if (color === 'black' && cells[this.y - 1][this.x].isEmpty()){
      return [cells[this.y - 1][this.x], cells[this.y - 2][this.x]]
    } else if (color === 'black' && cells[this.y - 1][this.x].isEmpty()){
      return []
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
}
