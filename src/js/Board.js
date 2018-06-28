import Cell from './BoardCell';

export default class Board {
  constructor() {
	 this.cells = [];
	 this.selectedFigure = null;
   this.element = null;
	}


renderBoard() {
	const board = document.getElementById('board');
	this.getCells();
	this.cells.forEach(row => {
    row.forEach(cell => {
      board.appendChild(cell.element);
		})
	});

	this.element = board;
}

getCells() {
	const white = 'white',
				black = 'black';

				let arr = [];

				for(let i = 0; i < 8; i++){
          if(i % 2 === 0) {
						arr.push(this.getRow(i, white, black))
					} else {
						arr.push(this.getRow(i, black, white))
					}
				}

}

getRow(y, firstColor, secondColor) {
	const arr = [];

	for(let i = 0; i < 8; i++){
		if(i % 2 === 0) {
			arr.push(new Cell(firstColor, i, y))
		} else {
			arr.push(new Cell(secondColor, i, y))
		}
	}
}

}
