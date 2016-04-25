
/*globals snake */
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
CHUNK = 6,

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

winnerName = "nobody",
winnerScore = 0,

/**
 * Game objects
 */
setframe,
canvas,	  /* HTMLCanvas */
ctx,	  /* CanvasRenderingContext2d */
keystate, /* Object, used for keyboard inputs */
flip,
p1name,
p2name,
frames,   /* number, used for animation */
score2,
score,	  /* number, keep track of the player score */
m;


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
 	var button = document.getElementById('intro');
    button.parentNode.removeChild(button);
	// intatiate game objects and starts the game loop
	p1name = prompt("Player 1, please enter your name. \nYou will be light blue and you will start on the bottom" , "player 1");
	p2name = prompt("Player 2, please enter your name. \nYou will be dark blue and you will start on the right" , "player 2")
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
	snake2.init(LEFT, sp2.x, sp2.y);
	grid.set(SNAKE2, sp2.x, sp2.y);
	grid.set(SNAKE, sp.x, sp.y);
	setframe = 5;
	
	createChunks(ROWS-1, COLS-1);
}

function gameover(x,y) {
	
	setframe = 10000;
	
	if (x > y){
		// player 1 won
		if (x == 10000) {
			// player 1 hit the wall
			alert("Gameover, "+p2name+" wins because " +p1name+" hit the wall!");
			winnerName = p2name;
			winnerScore = score2;
				window.location.href = "main.php?w1="+winnerName+"&w2="+winnerScore;
		} else {
			// player 1 won out right
			alert("Gameover, "+p1name+" wins with " + score +" points!");
			winnerName = p1name;
			winnerScore = score;
				window.location.href = "main.php?w1="+winnerName+"&w2="+winnerScore;
		}
	} else if (y > x) {
		// player 2 won
		if (y == 10000) {
			// player 1 hit the wall
			alert("Gameover, "+p1name+" wins because " +p2name+" hit the wall!");
			winnerName = p1name;
			winnerScore = score;
				window.location.href = "main.php?w1="+winnerName+"&w2="+winnerScore;
		} else {
			// player 2 won out right
			alert("Gameover, "+p2name+" wins with " + score2 +" points!");
			winnerName = p2name;
			winnerScore = score2;
				window.location.href = "main.php?w1="+winnerName+"&w2="+winnerScore;
		}
	} else {
		// TIE??
		alert("This is a TIE");
	}

	window.location.href = "main.php?w1="+winnerName+"&w2="+winnerScore;

	//location.reload(true);

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
	if (frames%setframe === 0) {
		// pop the last element from the snake queue i.e. the
		// head
		var nx = snake.last.x;
		var ny = snake.last.y;

		var nx2 = snake2.last.x;
		var ny2 = snake2.last.y;

		

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

		
		//if(grid.get(nx, ny) != CHUNK){
			grid.set(SNAKE, snake.last.x, snake.last.y);
			
			// checks all gameover conditions || grid.get(nx, ny) === SNAKE
			if (0 > nx || nx > grid.width-1  ||
				0 > ny || ny > grid.height-1 
			) {
				gameover(10000,0);
			}
			
			if (grid.get(nx, ny) === EMPTY) {
				score++;
			} else if (grid.get(nx, ny) === SNAKE2) {
				flip++;
				score++;
				score2--;
			}

			grid.set(SNAKEH, nx, ny);
			snake.insert(nx, ny);
		//}
		
		//if(grid.get(nx2, ny2) != CHUNK){
			grid.set(SNAKE2, snake2.last.x, snake2.last.y);
			
			if (0 > nx2 || nx2 > grid.width-1  ||
				0 > ny2 || ny2 > grid.height-1 
			) {
				gameover(0,10000);
			}

			if (grid.get(nx2, ny2) === EMPTY) {
				score2++;
			}else if (grid.get(nx2, ny2) === SNAKE) {
				flip++;
				score2++;
				score--;
			}
			
			grid.set(SNAKEH2, nx2, ny2);
			snake2.insert(nx2, ny2);
		//}
	

		if ((score + score2) > 800) {
			gameover(score,score2);
		}

		else if (flip>200){
			gameover(score,score2);
		}


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
				case CHUNK:
				    ctx.fillStyle = "#000";
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
					ctx.fillStyle = "#a0a";
			}
			ctx.fillRect(x*tw, y*th, tw, th);
		}
	}
	// changes the fillstyle once more and draws the score
	// message to the canvas
	
	ctx.fillStyle = "#00f";
	ctx.fillText("PLAYER 2: "+p2name+" SCORE: " + score2, 10, canvas.height-10);
	ctx.fillStyle = "#0ff";
	ctx.fillText("PLAYER 1: "+p1name+" SCORE: " + score, 10, canvas.height-30);
	ctx.fillStyle = "#000";
	ctx.fillText("Flips: "+flip+"/200", 10, canvas.height-50);
}
function createChunks(x,y) {
	var tw = canvas.width/grid.width;
	var th = canvas.height/grid.height;
	ctx.fillStyle = "#000";
	
	gen = Math.floor((x*y)*0.03);
	var amt = 0
	while(amt != gen){
		randX = Math.floor((Math.random() * y) + 1);
		randY = Math.floor((Math.random() * x) + 1);
		ctx.fillRect(randY*tw, randX*th, tw, th);
		grid.set(CHUNK, randX, randY);
		amt++;
	}
}

 
 
 
// start and run the game
//main();

