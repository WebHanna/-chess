(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["n"] = factory();
	else
		root["n"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Game = __webpack_require__(1);
	
	var _Game2 = _interopRequireDefault(_Game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_Game2.default.start();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Board = __webpack_require__(2);
	
	var _Board2 = _interopRequireDefault(_Board);
	
	var _Pawn = __webpack_require__(4);
	
	var _Pawn2 = _interopRequireDefault(_Pawn);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
	    this.board = new _Board2.default();
	    this.defaultFiguresState = [{ x: 0, y: 1, type: 'Pawn', color: 'white', id: 1 }, { x: 1, y: 1, type: 'Pawn', color: 'white', id: 2 }, { x: 2, y: 1, type: 'Pawn', color: 'white', id: 3 }, { x: 1, y: 2, type: 'Pawn', color: 'black', id: 4 }, { x: 3, y: 1, type: 'Pawn', color: 'white', id: 5 }, { x: 4, y: 1, type: 'Pawn', color: 'white', id: 6 }, { x: 5, y: 1, type: 'Pawn', color: 'white', id: 7 }, { x: 6, y: 1, type: 'Pawn', color: 'white', id: 8 }, { x: 7, y: 1, type: 'Pawn', color: 'white', id: 9 }];
	  }
	
	  _createClass(Game, [{
	    key: 'start',
	    value: function start() {
	      this.board.renderBoard();
	      this.setDefaultState();
	    }
	  }, {
	    key: 'setDefaultState',
	    value: function setDefaultState() {
	      var _this = this;
	
	      this.defaultFiguresState.forEach(function (initialFigure) {
	        _this.board.cells.forEach(function (row) {
	          row.forEach(function (cell) {
	            if (cell.x === initialFigure.x && cell.y === initialFigure.y) {
	              cell.setFigure(_this.getInitialFigure(initialFigure));
	            }
	          });
	        });
	      });
	    }
	  }, {
	    key: 'getInitialFigure',
	    value: function getInitialFigure(initialFigure) {
	      if (initialFigure.type === 'Pawn') {
	        return new _Pawn2.default(initialFigure.color, initialFigure.x, initialFigure.y, initialFigure.id);
	      }
	    }
	  }, {
	    key: 'turnEnd',
	    value: function turnEnd() {
	      this.board.cells.forEach(function (row) {
	        row.forEach(function (cell) {
	          cell.removeAvailable();
	        });
	      });
	    }
	  }]);
	
	  return Game;
	}();
	
	var game = new Game();
	
	exports.default = game;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BoardCell = __webpack_require__(3);
	
	var _BoardCell2 = _interopRequireDefault(_BoardCell);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Board = function () {
		function Board() {
			_classCallCheck(this, Board);
	
			this.cells = [];
			this.selectedFigure = null;
			this.element = null;
		}
	
		_createClass(Board, [{
			key: 'renderBoard',
			value: function renderBoard() {
	
				var board = document.getElementById('board');
	
				this.getCells();
	
				this.cells.forEach(function (row) {
					row.forEach(function (cell) {
						board.appendChild(cell.element);
					});
				});
	
				this.element = board;
			}
		}, {
			key: 'getCells',
			value: function getCells() {
				var white = 'white',
				    black = 'black';
	
				var arr = [];
	
				for (var i = 0; i < 8; i++) {
					if (i % 2 === 0) {
						arr.push(this.getRow(i, white, black));
					} else {
						arr.push(this.getRow(i, black, white));
					}
				}
	
				this.cells = arr;
			}
		}, {
			key: 'getRow',
			value: function getRow(y, firstColor, secondColor) {
				var arr = [];
	
				for (var i = 0; i < 8; i++) {
	
					if (i % 2 === 0) {
						arr.push(new _BoardCell2.default(firstColor, i, y));
					} else {
						arr.push(new _BoardCell2.default(secondColor, i, y));
					}
				}
				return arr;
			}
		}]);
	
		return Board;
	}();
	
	exports.default = Board;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Game = __webpack_require__(1);
	
	var _Game2 = _interopRequireDefault(_Game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BoardCell = function () {
	  function BoardCell(color, x, y) {
	    _classCallCheck(this, BoardCell);
	
	    this.color = color;
	    this.x = x;
	    this.y = y;
	    this.figure = null;
	    this.element = this.createCell(color);
	    this.available = null;
	  }
	
	  _createClass(BoardCell, [{
	    key: 'createCell',
	    value: function createCell(color) {
	      var cell = document.createElement('div');
	      cell.className = 'block ' + color;
	      cell.dataset.x = this.x;
	      cell.dataset.y = this.y;
	      cell.style.left = this.x * 70 + 'px';
	      cell.style.top = this.y * 70 + 'px';
	      this.setCellOnClick(cell);
	
	      return cell;
	    }
	  }, {
	    key: 'setFigure',
	    value: function setFigure(figure) {
	      this.figure = figure;
	      this.renderInitialFigure();
	    }
	  }, {
	    key: 'setCellOnClick',
	    value: function setCellOnClick(cell) {
	      var _this = this;
	
	      cell.addEventListener('click', function () {
	        if (_Game2.default.selectedFigure) _Game2.default.selectedFigure.move(_this);
	
	        _Game2.default.selectedFigure = null;
	        _Game2.default.turnEnd();
	      });
	    }
	  }, {
	    key: 'setFigureOnClick',
	    value: function setFigureOnClick() {
	      var _this2 = this;
	
	      this.figure.element.addEventListener('click', function () {
	
	        if (!_this2.isAvailable(_this2.figure)) {
	          _Game2.default.turnEnd();
	          _this2.figure.searchNextAvailablePosition(_Game2.default.board.cells);
	          _this2.figure.nextAvailableCells.forEach(function (cell) {
	            cell.setAvailable();
	          });
	
	          _Game2.default.selectedFigure = _this2.figure;
	        } else {
	          _this2.beatFigure(_this2.figure);
	        }
	      });
	    }
	  }, {
	    key: 'renderInitialFigure',
	    value: function renderInitialFigure() {
	      var figureDiv = document.createElement('div');
	      figureDiv.className = 'figure';
	      figureDiv.style.backgroundPosition = this.figure.position;
	      figureDiv.style.left = this.x * 70 + 'px';
	      figureDiv.style.top = this.y * 70 + 'px';
	      figureDiv.id = this.figure.id;
	
	      this.figure.element = figureDiv;
	      this.setFigureOnClick();
	
	      _Game2.default.board.element.appendChild(this.figure.element);
	    }
	  }, {
	    key: 'setAvailable',
	    value: function setAvailable() {
	      this.element.classList.add('available');
	      this.available = true;
	    }
	  }, {
	    key: 'removeAvailable',
	    value: function removeAvailable() {
	      this.element.classList.remove('available');
	      this.available = false;
	    }
	  }, {
	    key: 'beatFigure',
	    value: function beatFigure() {
	
	      this.figure.element.remove();
	      _Game2.default.selectedFigure.move(this.figure);
	      this.figure = _Game2.default.selectedFigure;
	      _Game2.default.selectedFigure = null;
	      _Game2.default.turnEnd();
	
	      console.log(this.figure);
	    }
	  }, {
	    key: 'isEmpty',
	    value: function isEmpty() {
	      return !this.figure;
	    }
	  }, {
	    key: 'isAvailable',
	    value: function isAvailable(figure) {
	      return _Game2.default.board.cells[figure.y][figure.x].available;
	    }
	  }]);
	
	  return BoardCell;
	}();
	
	exports.default = BoardCell;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Pawn = function () {
	  function Pawn(color, x, y, id) {
	    _classCallCheck(this, Pawn);
	
	    this.id = id;
	    this.type = 'Pawn';
	    this.color = color;
	    this.x = x;
	    this.y = y;
	    this.nextAvailableCells = null;
	    this.element = null;
	    this.position = this.getPosition();
	  }
	
	  _createClass(Pawn, [{
	    key: 'getPosition',
	    value: function getPosition() {
	      if (this.color === 'white') {
	        return '-595px -116px';
	      } else {
	        return '-595px -19px';
	      }
	    }
	  }, {
	    key: 'searchNextAvailablePosition',
	    value: function searchNextAvailablePosition(cells) {
	      var forwardCell = this.forwardCell(cells),
	          otherCells = this.toBeat(cells),
	          availableCells = [];
	
	      if (forwardCell.isEmpty()) {
	        availableCells.push(forwardCell);
	      }
	
	      otherCells.forEach(function (cell) {
	        if (!cell.isEmpty()) {
	          availableCells.push(cell);
	        }
	      });
	
	      this.nextAvailableCells = availableCells;
	    }
	  }, {
	    key: 'forwardCell',
	    value: function forwardCell(cells) {
	      if (this.color === 'white') {
	        return cells[this.y + 1][this.x];
	      } else {
	        return cells[this.y - 1][this.x];
	      }
	    }
	  }, {
	    key: 'toBeat',
	    value: function toBeat(cells) {
	      var toBeatArr = [];
	
	      if (this.color === 'white') {
	        toBeatArr.push(cells[this.y + 1][this.x + 1]);
	        toBeatArr.push(cells[this.y + 1][this.x - 1]);
	      } else {
	        toBeatArr.push(cells[this.y - 1][this.x + 1]);
	        toBeatArr.push(cells[this.y - 1][this.x - 1]);
	      }
	
	      return toBeatArr;
	    }
	  }, {
	    key: 'move',
	    value: function move(cell) {
	      console.log(cell.x, cell.y);
	      this.x = cell.x;
	      this.y = cell.y;
	      this.element.style.left = cell.x * 70 + 'px';
	      this.element.style.top = cell.y * 70 + 'px';
	    }
	  }]);
	
	  return Pawn;
	}();
	
	exports.default = Pawn;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=proj.js.map