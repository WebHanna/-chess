import game from './Game';
import _ from 'lodash'

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
    this.setCellOnClick(cell);

    return cell;
  }

  setFigure(figure) {
    this.figure = figure;
    this.renderInitialFigure();
  }

  setCellOnClick(cell){
    cell.addEventListener('click', (e) => {

      const targetCell = e.target;
      const currentFigure = _.cloneDeep(game.selectedFigure);
      const currentCell = this.findCellByCoords(targetCell.dataset.y, targetCell.dataset.x);

      if(game.selectedFigure && currentCell.available){
        game.board.cells[currentFigure.y][currentFigure.x].figure = null;
        console.log('selectedFigure', currentFigure);
        currentFigure.move({x: targetCell.dataset.x, y: targetCell.dataset.y});

        currentCell.figure = currentFigure;
        game.selectedFigure = null;
        console.log('currentCell', game.board.cells[targetCell.dataset.y][targetCell.dataset.x]);
      }

      game.turnEnd();
    });
  }

  setFigureOnClick(){

    this.figure.element.addEventListener('click', (e) => {

      const targetFigure = e.target;
      console.log('set', targetFigure.dataset)
      if(!this.isAvailable(targetFigure.dataset)){
        game.turnEnd();

        const currentFigureCell = this.findFigureByCoords(targetFigure.dataset.y, targetFigure.dataset.x);
        console.log("currentCell45", currentFigureCell);
        currentFigureCell.figure.searchNextAvailablePosition(game.board.cells);
       // currentFigureCell.figure.searchNextAvailablePositionRook(game.board);
        currentFigureCell.figure.nextAvailableCells.forEach(cell => {
          cell.setAvailable()
        });

        game.selectedFigure = _.cloneDeep(currentFigureCell.figure);
      } else {
        const currentFigureCell = this.findFigureByCoords(targetFigure.dataset.y, targetFigure.dataset.x);
        this.beatFigure(currentFigureCell)
      }
    });
  }

  renderInitialFigure() {
    const figureDiv = document.createElement('div');
    figureDiv.className = 'figure';
    figureDiv.style.backgroundPosition = this.figure.position;
    figureDiv.style.left = this.x * 70 + 'px';
    figureDiv.style.top = this.y * 70 + 'px';
    figureDiv.dataset.x = this.x;
    figureDiv.dataset.y = this.y;
    figureDiv.id = this.figure.id;

    this.figure.element = figureDiv;
    this.setFigureOnClick();

    game.board.element.appendChild(this.figure.element);
  }

  setAvailable(){
    this.element.classList.add('available');
    this.available = true;
  }

  removeAvailable(){
    this.element.classList.remove('available');
    this.available = false;
  }

  beatFigure(currentFigureCell){
    const currentFigure = _.cloneDeep(game.selectedFigure);

    currentFigureCell.figure.element.remove();
    game.board.cells[currentFigure.y][currentFigure.x].figure = null;
    game.selectedFigure.move(currentFigureCell.figure);
    currentFigureCell.figure = currentFigure;
    game.selectedFigure = null;
    game.turnEnd();

  }

  isEmpty(){
    return !this.figure;
  }

  isAvailable(figure){
    return game.board.cells[figure.y][figure.x].available
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

}
