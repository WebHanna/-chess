
export default class Pawn {

  constructor(color, x, y, id){
    this.id = id;
    this.type = 'Pawn';
    this.color = color;
    this.x = x;
    this.y = y;
    this.nextAvailableCells = null;
    this.element = null;
    this.position = this.getPosition()
  }

  getPosition(){
    if(this.color === 'white'){
      return '-595px -116px';
    } else {
      return '-595px -19px';
    }
  }

  searchNextAvailablePosition(cells){
    const forwardCell = this.forwardCell(cells),
          otherCells = this.toBeat(cells),
          availableCells = [];

    if(forwardCell.isEmpty()){
      availableCells.push(forwardCell);
    }

    otherCells.forEach(cell => {
      if(!cell.isEmpty()){
        availableCells.push(cell);
      }
    });

    this.nextAvailableCells = availableCells;
  }

  forwardCell(cells){
    if(this.color === 'white'){
      return cells[this.y + 1][this.x]
    } else {
      return cells[this.y - 1][this.x]
    }
  }

  toBeat(cells){
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
    console.log(cell.x, cell.y)
    this.x = cell.x;
    this.y = cell.y;
    this.element.style.left = cell.x * 70 + 'px';
    this.element.style.top = cell.y * 70 + 'px';
  }

}
