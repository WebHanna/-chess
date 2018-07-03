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

  searchNextAvailablePosition(cells){

    const forwardCell = this.forwardCell(cells),

      availableCells = [];
      console.log(71, forwardCell);
      forwardCell.forEach(cell => {
        availableCells.push(cell);
              // if(forwardCell) {
    //   console.log(55, forwardCell);
    //   availableCells.push(forwardCell);

    //     const setFirstStep = this.setFirstStep(cells);
    //     availableCells.push(setFirstStep);

    // }
       })

    // if(forwardCell) {
    //   console.log(55, forwardCell);
    //   availableCells.push(forwardCell);

    //     const setFirstStep = this.setFirstStep(cells);
    //     availableCells.push(setFirstStep);

    // }

    this.nextAvailableCells = availableCells;
  }

  forwardCell(cells){
  let arr = [];

  for(let i = 0; i < 8; i++) {
    if(this.x != i) {
      arr.push(cells[this.y][i]);
    }
  }

  for(let i = 0; i < 8; i++) {
    if(this.y != i) {
      arr.push(cells[i][this.x]);
    }
  }
    console.log("arr42", arr);
    return arr;
  }

//
  // toBeat(cells){
  //   const toBeatArr = [];

  //   if(this.color === 'white'){
  //     toBeatArr.push(cells[this.y + 1][this.x + 1]);
  //     toBeatArr.push(cells[this.y + 1][this.x - 1]);
  //   } else {
  //     toBeatArr.push(cells[this.y - 1][this.x + 1]);
  //     toBeatArr.push(cells[this.y - 1][this.x - 1]);
  //   }

  //   return toBeatArr
  // }

  move(cell){

    this.x = parseInt(cell.x);
    this.y = parseInt(cell.y);
    this.element.style.left = cell.x * 70 + 'px';
    this.element.style.top = cell.y * 70 + 'px';

    this.element.dataset.x = cell.x;
    this.element.dataset.y = cell.y;
  }

}
