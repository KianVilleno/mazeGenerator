const col = 20;
const row = 20;
const size = 20;
let maze;
let current;
let stack = [];

function setup() {
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
