/*
	fib(6)
	-> fib(5) + fib(4)
	-> fib(4) + fib(3) + fib(3) + fib(2)
	-> fib(3) + fib(2) + fib(2) + fib(1) + fib(2) + fib(1) + fib(2)
	-> fib(2) + fib(1) + fib(2) + fib(2) + fib(1) + fib(2) + fib(1) + fib(2)
	-> 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 === 8
*/
function fibonacci(n) {
	if (n <= 2) return 1;
	return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(6));

for (let i = 1; i <= 20; i++) {
	console.log(`sequence: ${i} --- fibonacci: ${fibonacci(i)}`);
}
