import game from './Game';
import _ from 'lodash';

class FiguresManager {

  constructor(){
    this.beatedBlackFigures = [];
    this.beatedWhiteFigures = [];
    this.beatBlackBoard = document.getElementById('beatBlack');
    this.blackAvailable = false;
    this.beatWhiteBoard = document.getElementById('beatWhite');
    this.whiteAvailable = false;
  }

  chooseBlack(){
    this.beatBlackBoard.classList.add('available');
    this.blackAvailable = true;
  }

  chooseWhite(){
    this.beatWhiteBoard.classList.add('available');
    this.whiteAvailable = true;
  }

  removeFigureFromCell(y, x){
    game.board.cells[y][x].figure = null;
  }

  removeFigureFromBoard(y, x, currentFigureCell){

    this.checkIfKing(currentFigureCell);

    currentFigureCell.figure.element.remove();

    if(currentFigureCell.figure.color === 'white'){
      this.renderFigureOnBeatBoard(currentFigureCell.figure);
      this.beatedWhiteFigures.push(currentFigureCell.figure);
    } else {
      this.renderFigureOnBeatBoard(currentFigureCell.figure);
      this.beatedBlackFigures.push(currentFigureCell.figure);
    }
    this.removeFigureFromCell(y, x);
  }

  checkIfKing(currentFigureCell){
    if(currentFigureCell.figure.type === 'King'){
      if(currentFigureCell.figure.color === 'white'){
        alert('Black win');
        location.reload()
      } else {
        alert('White win');
        location.reload()
      }
    }
  }

  beatFigure(currentFigureCell){
    const currentFigure = _.cloneDeep(game.selectedFigure);

    this.removeFigureFromBoard(currentFigure.y, currentFigure.x, currentFigureCell);

    this.moveFigure(currentFigureCell.figure, currentFigure);
    currentFigureCell.figure = _.cloneDeep(currentFigure);

    game.selectedFigure = null;
  }

  moveFigure(cell, figure){
    figure.x = parseInt(cell.x);
    figure.y = parseInt(cell.y);
    figure.element.style.left = cell.x * 70 + 'px';
    figure.element.style.top = cell.y * 70 + 'px';

    figure.element.dataset.x = cell.x;
    figure.element.dataset.y = cell.y;

    if(figure.isFirstStep)
      figure.isFirstStep = false;
  }


  findFigureByCoords(y, x){

    let currentCell;

    game.board.cells.forEach(rows => {
      rows.forEach(cell => {
        if(cell.figure){
          if(cell.figure.y == y && cell.figure.x == x){
            currentCell =  cell;
          }
        }
      });
    });

    return currentCell;
  }

  findCellByCoords(y, x){

    let currentCell;

    game.board.cells.forEach(rows => {
      rows.forEach(cell => {
        if(cell.y == y && cell.x == x){
          currentCell = cell;
        }
      });
    });

    return currentCell;
  }

  renderFigureOnBeatBoard (figure){
    const figureDiv = document.createElement('div'),
          isWhite = figure.color === 'white',
          boardLength = isWhite ? this.beatedWhiteFigures.length : this.beatedBlackFigures.length ;

    figureDiv.className = 'figure';
    figureDiv.style.backgroundPosition = figure.position;
    figureDiv.style.left = boardLength > 7 ? (boardLength - 8) * 70 + 'px' : boardLength * 70 + 'px';
    figureDiv.style.top = boardLength > 7 ? 70 + 'px' : 0 + 'px';

    figureDiv.addEventListener('click', (e) => {

      if(isWhite){
        if(!this.whiteAvailable) return;
      } else {
        if(!this.blackAvailable) return;
      }

      const { x, y } = game.board.cellToSwitch;

      game.board.cellToSwitch.figure.element.remove();

      game.board.renderOnBoard(figure, x, y);

      figureDiv.remove();

      game.board.unfreezeClicks();

      if(isWhite){
        this.beatWhiteBoard.classList.remove('available');
      } else {
        this.beatBlackBoard.classList.remove('available');
      }

    });

    if(isWhite){
      this.beatWhiteBoard.appendChild(figureDiv);
    } else {
      this.beatBlackBoard.appendChild(figureDiv);
    }
  }

}

const figuresManager = new FiguresManager();

export default figuresManager;
