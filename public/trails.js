var

/**
 * Constats
 */
COLS = 64,
ROWS = 32,

EMPTY = 0,
SNAKE = 1,
SNAKEH = 3,
SNAKE2 = 4,
SNAKEH2 = 5,
FRUIT = 2,

LEFT  = 0,
UP    = 1,
RIGHT = 2,
DOWN  = 3,

KEY_LEFT  = 37,
KEY_UP    = 38,
KEY_RIGHT = 39,
KEY_DOWN  = 40,

KEY_LEFT2 = 65,
KEY_UP2 = 87,
KEY_RIGHT2 = 68,
KEY_DOWN2 = 83,


/**
 * Game objects
 */
canvas,	  /* HTMLCanvas */
ctx,	  /* CanvasRenderingContext2d */
keystate, /* Object, used for keyboard inputs */
flip,
p1name,
p2name,
frames,   /* number, used for animation */
score2,
score;	  /* number, keep track of the player score */


/**
 * Grid datastructor, usefull in games where the game world is
 * confined in absolute sized chunks of data or information.
 * 
 * @type {Object}
 */
grid = {

	width: null,  /* number, the number of columns */
	height: null, /* number, the number of rows */
	_grid: null,  /* Array<any>, data representation */

	/**
	 * Initiate and fill a c x r grid with the value of d
	 * @param  {any}    d default value to fill with
	 * @param  {number} c number of columns
	 * @param  {number} r number of rows
	 */
	init: function(d, c, r) {
		this.width = c;
		this.height = r;

		this._grid = [];
		for (var x=0; x < c; x++) {
			this._grid.push([]);
			for (var y=0; y < r; y++) {
				this._grid[x].push(d);
			}
		}
	},

	/**
	 * Set the value of the grid cell at (x, y)
	 * 
	 * @param {any}    val what to set
	 * @param {number} x   the x-coordinate
	 * @param {number} y   the y-coordinate
	 */
	set: function(val, x, y) {
		this._grid[x][y] = val;
	},

	/**
	 * Get the value of the cell at (x, y)
	 * 
	 * @param  {number} x the x-coordinate
	 * @param  {number} y the y-coordinate
	 * @return {any}   the value at the cell
	 */
	get: function(x, y) {
		return this._grid[x][y];
	}
}

/**
 * The snake, works as a queue (FIFO, first in first out) of data
 * with all the current positions in the grid with the snake id
 * 
 * @type {Object}
 */
snake = {

	direction: null, /* number, the direction */
	last: null,		 /* Object, pointer to the last element in
						the queue */
	_queue: null,	 /* Array<number>, data representation*/

	init: function(d, x, y) {
		this.direction = d;

		this._queue = [];
		this.insert(x, y);
	},

	insert: function(x, y) {
		this._queue.unshift({x:x, y:y});
		this.last = this._queue[0];
	},

	remove: function() {
		return this._queue.pop();
	}
};


snake2 = {

	direction: null, /* number, the direction */
	last: null,		 /* Object, pointer to the last element in
						the queue */
	_queue: null,	 /* Array<number>, data representation*/

	init: function(d, x, y) {
		this.direction = d;

		this._queue = [];
		this.insert(x, y);
	},

	insert: function(x, y) {
		this._queue.unshift({x:x, y:y});
		this.last = this._queue[0];
	},

	remove: function() {
		return this._queue.pop();
	}
};

/**
 * Starts the game
 */
function main() {
	// create and initiate the canvas element
	canvas = document.createElement("canvas");
	canvas.width = COLS*20;
	canvas.height = ROWS*20;
	ctx = canvas.getContext("2d");
	// add the canvas element to the body of the document
	document.body.appendChild(canvas);

	// sets an base font for bigger score display
	ctx.font = "16px Helvetica";

	frames = 0;
	keystate = {};
	// keeps track of the keybourd input
	document.addEventListener("keydown", function(evt) {
		keystate[evt.keyCode] = true;
	});
	document.addEventListener("keyup", function(evt) {
		delete keystate[evt.keyCode];
	});

	// intatiate game objects and starts the game loop
	p1name = prompt("Player 1, please enter your name" , "player 1");
	p2name = prompt("Player 2, please enter your name" , "player 2")
	init();
	loop();
}

/**
 * Resets and inits game objects
 */
function init() {
	score2  = 0
	score = 0;
	flip = 0;

	grid.init(EMPTY, COLS, ROWS);

	var sp = {x:Math.floor(COLS/2), y:ROWS-1};
	var sp2 = {x:COLS-1, y:Math.floor(ROWS/2)};
	snake.init(UP, sp.x, sp.y);
	snake.direction = UP;
	snake2.init(LEFT, sp2.x, sp2.y);
	snake2.direction = LEFT;
	grid.set(SNAKE2, sp2.x, sp2.y);
	grid.set(SNAKE, sp.x, sp.y);

}

/**
 * The game loop function, used for game updates and rendering
 */
