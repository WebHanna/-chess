import game from './Game';

export default class  BoardCell {

	constructor (color, x , y) {
		this.color = color;
		this.x = x;
		this.y = y;
		this.figure = null;
		this.element = this.createCell(color);
    this.available = null;
	}

	createCell(color) {
		const cell =  document.createElement('div');
		cell.className = 'block ' + color;
		cell.dataset.x = this.x;
		cell.dataset.y = this.y;
    cell.style.left = this.x * 70 +'px';
		cell.style.top = this.y * 70 +'px';

		return cell;
	}

	setFigure(figure) {
	 this.figure = figure;
	 this.renderInitialFigure();
	}

	setCellOnClick(cell) {
		cell.addEventListener('click', () => {
      if(game.selectedFigure)
				game.selectedFigure.move(this);

				game.selectedFigure = null;

        game.turnEnd();
		})
	}

	setFigureOnClick() {
   this.figure.element.addEventListener('click', () => {

		if(!this.isAvailable(this.figure)){
			game.turnEnd();
			this.figure.searchNextAvailablePosition(game.board.cells);
			this.figure.nextAvailableCells.forEach(cell => {
				cell.setAvailable()
			});

			game.selectedFigure = this.figure;
		} else {
			this.beatFigure(this.figure)
		}

	 })
	}

	renderInitialFigure() {
    const figureDiv = document.createElement('div');
    figureDiv.className = 'figure';
    figureDiv.style.backgroundPosition = this.figure.position;
    figureDiv.style.left = this.x * 70 + 'px';
    figureDiv.style.top = this.y * 70 + 'px';
    figureDiv.id = this.figure.id;

    this.figure.element = figureDiv;
    this.setFigureOnClick();

    game.board.element.appendChild(this.figure.element);
	}

	setAvailable() {
		this.element.classList.add('available');
		this.available = true;
	}

	removeAvailable() {
		this.element.classList.remove('available');
		this.available = false;
	}

	beatFigure() {
		this.figure.element.remove();
		game.selectedFigure.move(this.figure);
		this.figure = game.selectedFigure;
		game.selectedFigure = null;
		game.turnEnd();
	}

	isEmpty() {
		return !this.figure;
	}

	isAvailable(figure) {
    return game.board.cells[figure.y][figure.x].available;
	}

}
