import Board from './Board';
import Pawn from './figures/Pawn';
import Rook from './figures/Rook';
class Game {

	constructor(){
		this.board = new Board();
		this.defaultFiguresState = [
      {x: 0, y: 1, type: 'Pawn', color: 'white'},
      {x: 7, y: 0, type: 'Pawn', color: 'white'},
      {x: 1, y: 3, type: 'Pawn', color: 'white'},
      {x: 3, y: 3, type: 'Pawn', color: 'white'},
      {x: 2, y: 3, type: 'Pawn', color: 'black'},
      {x: 3, y: 4, type: 'Pawn', color: 'black'},
      {x: 1, y: 5, type: 'Pawn', color: 'white'},
      {x: 4, y: 1, type: 'Pawn', color: 'white'},
      {x: 5, y: 1, type: 'Pawn', color: 'white'},
      {x: 6, y: 1, type: 'Pawn', color: 'white'},
      {x: 7, y: 1, type: 'Pawn', color: 'white'},
      {x: 5, y: 3, type: 'Rook', color: 'white'},
    ]
	}

	start(){
		this.board._renderBoard();
		this._setDefaultState();
	}

	_setDefaultState(){
	  this.defaultFiguresState.forEach(initialFigure => {
      this.board.cells.forEach(row => {
        row.forEach(cell => {
          if(cell.x === initialFigure.x && cell.y === initialFigure.y){
            cell.setFigure(this._getInitialFigure(initialFigure))
          }
        })
      });
    });
  }

  _getInitialFigure(initialFigure){
	  if(initialFigure.type === 'Pawn'){
	    return new Pawn(initialFigure.color, initialFigure.x, initialFigure.y, initialFigure.id)
    } else if (initialFigure.type === 'Rook') {
      return new Rook(initialFigure.color, initialFigure.x, initialFigure.y, initialFigure.id)
    }
  }

  turnEnd(){
	  this.board.cells.forEach(row => {
	    row.forEach(cell => {
	      cell.removeAvailable();
      })
    })
  }

}

const game = new Game();

export default game;
