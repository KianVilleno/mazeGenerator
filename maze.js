function logic() {
  current.visited = true;
  current.checkForNeighbors(maze);

  if (current.neighbors.length > 0) {
    let randomUnvistedNeighbor = int(random(current.neighbors.length));
    let next = current.neighbors[randomUnvistedNeighbor];
    removingWall(current, next);
    stack.push(current);
    next.visited = true;
    current = next;
  } else if (stack.length > 0) {
    let revisitedCell = stack.pop();
    current = revisitedCell;
  }
}

class GRID {
  constructor(col, row, size) {
    this.col = col;
    this.row = row;
    this.cells = [];
    this.size = size;
  }

  createGRID() {
    for (let j = 0; j < this.row; j++) {
      for (let i = 0; i < this.col; i++) {
        let cell = new CELL(i, j, this.size);
        this.cells.push(cell);
      }
    }
  }

  SHOW() {
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i].draw();
    }
  }
}

class CELL {
  constructor(i, j, size) {
    this.visited = false;
    this.i = i;
    this.j = j;
    this.size = size;

    this.top = true;
    this.bottom = true;
    this.left = true;
    this.right = true;
    this.neighbors = [];
    this.color = "white";
    this.stack = [];
  }

  checkForNeighbors(GRID) {
    this.neighbors = [];

    let grid = GRID.cells;

    let left = grid[index(this.i - 1, this.j)];
    let right = grid[index(this.i + 1, this.j)];
    let top = grid[index(this.i, this.j - 1)];
    let bottom = grid[index(this.i, this.j + 1)];

    if (left != undefined && !left.visited) this.neighbors.push(left);
    if (right != undefined && !right.visited) this.neighbors.push(right);
    if (top != undefined && !top.visited) this.neighbors.push(top);
    if (bottom != undefined && !bottom.visited) this.neighbors.push(bottom);
  }

  draw() {
    let i = this.i * this.size;
    let j = this.j * this.size;
    let size = this.size;

    if (this.top) {
      line(i, j, i + size, j);
      stroke(this.color);
    }
    if (this.bottom) {
      line(i, j + size, i + size, j + size);
      stroke(this.color);
    }
    if (this.left) {
      line(i, j, i, j + size);
      stroke(this.color);
    }
    if (this.right) {
      line(i + size, j, i + size, j + size);
      stroke(this.color);
    }
  }
}

function removingWall(current, next) {
  //right
  if (current.i - next.i == -1 && current.j - next.j == 0) {
    //console.log("right")
    current.right = false;
    next.left = false;
  }

  //left
  if (current.i - next.i == 1 && current.j - next.j == 0) {
    //console.log("left")
    current.left = false;
    next.right = false;
  }

  //top

  if (current.i - next.i == 0 && current.j - next.j == 1) {
    //console.log("top")
    current.top = false;
    next.bottom = false;
  }

  //bottom

  if (current.i - next.i == 0 && current.j - next.j == -1) {
    //console.log("bottom")
    current.bottom = false;
    next.top = false;
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > col - 1 || j > row - 1) {
    return -1;
  }
  return i + j * col;
}

function showVisitedinColor() {
  for (let i = 0; i < maze.cells.length; i++) {
    if (maze.cells[i].visited == true) {
      let mazeCells = maze.cells[i];
      let cell_i = mazeCells.i * mazeCells.size;
      let cell_j = mazeCells.j * mazeCells.size;
      let cell_size = mazeCells.size;
      noStroke();

      fill("rgba(43, 79, 96, 0.3)");
      rect(cell_i, cell_j, cell_size, cell_size);
    }
  }
}

function showCurrentinColor(stackState) {
  if (stackState.length > 0) {
    let mazeCells = current;
    let cell_i = mazeCells.i * mazeCells.size;
    let cell_j = mazeCells.j * mazeCells.size;
    let cell_size = mazeCells.size;
    noStroke();
    fill("#e7305b");
    rect(cell_i, cell_j, cell_size, cell_size);
  }
}
