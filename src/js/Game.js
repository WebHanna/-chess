import _ from 'lodash';
import Board from './Board';
import Pawn from './figures/Pawn';
import Rook from './figures/Rook';
import Horse from './figures/Horse';
import Officer from './figures/Officer';
import Queen from './figures/Queen';
import King from './figures/King';

class Game {

  constructor(){
    this.previousState = null;
    this.board = new Board();
    this.check = null;
    this.mate = null;
    this.turn = 'white';
    this.defaultFiguresState = [
      {x: 0, y: 0, type: 'Rook', color: 'white', id: 0},
      {x: 1, y: 0, type: 'Horse', color: 'white', id: 13},
      {x: 2, y: 0, type: 'Officer', color: 'white', id: 10},
      {x: 4, y: 0, type: 'Queen', color: 'white', id: 11},
      {x: 3, y: 0, type: 'King', color: 'white', id: 12},
      {x: 5, y: 0, type: 'Officer', color: 'white', id: 13},
      {x: 6, y: 0, type: 'Horse', color: 'white', id: 14},
      {x: 7, y: 0, type: 'Rook', color: 'white', id: 15},
      {x: 0, y: 1, type: 'Pawn', color: 'white', id: 1},
      {x: 1, y: 1, type: 'Pawn', color: 'white', id: 2},
      {x: 2, y: 1, type: 'Pawn', color: 'white', id: 3},
      {x: 3, y: 1, type: 'Pawn', color: 'white', id: 5},
      {x: 4, y: 1, type: 'Pawn', color: 'white', id: 6},
      {x: 5, y: 1, type: 'Pawn', color: 'white', id: 7},
      {x: 6, y: 1, type: 'Pawn', color: 'white', id: 8},
      {x: 7, y: 1, type: 'Pawn', color: 'white', id: 9},
      {x: 0, y: 6, type: 'Pawn', color: 'black', id: 4},
      {x: 1, y: 6, type: 'Pawn', color: 'black', id: 16},
      {x: 2, y: 6, type: 'Pawn', color: 'black', id: 17},
      {x: 3, y: 6, type: 'Pawn', color: 'black', id: 18},
      {x: 4, y: 6, type: 'Pawn', color: 'black', id: 19},
      {x: 5, y: 6, type: 'Pawn', color: 'black', id: 20},
      {x: 6, y: 6, type: 'Pawn', color: 'black', id: 21},
      {x: 7, y: 6, type: 'Pawn', color: 'black', id: 22},
      {x: 2, y: 7, type: 'Officer', color: 'black', id: 26},
      {x: 1, y: 7, type: 'Horse', color: 'black', id: 23},
      {x: 0, y: 7, type: 'Rook', color: 'black', id: 24},
      {x: 4, y: 7, type: 'Queen', color: 'black', id: 25},
      {x: 3, y: 7, type: 'King', color: 'black', id: 27},
      {x: 5, y: 7, type: 'Officer', color: 'black', id: 28},
      {x: 6, y: 7, type: 'Horse', color: 'black', id: 29},
      {x: 7, y: 7, type: 'Rook', color: 'black', id: 30},
    ];
    this.cancelButton = document.getElementById('cancelButton')
  }

  start(){
    this.board.renderBoard();
    this.setDefaultState();
    this.savePreviousState();

    this.cancelButton.addEventListener('click', () => {
      this.cancelStep();
    });
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

  setPreviousState(state){
    state.forEach(initialFigure => {
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
    } else if(initialFigure.type === 'Rook'){
      return new Rook(initialFigure.color, initialFigure.x, initialFigure.y, initialFigure.id)
    } else if(initialFigure.type === 'Officer'){
      return new Officer(initialFigure.color, initialFigure.x, initialFigure.y, initialFigure.id)
    } else if(initialFigure.type === 'Queen'){
      return new Queen(initialFigure.color, initialFigure.x, initialFigure.y, initialFigure.id)
    } else if(initialFigure.type === 'King'){
      return new King(initialFigure.color, initialFigure.x, initialFigure.y, initialFigure.id)
    } else if(initialFigure.type === 'Horse'){
      return new Horse(initialFigure.color, initialFigure.x, initialFigure.y, initialFigure.id)
    }
  }

  cancelStep(){

    if(!this.previousState) return;

    this.board = this.previousState.board;
    this.turn = this.previousState.turn;

    const newFiguresArr = [];

    this.board.cells.forEach(row => {
      row.forEach(cell => {
        if(cell.figure){
          cell.figure.element.remove();

          newFiguresArr.push({
            x: cell.figure.x, y: cell.figure.y,
            type: cell.figure.type,
            color: cell.figure.color,
            id: cell.figure.id
          })
        }
      })
    });

    this.setPreviousState(newFiguresArr);

  }

  savePreviousState(){
    this.previousState = {
      board : _.cloneDeep(this.board),
      turn: this.turn
    };
  }

  turnEnd(){
    this.board.cells.forEach(row => {
      row.forEach(cell => {
        cell.removeAvailable();
      })
    });

    this.checkGameStatus();

    this.board.checkPawnsToChange();

    if(this.turn === 'white') {
      this.turn = 'black';
    } else {
      this.turn = 'white';
    }
  }

  checkGameStatus(){
    let kingCell,
        kingAvailablePositions,
        opponentPositions;

    this.board.cells.forEach(row => {
      row.forEach(cell => {
        if(cell.figure && cell.figure.type === 'King' && cell.figure.color !== this.turn){
          kingCell = cell;
        }
      })
    });

    if(kingCell) {
      kingCell.figure.searchNextAvailablePosition(this.board.cells);

      kingAvailablePositions = kingCell.figure.nextAvailableCells;
      opponentPositions = kingCell.figure.findOpponentAvailablePositions(this.board.cells);

      if(this.isKingAttacked(kingCell, opponentPositions) && kingAvailablePositions.length === 0){
        this.mate = this.turn;
      } else if (this.isKingAttacked(kingCell, opponentPositions)) {
        this.check = this.turn;
      }
    }

  }

  isKingAttacked(kingCell, opponentPositions){
    return !!opponentPositions.find(cell => kingCell.x === cell.x && kingCell.y === cell.y)
  }

}

const game = new Game();

export default game;
