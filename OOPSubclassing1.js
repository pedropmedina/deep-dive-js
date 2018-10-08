// master class

/*
	1 - declare UserCreator function + object in global memory and assign it a
		function definition. Along with the declaration of UserCreator, an object
		with property 'prototype' is also created which value is an empty object
	2 - declare sayName function in UserCreator.prototype and assign to it
		a function definition
	3 - declare increment in UserCreator.prototype and assign to it a
		function definition
	4 - declare user1 constant and assign to it the returned value of
		invoking UserCreator('Pedro', 3) with the 'new' keyword
			a - push UserCreator('Pedro', 3) to the call stack
			b - declare 'this' constant and assign to it an empty object
			c - bind __proto__ in 'this' object to the 'prototype' object in
				UserCreator
			d - declare parameter name and assign to it the argument 'Pedro'
			e - declare parameter score and assign to it argument 3
			f - declare property name in 'this' object and assign to it 'Pedro'
			g - declare property score in 'this' object and assign it 3
			h - return 'this' object and assig it to user1 in global memory
*/
function UserCreator(name, score) {
	this.name = name;
	this.score = score;
}

UserCreator.prototype.sayName = function() {
	console.log(`I am ${this.name}`);
};

UserCreator.prototype.increment = function() {
	this.score++;
};

const user1 = new UserCreator('Pedro', 3);

// subclass

/*
	1 - declare PaidUserCreator function + object in global memory and assign it
		a function definition. Again!, every function is also an object, and
		in the object side, there is always the 'prototype' property that
		gets assigned an empty object
	2 - Assigned to PaidUserCreator.prototype.__proto__ the object
		prototype object by calling Object.create(UserCreator.prototype).
		This will create an empty object in PaidUserCreator.prototype and
		assign the object found in UserCreator.prototype with all the
		functionalities down to the __proto__ object in PaidUserCreator.prototype
	3 - declare increaseBalance function in PaidUserCreator.prototype and
		assign it a function definition
	4 - declare constant paidUser1 in global memory and assign it the
		returned value of calling PaidUserCreator('Bianca', 5, 20) with the
		'new' keyword
			a - create new local execution context
			b - declare 'this' as an empty object in local memory
			c - bind this.__proto__ to the 'prototype' in PaidUserCreator
			d - push PaidUserCreator to the call stack
			e - look for 'call' function in UserCreator
				I - not found as property of UserCreator
				II - found in the Function __proto__
			f - declare name parameter and assign it 'Bianca'
			g - declare score parameter and assign it 3
			h - declare accountBalance and assign it 5
			i - UserCreator.call(this, 'Bianca', 5). Note that here we are calling
				UserCreator with the 'this' object just created by the 'new' keyword.
				This is known as constructor chaining. By calling UserCreator with
				'call' instead the 'new' keyword, we avoid all the functionality
				auto generated by 'new' since all we need is the constructor of
				UserCreator to use 'name' and 'score' with the 'this' object
				creating from calling PaidUserCreator with new.
				In other words 'call' allows to take controll of how we invoke
				UserCreator function, dropping the need to carry with the
				automation of functionality created by using 'new' which in this
				case we do not need.
					I - create a new execution context
					II - declare name property on 'this' object created by PaidUserCreator
						and assign it 'Bianca'
					III - declare score property on 'this' object and assign it 3
			j - declare accountBalance on 'this' object and assign it 5
			k - return 'this' object and assign it to paidUser1 in global memory
*/

function PaidUserCreator(name, score, accountBalance) {
	UserCreator.call(this, name, score);
	this.accountBalance = accountBalance;
}

PaidUserCreator.prototype = Object.create(UserCreator.prototype);

PaidUserCreator.prototype.increaseBalance = function() {
	this.accountBalance++;
};

const paidUser1 = new PaidUserCreator('Bianca', 5, 20);

paidUser1.increaseBalance();
paidUser1.sayName();