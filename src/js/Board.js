import Cell from './BoardCell';
import figuresManager from './FiguresManager';
import game from './Game';

export default class Board {

	constructor(){
		this.cells = [];
		this.selectedFigure = null;
		this.element = null;
		this.isBoardBlocked = false;
		this.cellToSwitch = false;
	}

	freezeClicks(){
    this.isBoardBlocked = true;
  }

  unfreezeClicks(){
    this.isBoardBlocked = false;
    this.cellToSwitch = false;
  }

  checkPawnsToChange(){

    let pawnToChange;

    this.cells.forEach(row => {
      row.forEach(cell => {
        if(cell.figure && cell.figure.type === 'Pawn'){
          if(cell.figure.color === 'white' && cell.y === 7){
            pawnToChange = cell;
          } else if (cell.figure.color === 'black' && cell.y === 0){
            pawnToChange = cell;
          }
        }
      })
    });

    if(pawnToChange){
      this.freezeClicks();

      this.cellToSwitch = pawnToChange;

      if(pawnToChange.figure.color === 'white' && figuresManager.beatWhiteBoard.length){
        figuresManager.chooseWhite();
      } else if (figuresManager.beatBlackBoard.length){
        figuresManager.chooseBlack();
      }

    }
  }

	renderBoard(){

		const board = document.getElementById('board');

		this.getCells();

		this.cells.forEach(row => {
      row.forEach(cell => {
        board.appendChild(cell.element);
      })
		});

    this.element = board;
	}

	renderOnBoard(figure, x, y){
	  this.cells[y][x].setFigure(game.getInitialFigure({x,y, type: figure.type, color: figure.color, id: figure.id}));
  }

	getCells(){
		const white = 'white',
			  black = 'black';

		let arr = [];

		for(let i = 0; i < 8; i++){
			if(i % 2 === 0){
        arr.push(this.getRow(i, white, black))
			} else {
        arr.push(this.getRow(i, black, white))
			}
		}

		this.cells = arr;
	}

	getRow(y, firstColor, secondColor){
		const arr = [];

		for(let i = 0; i < 8; i++){

			if(i % 2 === 0){
        arr.push(new Cell(firstColor, i, y))
			} else {
        arr.push(new Cell(secondColor, i, y))
			}
		}
		return arr;
	}
}
