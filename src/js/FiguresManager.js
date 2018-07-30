import game from './Game';
import king from './figures/King';
import _ from 'lodash';

class FiguresManager {

  constructor(){
		this.king = null;
    this.beatedBlackFigures = [];
    this.beatedWhiteFigures = [];
    this.beatBlackBoard = document.getElementById('beatBlack');
    this.beatWhiteBoard = document.getElementById('beatWhite');
	}

	checkMate() {
		const kingf = document.getElementById("12");
	//	console.log("king", king);
	// const currentFigureCell = figuresManager.findFigureByCoords(targetFigure.dataset.y, targetFigure.dataset.x);
// 	console.log("currentFigureCell", currentFigureCell);
// 		const kingIsAvailable = kingf.classList.contains("available");

	// 	console.log("king", king);

//	if(kingIsAvailable) {
	  console.log("king" ,king);
//	}

	// console.log("cells47", this.searchNextAvailablePosition(cells));

// console.log("kingIsAvailable", kingIsAvailable);

}

  _removeFigureFromCell(y, x){
    game.board.cells[y][x].figure = null;
  }

  removeFigureFromBoard(y, x, currentFigureCell){
    currentFigureCell.figure.element.remove();

    if(currentFigureCell.figure.color === 'white'){
      this._renderFigureOnBeatBoard(currentFigureCell.figure);
      this.beatedWhiteFigures.push(currentFigureCell.figure);
    } else {
      this._renderFigureOnBeatBoard(currentFigureCell.figure);
      this.beatedBlackFigures.push(currentFigureCell.figure);
    }
    this._removeFigureFromCell(y, x);
  }

  beatFigure(currentFigureCell){
    const currentFigure = _.cloneDeep(game.selectedFigure);

    this.removeFigureFromBoard(currentFigure.y, currentFigure.x, currentFigureCell);

    this.moveFigure(currentFigureCell.figure, currentFigure);
    currentFigureCell.figure = _.cloneDeep(currentFigure);

    game.selectedFigure = null;
    game.turnEnd();
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

  _renderFigureOnBeatBoard (figure){
    const figureDiv = document.createElement('div'),
          isWhite = figure.color === 'white',
          boardLength = isWhite ? this.beatedWhiteFigures.length : this.beatedBlackFigures.length ;

    figureDiv.className = 'figure';
    figureDiv.style.backgroundPosition = figure.position;
    figureDiv.style.left = boardLength > 7 ? (boardLength - 8) * 70 + 'px' : boardLength * 70 + 'px';
    figureDiv.style.top = boardLength > 7 ? 70 + 'px' : 0 + 'px';

    if(isWhite){
      this.beatWhiteBoard.appendChild(figureDiv);
    } else {
      this.beatBlackBoard.appendChild(figureDiv);
    }

  }

}

const figuresManager = new FiguresManager();

export default figuresManager;
