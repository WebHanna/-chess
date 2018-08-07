

export default class Rook {

  constructor(color, x, y, id){
    this.id = id;
    this.type = 'Rook';
    this.color = color;
    this.x = x;
    this.y = y;
    this.nextAvailableCells = null;
    this.element = null;
    this.position = this._getPosition();
  }

  _getPosition(){
    if(this.color === 'white'){
      return '-263px -116px';
    } else {
      return '-263px -19px';
    }
  }

  searchNextAvailablePosition(cells){
    this.nextAvailableCells = this._findAll(cells);
  }

  _findAll(cells){
    const xArr = [],
          yArr = [];

    if(cells[this.y]){
      cells[this.y].forEach(item => {
        if(item.x !== this.x){
          xArr.push(item);
        }
      });
    }

    cells.forEach(row => {
      row.forEach(item => {
        if(item.y !== this.y && this.x === item.x){
          yArr.push(item);
        }
      })
    });

    return this._getAvailableOnly(xArr, yArr);
  }

  _getAvailableOnly(xArr, yArr) {
    const available = [];

    for (let i=this.x; i < xArr.length; i++){ //to right
      if(xArr[i]){
        if(xArr[i].x > this.x && xArr[i].isEmpty()){
          available.push(xArr[i]);
        }
        if (xArr[i].x > this.x && !xArr[i].isEmpty()){
          if(xArr[i].figure.color !== this.color){
            available.push(xArr[i]);
          }
          break;
        }
      } else {
        break;
      }
    }

    for (let i=this.x - 1; i >= 0; i--){ //to left

      if(xArr[i]){
        if(xArr[i].x < this.x && xArr[i].isEmpty()){
          available.push(xArr[i]);
        }
        if (xArr[i].x < this.x && !xArr[i].isEmpty()){
          if(xArr[i].figure.color !== this.color){
            available.push(xArr[i]);
          }
          break;
        }
      } else {
        break;
      }

    }

    for (let i=this.y; i >= 0; i--){ //to top
      if(yArr[i]){
        if(yArr[i].y < this.y && yArr[i].isEmpty()){
          available.push(yArr[i]);
        }
        if (yArr[i].y < this.y && !yArr[i].isEmpty()){
          if(yArr[i].figure.color !== this.color){
            available.push(yArr[i]);
          }
          break;
        }
      }
    }

    for (let i=this.y; i < yArr.length; i++){ //to bottom
      if(yArr[i]){
        if(yArr[i].y > this.y && yArr[i].isEmpty()){
          available.push(yArr[i]);
        }

        if (yArr[i].y > this.y && !yArr[i].isEmpty()){

          if(yArr[i].figure.color !== this.color){
            available.push(yArr[i]);
          }
          break;
        }
      }
    }

    return available;
  }
}
