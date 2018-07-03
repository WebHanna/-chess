export default class Rook {

  constructor(color, x, y, id){
    this.id = id;
    this.type = 'Rook';
    this.color = color;
    this.x = x;
    this.y = y;
    this.nextAvailableCells = null;
    this.element = null;
    this.position = this.getPosition()
  }

  getPosition(){
    if(this.color === 'white'){
      return '-263px -315px';
    } else {
      return '-263px -418px';
    }
  }

  // searchNextAvailablePositionRook(f){
  // console.log(47, f);

  // }

  searchNextAvailablePosition(cells){
    console.log("cells", cells);
    const forwardCell = this.forwardCell(cells),
      otherCells = this.toBeat(cells),
      availableCells = [];

    if(forwardCell.isEmpty()){
      availableCells.push(forwardCell);

      if(this.firstStep) {
        const setFirstStep = this.setFirstStep(cells);
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

  forwardCell(cells){
    if(this.color === 'white'){
      // for(let i = 0; i< )
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
    this.firstStep = false;
    this.x = parseInt(cell.x);
    this.y = parseInt(cell.y);
    this.element.style.left = cell.x * 70 + 'px';
    this.element.style.top = cell.y * 70 + 'px';

    this.element.dataset.x = cell.x;
    this.element.dataset.y = cell.y;
  }

}
