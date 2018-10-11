function basicRecursion(max, current) {
	if (current > max) return; // base case
	console.log(current);
	basicRecursion(max, current + 1);
}

basicRecursion(5, 1);
