/*
	1 - declare UserCreator class which creates a function + object
		and gets assigned a function defintion. In the object part of
		UserCreator, 'prototype' property is declared and assigned and empty object. The function part of UserCreator is titled 'constructor' to
		be ran at a later time when we invoke UserCreator.
	2 - declare sayName property in the 'prototype' object of the
		function declared from UserCreator and assign it a function definition
	3 - declare increment property in the 'prototype' object from
		UserCreator and assign to it the function definition
	4 - declare user1 constant in global memory and assign to it the returned
		value of calling UserCreator('Pedro', 4) with 'new' keyword which will
		invoke the 'constructor' titled function
			a - create new local execution context
			b - declare parameter name and assign it argumet 'Pedro'
			c - declare parameter score and assign it argument 4
			d - declare 'this' object and assign it empty object
			e - link 'this.__proto__' to the 'prototype' object in UserCreator
			f - declare property 'name' on 'this' object and assign it 'Pedro'
			g - declare property 'score' on 'this' object and assign it 4
			h - return 'this' object and assign it to the global label user1
				in global memory
	5 - lookup increment function on user1 to be invokec
			a - not found as property of user1
			b - look in __proto__ of user1, which links to the 'prototype' object
				of UserCreator and find increment method
			c - create new local execution context
			d - declare 'this' and assig it the object to the left hand side of
				the dot notation from where increment is being called. In this
				case user1
			e - log to the console 'I am Pedro'
*/
class UserCreator {
	constructor(name, score) {
		this.name = name;
		this.score = score;
	}
	sayName() {
		console.log(`I am ${this.name}`);
	}
	increment() {
		this.score++;
	}
}

const user1 = new UserCreator('Pedro', 4);
user1.sayName();

/*
	1 - declare class PaidUserCreator which is a function + object and
		assign it the function definition with the subtitle of 'constructor',
		whereas the object part gets declared a property 'prototype' which
		is itself an empty object. Since we are using the 'extends' keyword
		here, the linkage from 'prototype.__proto__' to the 'prototype'
		object of UserCreator will get auto generated. The 'extends' keyword
		will also create a link to the constructor of UserCreator via the
		__proto__ on the object part of PaidUserCreator that otherwise will
		link to the Function prototype. This link to the constructor will
		be use by 'super' later on. Below is what we get from using
		'class' and 'extends'
		PaidUserCreator: [f] + {
															prototype: {
																increaseBalance: [f]
																__proto__: UserCreator.prototype
															},
															__proto__: UserCreator.constructor
														}
	2 - declare increaseBalance function in the PaidUserCreator.prototype
		object and assign to it the function definition
	3 - declare paidUser1 constant and assign to the returned value of
		calling PaidUserCreator('Bianca', 3, 5) with the 'new' keyword
			a - create a new local execution context
			b - declare parameter name and assign it argument 'Bianca'
			c - declare parameter score and assign it 3
			d - declare parameter accountBalance and assign it 5
			e - declare 'this' and leave uninitialize as its value will be the
					returned value of super
			f - call super('Bianca', 3) which is calling UserCreator('Bianca, 3)
						the 'new' keyword
				I - create new local execution context
				II - declare parameter name and assign it argument 'Bianca'
				III - declare parameter score and assign it argumet 3
				III - declare 'this' constant and assign it empty object with
						its __proto__ linked to the PaidUserCreator.prototype
				IV - declare property name in 'this' object and assig it 'Bianca'
				V - declare property score in 'this' object and assign it 3
				VI - return 'this' object
			g - 'this' that was previously uninitialized gets assigned the
				value of 'this' object returned from super('Bianca', 3)
			h - declare property accountBalance in 'this' object and assign it 5
			i - returned 'this' object and assign its value to the label in
					global memory paidUser1
*/
class PaidUserCreator extends UserCreator {
	constructor(name, score, accountBalance) {
		super(name, score);
		this.accountBalance = accountBalance;
	}
	increaseBalance() {
		this.accountBalance++;
	}
}

const paidUser1 = new PaidUserCreator('Bianca', 3, 5);
paidUser1.sayName();
