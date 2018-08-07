

export default class King {

  constructor(color, x, y){
    this.type = 'King';
    this.color = color;
    this.x = x;
    this.y = y;
    this.nextAvailableCells = null;
    this.element = null;
    this.position = this._getPosition();
  }

  _getPosition(){
    if(this.color === 'white'){
      return '-41px -116px';
    } else {
      return '-41px -16px';
    }
  }

  searchNextAvailablePosition(cells, withoutOpponent){
    const rookCells = this._findAllRook(cells),
      opponentAvailablePositions = !withoutOpponent && this.findOpponentAvailablePositions(cells),
      officerCells = this._findAll(cells);

    const availableArr = rookCells.concat(officerCells);

    if(!withoutOpponent){
      const delCells = [];
      const allAvailableSells = [];

      availableArr.forEach(cell => {
        opponentAvailablePositions.forEach(opponentCell => {
          if(cell.x === opponentCell.x && cell.y === opponentCell.y){
            delCells.push(cell);
          }
        })
      });

      availableArr.forEach(cell => {
        let choosenCell = delCells.find(cell2 => {
          return cell.x === cell2.x && cell.y === cell2.y;
        });

        if(!choosenCell)
          allAvailableSells.push(cell);
      });

      this.nextAvailableCells = allAvailableSells;
    } else {
      this.nextAvailableCells = availableArr;
    }

  }

  _findAll(cells){
    const available = [];

    for (let r = 0; r < cells.length - this.y; r++){ //to right bottom

      const cell = cells[this.y + r][this.x + r];

      if(cell && cell.x !== this.x && cell.y !== this.y){
        if(cell && cell.isEmpty()){
          available.push(cell);
          break;
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
          available.push(cell);
          break;
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
          available.push(cell);
          break;
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
          available.push(cell);
          break;
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

  _findAllRook(cells){
    const xArr = [],
      yArr = [];

    cells[this.y].forEach(item => {
      if(item.x !== this.x){
        xArr.push(item);
      }
    });

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

    for (let i=this.x; i < xArr.length; i++){ //to right bottom
      if(xArr[i]){
        if(xArr[i].x > this.x && xArr[i].isEmpty()){
          available.push(xArr[i]);
          break;
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

    for (let i=this.x -1; i >= 0; i--){ //to left
      if(xArr[i]){
        if(xArr[i].x < this.x && xArr[i].isEmpty()){
          available.push(xArr[i]);
          break;
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
          break;
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
          break;
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

  findOpponentAvailablePositions(cells){
    let opponentAvailablePositions = [];

    cells.forEach(row => {
      row.forEach(cell => {
        if(cell.figure && cell.figure.color !== this.color){
          if(cell.figure.type !== 'Pawn'){
            cell.figure.searchNextAvailablePosition(cells, true); // true is for King only

            cell.figure.nextAvailableCells.forEach(item => {

              if(item) {
                let existItem = opponentAvailablePositions.find(item2 => item.x === item2.x && item.y === item2.y);

                if(!existItem) opponentAvailablePositions.push(item);
              }

            });

          } else if (cell.figure.type === 'Pawn') {

            cell.figure.toBeat(cells).forEach(item => {

              if(item){
                let existItem = opponentAvailablePositions.find(item2 => item.x === item2.x && item.y === item2.y);

                if(!existItem) opponentAvailablePositions.push(item);
              }

            });
          }
        }
      });
    });

    return opponentAvailablePositions;
  }
}
