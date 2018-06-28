
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
      return '-263px -116px';
    } else {
      return '-263px -19px';
    }
  }

  searchNextAvailablePosition(cells){
    console.log(78);
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
    console.log(718);
    if(this.color === 'white'){
      // let arr = [cells[this.y + 2][this.x], cells[this.y + 3][this.x]];
      // for(let i = 1; i< 7; i++) {
      //   arr.push(cells[this.y + i][this.x]);
      // }
     // console.log("arr", arr);
      console.log(12, cells);
      return cells[this.y + 2][this.x]
    } else {
      return cells[this.y - 2][this.x]
    }
  }

  toBeat(cells){
    console.log(578);
    const toBeatArr = [];

    if(this.color === 'white'){
      toBeatArr.push(cells[this.y + 2][this.x + 1]);
      toBeatArr.push(cells[this.y + 2][this.x - 1]);
    } else {
      toBeatArr.push(cells[this.y - 1][this.x + 1]);
      toBeatArr.push(cells[this.y - 1][this.x - 1]);
    }

    return toBeatArr
  }

  move(cell){
    console.log(cell.x, cell.y)
    console.log(cell.x, cell.y)
    this.x = cell.x;
    this.y = cell.y;
    this.element.style.left = cell.x * 70 + 'px';
    this.element.style.top = cell.y * 70 + 'px';
  }

}
