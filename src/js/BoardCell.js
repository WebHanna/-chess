import game from './Game';
import figuresManager from './FiguresManager';
import _ from 'lodash';

export default class BoardCell {

  constructor(color, x, y) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.figure = null;
    this.element = this.createCell(color);
    this.available = null;
  }

  createCell(color) {
    const cell = document.createElement('div');
    cell.className = 'block ' + color;
    cell.dataset.x = this.x;
    cell.dataset.y = this.y;
    cell.style.left = this.x * 70 + 'px';
    cell.style.top = this.y * 70 + 'px';
    this._setCellOnClick(cell);

    return cell;
  }

  setFigure(figure) {
    this.figure = figure;
    this._renderInitialFigure();
  }

  _setCellOnClick(cell){
    cell.addEventListener('click', (e) => {

      const targetCell = e.target;
      const currentFigure = _.cloneDeep(game.selectedFigure);
      const currentCell = figuresManager.findCellByCoords(targetCell.dataset.y, targetCell.dataset.x);
      if(game.selectedFigure && currentCell.available){
        figuresManager._removeFigureFromCell(currentFigure.y, currentFigure.x);

        figuresManager.moveFigure({x: targetCell.dataset.x, y: targetCell.dataset.y}, currentFigure);
        currentCell.figure = currentFigure;
        game.selectedFigure = null;
      }



      game.turnEnd();
    });
  }

  _setFigureOnClick(){
    this.figure.element.addEventListener('click', (e) => {
      figuresManager.checkMate();
      const targetFigure = e.target;
      if(!this.isAvailable(targetFigure.dataset)){
        game.turnEnd();

        const currentFigureCell = figuresManager.findFigureByCoords(targetFigure.dataset.y, targetFigure.dataset.x);

        this.setAvailableNextCells(currentFigureCell);

        game.selectedFigure = _.cloneDeep(currentFigureCell.figure);
      } else {
        const currentFigureCell = figuresManager.findFigureByCoords(targetFigure.dataset.y, targetFigure.dataset.x);

        figuresManager.beatFigure(currentFigureCell);
      }
    });
  }

  setAvailableNextCells(currentFigureCell){
    // console.log("currentFigureCell", currentFigureCell);
    currentFigureCell.figure.searchNextAvailablePosition(game.board.cells);
    currentFigureCell.figure.nextAvailableCells.forEach(cell => {cell.setAvailable()});
  }

  setAvailable(){
    this.element.classList.add('available');
    this.available = true;
  }

  removeAvailable(){
    this.element.classList.remove('available');
    this.available = false;
  }

  isEmpty(){
    return !this.figure;
  }

  isAvailable(figure){
    return game.board.cells[figure.y][figure.x].available
  }

  _renderInitialFigure() {
    const figureDiv = document.createElement('div');
    figureDiv.className = 'figure';
    figureDiv.style.backgroundPosition = this.figure.position;
    figureDiv.style.left = this.x * 70 + 'px';
    figureDiv.style.top = this.y * 70 + 'px';
    figureDiv.dataset.x = this.x;
    figureDiv.dataset.y = this.y;

    if(this.figure.id) {
      figureDiv.id = this.figure.id;
    }

    this.figure.element = figureDiv;
    this._setFigureOnClick();

    game.board.element.appendChild(this.figure.element);
  }
}

