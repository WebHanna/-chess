

export default class Officer {

  constructor(color, x, y){
    this.type = 'Officer';
    this.color = color;
    this.x = x;
    this.y = y;
    this.nextAvailableCells = null;
    this.element = null;
    this.position = this.getPosition();
  }

  getPosition(){
    if(this.color === 'white'){
      return '-372px -116px';
    } else {
      return '-372px -17px';
    }
  }

  searchNextAvailablePosition(cells){
    this.nextAvailableCells = this._findAll(cells);
  }

  _findAll(cells){
    const available = [];

    for (let r = 0; r < cells.length - this.y; r++){ //to right bottom

      const cell = cells[this.y + r][this.x + r];

      if(cell && cell.x !== this.x && cell.y !== this.y){
        if(cell && cell.isEmpty()){
          available.push(cell)
        }

        if(cell && !cell.isEmpty()){
          if(cell.figure.color !== this.color){
            available.push(cell);
          }
          break;
        }
      }
    }

    for (let r = 0; r < cells.length - this.y; r++){ //to left bottom

      const cell = cells[this.y + r][this.x - r];

      if(cell && cell.x !== this.x && cell.y !== this.y){
        if(cell && cell.isEmpty()){
          available.push(cell)
        }

        if(cell && !cell.isEmpty()){
          if(cell.figure.color !== this.color){
            available.push(cell);
          }
          break;
        }
      }
    }

    let xRightToTop = 1;
    for (let r = this.y - 1; r >= 0; r--){ //to right top

      const cell = cells[r][this.x + xRightToTop];
      xRightToTop++;
      if(cell && cell.x !== this.x && cell.y !== this.y){
        if(cell && cell.isEmpty()){
          available.push(cell)
        }

        if(cell && !cell.isEmpty()){
          if(cell.figure.color !== this.color){
            available.push(cell);
          }
          break;
        }
      }
    }

    let xLeftToTop = 1;
    for (let r = this.y -1; r >= 0; r--){ //to left top

      const cell = cells[r][this.x - xLeftToTop];
      xLeftToTop++;

      if(cell && cell.x !== this.x && cell.y !== this.y){
        if(cell && cell.isEmpty()){
          available.push(cell)
        }

        if(cell && !cell.isEmpty()){
          if(cell.figure.color !== this.color){
            available.push(cell);
          }
          break;
        }
      }
    }

    return available;
  }

}
