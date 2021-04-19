let col = 20;
let row = 20;
let size = 20;
let maze;
let current;
let stack = [];

function setup() {
  // Adjustable Size

  if (col * size >= window.innerWidth) {
    col = Math.floor(window.innerWidth / size) - 1;
    row = col;
  }
  //Canvas
  createCanvas(col * size, row * size);

  //Making the Grid

  maze = new GRID(col, row, size);
  maze.createGRID();
  current = maze.cells[0];
}

function draw() {
  background("#bdc7c9");

  //SHOWING THE GRID
  maze.SHOW();
  showCurrentinColor(stack);
  showVisitedinColor();
  logic();
}
