import Board from './Board';
import Pawn from './figures/Pawn';
import Rook from './figures/Rook';
import Horse from './figures/Horse';
import Officer from './figures/Officer';
import Queen from './figures/Queen';
import King from './figures/King';
import figuresManager from './FiguresManager';

class Game {

	constructor(){
		this.board = new Board();
		this.defaultFiguresState = [
      {x: 0, y: 0, type: 'Rook', color: 'white'},
      {x: 1, y: 0, type: 'Horse', color: 'white'},
      {x: 2, y: 0, type: 'Officer', color: 'white'},
      {x: 4, y: 0, type: 'Queen', color: 'white'},
      {x: 3, y: 0, type: 'King', color: 'white', id: 12},
      {x: 0, y: 1, type: 'Pawn', color: 'white'},
      {x: 1, y: 1, type: 'Pawn', color: 'white'},
      {x: 2, y: 1, type: 'Pawn', color: 'white'},
      {x: 3, y: 1, type: 'Pawn', color: 'white'},
      {x: 4, y: 1, type: 'Pawn', color: 'white'},
      {x: 5, y: 1, type: 'Pawn', color: 'white'},
      {x: 6, y: 1, type: 'Pawn', color: 'white'},
      {x: 7, y: 1, type: 'Pawn', color: 'white'},
      {x: 0, y: 6, type: 'Pawn', color: 'black'},
      {x: 1, y: 6, type: 'Pawn', color: 'black'},
      {x: 2, y: 6, type: 'Pawn', color: 'black'},
      {x: 3, y: 6, type: 'Pawn', color: 'black'},
      {x: 4, y: 6, type: 'Pawn', color: 'black'},
      {x: 5, y: 6, type: 'Pawn', color: 'black'},
      {x: 6, y: 6, type: 'Pawn', color: 'black'},
      {x: 7, y: 6, type: 'Pawn', color: 'black'},
      {x: 1, y: 7, type: 'Horse', color: 'black'},
      {x: 0, y: 7, type: 'Rook', color: 'black'},
      {x: 4, y: 7, type: 'Queen', color: 'black'},
    ]
	}

	start(){
		this.board.renderBoard();
		this._setDefaultState();
	}

	_setDefaultState(){
	  this.defaultFiguresState.forEach(initialFigure => {
      this.board.cells.forEach(row => {
        row.forEach(cell => {
          if(cell.x === initialFigure.x && cell.y === initialFigure.y){
            cell.setFigure(this.getInitialFigure(initialFigure))
          }
        })
      });
    });
  }

  getInitialFigure(initialFigure){
	  if(initialFigure.type === 'Pawn'){
	    return new Pawn(initialFigure.color, initialFigure.x, initialFigure.y)
    } else if(initialFigure.type === 'Rook'){
      return new Rook(initialFigure.color, initialFigure.x, initialFigure.y)
    } else if(initialFigure.type === 'Officer'){
      return new Officer(initialFigure.color, initialFigure.x, initialFigure.y)
    } else if(initialFigure.type === 'Queen'){
      return new Queen(initialFigure.color, initialFigure.x, initialFigure.y)
    } else if(initialFigure.type === 'King'){
      return new King(initialFigure.color, initialFigure.x, initialFigure.y, initialFigure.id)
    } else if(initialFigure.type === 'Horse'){
      return new Horse(initialFigure.color, initialFigure.x, initialFigure.y)
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
