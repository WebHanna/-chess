import Board from './Board';
import Pawn from './figures/Pawn';

class Game {

	constructor(){
		this.board = new Board();
		this.defaultFiguresState = [
      {x: 0, y: 1, type: 'Pawn', color: 'white', id: 1},
      {x: 1, y: 1, type: 'Pawn', color: 'white', id: 2},
      {x: 2, y: 1, type: 'Pawn', color: 'white', id: 3},
      {x: 1, y: 2, type: 'Pawn', color: 'black', id: 4},
      {x: 3, y: 1, type: 'Pawn', color: 'white', id: 5},
      {x: 4, y: 1, type: 'Pawn', color: 'white', id: 6},
      {x: 5, y: 1, type: 'Pawn', color: 'white', id: 7},
      {x: 6, y: 1, type: 'Pawn', color: 'white', id: 8},
      {x: 7, y: 1, type: 'Pawn', color: 'white', id: 9}
    ]
	}

	start(){
		this.board.renderBoard();
		this.setDefaultState();
	}

	setDefaultState(){
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
	    return new Pawn(initialFigure.color, initialFigure.x, initialFigure.y, initialFigure.id)
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