function loop() {
	update();
	draw();
	// When ready to redraw the canvas call the loop function
	// first. Runs about 60 frames a second
	window.requestAnimationFrame(loop, canvas);
}

/**
 * Updates the game logic
 */
function update() {
	frames++;

	// changing direction of the snake depending on which keys
	// that are pressed

	if (keystate[32]){
		return init();
	}

	if (keystate[KEY_LEFT] && snake.direction !== RIGHT) {
		snake.direction = LEFT;
	}
	if (keystate[KEY_UP] && snake.direction !== DOWN) {
		snake.direction = UP;
	}
	if (keystate[KEY_RIGHT] && snake.direction !== LEFT) {
		snake.direction = RIGHT;
	}
	if (keystate[KEY_DOWN] && snake.direction !== UP) {
		snake.direction = DOWN;
	}


	if (keystate[KEY_LEFT2] && snake2.direction !== RIGHT) {
		snake2.direction = LEFT;
	}
	if (keystate[KEY_UP2] && snake2.direction !== DOWN) {
		snake2.direction = UP;
	}
	if (keystate[KEY_RIGHT2] && snake2.direction !== LEFT) {
		snake2.direction = RIGHT;
	}
	if (keystate[KEY_DOWN2] && snake2.direction !== UP) {
		snake2.direction = DOWN;
	}

	// each five frames update the game state.
	if (frames%4 === 0) {
		// pop the last element from the snake queue i.e. the
		// head
		var nx = snake.last.x;
		var ny = snake.last.y;

		var nx2 = snake2.last.x;
		var ny2 = snake2.last.y;

		grid.set(SNAKE, nx, ny);
		grid.set(SNAKE2, nx2, ny2);

		// updates the position depending on the snake direction
		switch (snake.direction) {
			case LEFT:
				nx--;
				break;
			case UP:
				ny--;
				break;
			case RIGHT:
				nx++;
				break;
			case DOWN:
				ny++;
				break;
		}

		switch (snake2.direction) {
			case LEFT:
				nx2--;
				break;
			case UP:
				ny2--;
				break;
			case RIGHT:
				nx2++;
				break;
			case DOWN:
				ny2++;
				break;
		}

		// checks all gameover conditions || grid.get(nx, ny) === SNAKE
		if (0 > nx || nx > grid.width-1  ||
			0 > ny || ny > grid.height-1 
		) {
			alert("Gameover, "+p2name+" wins");
			return init();
		}

		if (0 > nx2 || nx2 > grid.width-1  ||
			0 > ny2 || ny2 > grid.height-1 
		) {
			alert("Gameover, "+p1name+" wins");
			return init();
		}
		// add a snake id at the new position and append it to 
		// the snake queue

		if (grid.get(nx, ny) === EMPTY) {
			score++;
		} else if (grid.get(nx, ny) === SNAKE2) {
			score++;
			score2--;
		}
		else {
			
		}

		if (grid.get(nx2, ny2) === EMPTY) {
			score2++;
		}else if (grid.get(nx2, ny2) === SNAKE) {
			score2++;
			score--;
		} else {
			
		}

		if ((score + score2) > 800) {
			if (score > score2) {
				//player 1 wins
				alert("Gameover, "+p1name+" wins");
				return init();
			} else if (score < score2) {
				//player 2 wins
				alert("Gameover, "+p2name+" wins");
				return init();
			} else {
				alert("Gameover, TIE");
				return init();
				//tie!
			}
		}

		grid.set(SNAKEH, nx, ny);
		grid.set(SNAKEH2, nx2, ny2);
		snake2.insert(nx2, ny2);
		snake.insert(nx, ny);
	}
}

/**
 * Render the grid to the canvas.
 */
function draw() {
	// calculate tile-width and -height
	var tw = canvas.width/grid.width;
	var th = canvas.height/grid.height;
	// iterate through the grid and draw all cells
	for (var x=0; x < grid.width; x++) {
		for (var y=0; y < grid.height; y++) {
			// sets the fillstyle depending on the id of
			// each cell
			switch (grid.get(x, y)) {
				case EMPTY:
					ctx.fillStyle = "#fff";
					break;
				case SNAKE:
					ctx.fillStyle = "#0ff";
					break;
				case SNAKE2:
					ctx.fillStyle = "#00f";
					break;
				case SNAKEH:
					ctx.fillStyle = "#0aa";
					break;
				default:
					ctx.fillStyle = "#40a";
			}
			ctx.fillRect(x*tw, y*th, tw, th);
		}
	}
	// changes the fillstyle once more and draws the score
	// message to the canvas
	ctx.fillStyle = "#000";
	ctx.fillText("PLAYER 2: "+p2name+" SCORE: " + score2, 10, canvas.height-10);
	ctx.fillText("PLAYER 1: "+p1name+" SCORE: " + score, 10, canvas.height-30);
}

// start and run the game
//main();

