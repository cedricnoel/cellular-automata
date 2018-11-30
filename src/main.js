function gameOfLife() {

	var world = new CAWorld({
		width: 200,
		height: 200,
		cellSize: 4
	});

	world.palette = [
		'68, 36, 52, 1',
		'255, 255, 255, 1'
	];

	world.registerCellType('living', {
		getColor: function () {
			return this.alive ? 0 : 1;
		},
		process: function (neighbors) {
			var surrounding = this.countSurroundingCellsWithValue(neighbors, 'wasAlive');
			this.alive = surrounding === 3 || surrounding === 2 && this.alive;
		},
		reset: function () {
			this.wasAlive = this.alive;
		}
	}, function () {
		//init
		this.alive = Math.random() > 0.5;
	});

	world.initialize([
		{ name: 'living', distribution: 100 }
	]);

	return world;
}

var world = gameOfLife();

var c=document.getElementById("myCanvas");
c.width = world.width * world.cellSize
c.height = world.height * world.cellSize
var ctx=c.getContext("2d");

function render(world, ctx) {
	for (var y = 0; y < world.height; y++) {
	    for (var x = 0; x < world.width; x++) {
	        var cell = world.grid[y][x];
	        
	        if (cell.alive) {
	        	ctx.fillStyle="#000000";
	        } else {
	        	ctx.fillStyle="#FFFFFF";
	        }
			ctx.fillRect(x, y, world.cellSize, world.cellSize);
	    }
	}
}

ctx.scale(world.cellSize, world.cellSize);
render(world, ctx);

setInterval(() => {
	world.step();

	ctx.clearRect(0, 0, c.width, c.height);

	render(world, ctx);
}, 30)

