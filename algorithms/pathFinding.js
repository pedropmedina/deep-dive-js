// Breadth first traversal for path finding

const NO_ONE = 0;
const BY_A = 1;
const BY_B = 2;

const getShortestDistanceLength = (maze, [aY, aX], [bY, bX]) => {
	// Setup data. This helps keep track of changes as the queue is itearated
	const visited = maze.map((row, y) => {
		return row.map((point, x) => {
			return {
				closed: point === 1,
				openedBy: NO_ONE,
				length: 0,
				y,
				x,
			};
		});
	});

	// initiate points A and B with the corresponding opener
	visited[aY][aX].openedBy = BY_A;
	visited[bY][bX].openedBy = BY_B;

	// define and assign queues and iteration
	// queues are intialized with points A and B
	let aQueue = [visited[aY][aX]],
		bQueue = [visited[bY][bX]],
		iteration = 0;

	// iterate over neighbors until intersaction of openedBy values
	while (aQueue.length && bQueue.length) {
		// there's is at least once iteration needed to complete checks
		iteration++;

		// get neighbors for A with helper function in order to reset queue.
		// The same results could have been obtained using a more rudimentary
		// for loop and pushing to a new array. We use reduce since we are
		// flattening the array returned from getNeighbors into acc,
		// leaving use with one array of of neighbors (objects)
		const aNeighbors = aQueue.reduce((acc, neighbor) => {
			return acc.concat(getNeighbors(visited, neighbor.y, neighbor.x));
		}, []);

		// reset aQueue
		aQueue = [];

		// iterate over each neighbor of A and return function if
		// neighbor.openedBy = B, else push neighbors to aQueue and
		// repeat process
		for (let i = 0; i < aNeighbors.length; i++) {
			const neighbor = aNeighbors[i];

			if (neighbor.openedBy === BY_B) {
				// since A and B are simultaneously moving towards each other,
				// by the time, this conditions is met, lenght will be only
				// half of the way, thus we add it to itaration to amount
				// to the other half, giving us the total number steps taken
				return neighbor.length + iteration;
			} else {
				neighbor.length = iteration;
				neighbor.openedBy = BY_A;
				aQueue.push(neighbor);
			}
		}

		// the steps below are the same as above, but for B
		const bNeighbors = bQueue.reduce((acc, neighbor) => {
			return acc.concat(getNeighbors(visited, neighbor.y, neighbor.x));
		}, []);

		for (let i = 0; i < bNeighbors.length; i++) {
			const neighbor = bNeighbors[i];

			if (neighbor.openedBy === BY_A) {
				return neighbor.length + iteration;
			} else {
				neighbor.length = iteration;
				neighbor.openedBy = BY_B;
				bQueue.push(neighbor);
			}
		}
	}

	return -1;
};

const getNeighbors = (visited, y, x) => {
	const neighbors = [];

	// up
	if (y - 1 >= 0 && !visited[y - 1][x].closed) {
		neighbors.push(visited[y - 1][x]);
	}

	// down
	if (y + 1 < visited.length && !visited[y + 1][x].closed) {
		neighbors.push(visited[y + 1][x]);
	}

	// left
	if (x - 1 >= 0 && !visited[y][x - 1].closed) {
		neighbors.push(visited[y][x - 1]);
	}

	// right
	if (x + 1 < visited[y].length && !visited[y][x + 1].closed) {
		neighbors.push(visited[y][x + 1]);
	}

	return neighbors;
};

// prettier-ignore
const maze = [
	[2, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 2],
]

const pathFinding = getShortestDistanceLength(maze, [0, 0], [3, 3]);
console.log(pathFinding);
