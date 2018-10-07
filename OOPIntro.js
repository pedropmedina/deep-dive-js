/*
	1 - declare createUser function in memory and assign it its definition
	2 - declare user1 in memory and assign it the return value of calling
		createUser with arguments 'Pedro' 29
			a - create new local execution context
			b - declare name parameter and assign it 'Pedro' in local memory
			c - declaree age parameter and assign it argument 29 in local memory
			d - declare user label and assign it empty object
			e - declare name property under user and assign it 'Pedro'
			f - declare age property under user and assign it 29
			g - declare increment method and assign it its function definition
			h - return user obeject
	3 - assign user object to label user1 in global memory

	NOTE: The same steps are repeated when defining user2. Although, being
	a simple approach to automate the creation of user, this will implicate
	that we add increment method to all users created in memory. This
	is a waste of memory as increment has the same functionality across
	all users. Oposite to properties such as name and age that are
	specific by user, increment should only be defined once and use
	when needed across all users, saving us a ton of space in memory.
	This is when __proto__ becomes usefull as it allows functions to be
	defined once and use accross all instances when needed.
*/
function createUser(name, age) {
	const user = {};
	user.name = name;
	user.age = age;
	user.increment = function() {
		user.age++;
	};
	return user;
}

const user1 = createUser('Pedro', 29);
const user2 = createUser('Bianca', 33);

console.log(user1, user2);

/*
	Manual way of accomplishing OOP in javascript. (It is just a reference to linked object in __proto__ that has to be manually setup with Object.create):

 1 - declare function createUser in global memory and assign it its definition
 2 - declare incrementAge object with properties: increment: assigned function
	and log: assigned function definition
3 - declare user1 constant and global memory and assign it the returned value
	of calling createUser('Pedro', 29)
		a - create a local execution context for createUser
		b - declare user constact and assign it an empty array with reference
			in __proto__ to object incrementAge which holds two methods
		c - declare name property and assign it 'Pedro'
		d - declare age property in user object and assign it 29
		e - return user object { name: 'Pedro', age: 29 }
4 - assign returned value {name: 'Pedro', age: 29 } to user1

... The next line in the thread of execution will go through the same
	steps as above. Now, when we call increment(2) on user1, javascript
	is going to look for increment method in user1, upon no finding it
	there, it will look in the __proto__ object and find it there. The
	followings steps illustrate the steps completed upon invokation:
		1 - create new local execution context
		2 - javascript automatically declares 'this' variable in the
			current execution context and assign to it the place from
			where the function is being called, the place on the left side
			of the dot notation. In our case, the reference is user1
		3 - the engine will look for age under user1 and increment age to 31
		4 - return undenfined

*/
function createUser(name, age) {
	const user = Object.create(incrementAge);
	user.name = name;
	user.age = age;
	return user;
}

const incrementAge = {
	increment: function(num) {
		this.age += num;
	},
	log: function() {
		console.log(`user is currently ${this.age} years old.`);
	},
};

const user1 = createUser('Pedro', 29);
const user2 = createUser('Bianca', 33);

console.log(user1);
console.log(user1.increment(2));
console.log(user1.log());

/*
	Automated way of creating OOP in javascript with 'new' keyword

	1 - declare CreateUser in global memory and assign it its function definition
	2 - declare under prototype object of CreateUser method increment and
		assign it a function definition. (Functions are objects with the
			ability of being called. One of the property in function object
			is 'prototype' where we store functionality to be reference across
			all instances of the function )
	3 - declare under prototy object of CreateUser method log and assign
		it a function definition
	4 - declare user1 in global memory and assign it the returned value of
			calling CreateUser('Pedro', 29) with the 'new' keyword which automates
			the creation of 'this' object and the reference of __proto__ in 'this'
			object to the 'prototype'
				a - create a new local execution context
				b - declare parameter name with argument 'Pedro'
				c - declare parameter age with argument 29
				d - create 'this' object which __proto__ references the prototype
					object in CreateUser. (NOTE: 'this' object is not the same as
					as the 'this' keyword when executing a method in an object
					that referes to the left side object of the dot notation. 'This'
					here referes to the newly created object inside of the function)
				e - declare property name in 'this' object and assign it 'Pedro'
				f - declare property age in 'this' object and assign it 29
	5 - assign the created object in 'this' to user1

	... declaring user2 goes through the same steps as seen above

*/
function CreateUser(name, age) {
	this.name = name;
	this.age = age;
}

CreateUser.prototype.increment = function(num) {
	this.age += num;
};

CreateUser.prototype.log = function() {
	console.log(`${this.name} is ${this.age} years old.`);
};

const user1 = new CreateUser('Pedro', 29);
const user2 = new CreateUser('Bianca', 33);

/*
	Exploring the use of subfunctions and the behavior of this when
	calling the function, as well as the fix to the issue with the
	use of arrow => functions
	1 - declare function User in global memory and assign to it its function
		definition as weel as the object combo with property 'prototype' that
		gets assigned an empty object
	2 - declare incrementAge in prototype object found in the User label
		in global memory and assign to it the function definition
	3 - declare user1 in global memory and assign to it the returned value
		of calling User('Pedro, 29) with the keyword 'new' which will
		automote the creating of the the object 'this' with __proto__ that
		will refer to 'prototype' property under User
			a - create a new local execution context
			b - declare 'this' variable and assign it an empty object with the
			__proto__ bond to the 'prototype' property found in the object
			part of User function (this is the equivalent of manually creating
			empty object with Object.create)
			c - declare parameter name and assign it 'Pedro'
			d - declare parameter age and assign it 29
			e - declare property name in 'this' object and assign it 'Pedro'
			f - declare property age in 'this' object and assign it 29
			g - automatically return the 'this' object
			h - assign the returned 'this' object to the use1 constant in
				global memory
	4 - run 'incrementAge' function attached to use1 label in global memory
				a - look for incrementAge in user1 (Not found here)
				b - look for incrementAge in __proto__ which will refere to
					'prototype' property in the object found under User function
					( method incrementAge is found here)
				c - create a new local execution context
				d - declare constant increment and assign it the function
					definition
				e - call increment function
					I - create new local execution context
					II - increment age by one (Since we are using an arrow function
						the 'this' keyword is statically assigned, meaning that 'this'
						refers to the place where the arrow function was defined, not
						the place where it was called, therefore, 'this' will be
						refering to left object of the dot notation when calling
						incrementAge on user1. user1 is 'this', and there is where
						we look for age. Using a regular function definition would
						have assign 'this' to the 'window object' instead as
						it would have been looking for the left side hand of the
						dot notation on invocation which in that case is undefined, there
						window becomes 'this' )
					III - return new incremented age value
	5 - assign new age value to age property in user1
 */

function User(name, age) {
	this.name = name;
	this.age = age;
}

User.prototype.incrementAge = function() {
	const increment = () => this.age++;
	return increment();
};

const user1 = new User('Pedro', 29);
user1.incrementAge();
