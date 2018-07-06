export default class Rook {

  constructor(color, x, y, id){
    this.id = id;
    this.type = 'Rook';
    this.color = color;
    this.x = x;
    this.y = y;
    this.nextAvailableCells = null;
    this.element = null;
    this.position = this._getPosition()
  }

  _getPosition(){
    if(this.color === 'white'){
      return '-263px -315px';
    } else {
      return '-263px -418px';
    }
  }

  searchNextAvailablePosition(cells){

    const forwardCell = this._forwardCell(cells),

      availableCells = [];

    this.nextAvailableCells = availableCells;
  }


  _forwardCell(cells){
  let arr = [];
  let i = this.y;
  let j = this.x;
  let first = true;
  let two = true;

  while(j > 0) {
    let prev = j - 1;

    if(j === 0) {
      // return ;
    }

   cells.forEach(cell => {
    cell.forEach(item => {
      if (item.y === i && item.x === prev && first)  {
          if(item.figure === null) {
            arr.push(item);
          } else if (item.figure != null) {
            console.log(758, first);
            first = false;
            arr.push(item);
          }
        }
      })
    })
    j--;
  }


  while(j < 8) {
    let next = j + 1;

    // if(j === 0) {
    //   // return ;
    // }

// console.log(75864);
   cells.forEach(cell => {
    cell.forEach(item => {
      if (item.y === i && item.x === next && two)  {
          if(item.figure === null) {
            arr.push(item);
          } else if (item.figure != null) {
            console.log(758, first);
            two = false;
            arr.push(item);
          }
        }
      })
    })
    j++;
  }

  console.log(125, arr);
    return arr;
  }



  getElem(prev, elen, index) {
    console.log("prev", prev);
    console.log("elen", elen);
    console.log("index", index);
  }

  move(cell){

    this.x = parseInt(cell.x);
    this.y = parseInt(cell.y);
    this.element.style.left = cell.x * 70 + 'px';
    this.element.style.top = cell.y * 70 + 'px';

    this.element.dataset.x = cell.x;
    this.element.dataset.y = cell.y;
  }

}
