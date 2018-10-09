// master class

/*
	1 - declare function UserCreator in memory and assign to it the function
		definition
	2 - declare object userFunctions in global memory
		a - declare sayName property and assign to it a function definition
		b - declare increment property and assign to it a function de definition
	3 - declare user1 constant in global memory and assign to the returned
		value of calling UserCreator('Pedro', 29)
			a - push UserCreator to the call stack
			b - create new local execution context
			c - declare name parameter and assign it 'Pedro'
			d - declare score parameter and assign it 29
			e - declare newUser constant and assign to it an empty object. In the
				__proto__ property of the created object with assign to it
				both functions defined in userFunctions
			f - declare name property in newUser object and assign it 'Pedro'
			g - declare score property in newUser object and assign it 29
			h - return newUser and assig it to the label user1 in global memory
	4 - call sayName on user1
			a - look for sayName property of user1 (It's not found here)
			b - look for sayName property in user1.__proto__ (Found here)
			c - push sayName to the call stack
			d - log 'I am Pedro' to the console. 'this' in 'this.name' will
				look in the object to the left hand side of the dot notation where the
				function is being called from.
	5 - call increment on user1
			a - look for increment property in user1 (Not found here)
			b - look for increment property in user1__proto__ (Found here)
			c - push function to the call stack
			d - look for 'score' on the object on the left hand side of the
				dot notation from where the function is being called from
			e - increase score in user1 object by 1
*/
function UserCreator(name, score) {
	const newUser = Object.create(userFunctions);
	newUser.name = name;
	newUser.score = score;
	return newUser;
}

const userFunctions = {
	sayName: function() {
		console.log(`I am ${this.name}`);
	},
	increment: function() {
		this.score++;
	},
};

const user1 = UserCreator('Pedro', 29);

user1.sayName();
user1.increment();

// subclass

/*
	1 - declare PaidUserCreator function in global memory and assign to it the
		function definition
	2 - declare paidUserFunction constant in global memory and assign to
		it the object
			a - declare property method increaseBalance and assign to it the
				function definition
	3 - using the initially defined function object Object, look for
		setPrototypeOf property in Object and call it with 'paidUserFunctions' and
		'userFunctions'
			a - This will add to the 'userFunctions' methods as a reference for
				of 'paidUserFunctions' to access the functionalities via its
				__proto__. This step is required in order to assign both functionalities
				(chain) those found in 'paidUserFunctions', and 'userFunctions' to the
				'paidUser1' later on when calling 'PaidUserCreator'
	4 - declare paidUser1 and assign to it the returned value of calling
		PaidUserCreator('Bianca', 33);
			a - push PaidUserCreator('Bianca', 33) to the call stack
			b - create new local execution context
			c - declare newPaidUser constant in local memory and assig to it the
				returned value of calling UserCreator('Bianca', 33)
					I - push UserCreator to the call stack
					II - create new local execution context
					II - declare name parameter and assig it 'Bianca'
					IV - declare score parameter and assig it 33
					V - declare newUser as an empty object with Object.create and
						pass it 'userFunctions' to be set on the object's __proto__
					VI - declare name property on object and assign it 'Bianca'
					VII - declare score property on object and assign it 33
					VIII - return newUser object
			d - assign retuned object to newPaidUser
			e - Using the engine's initially declared Object function object combo,
				access the setPrototype function and call so as to set
				'paidUserFuntions' methods in the newly created
				'newPaidUser's__proto__'
			f - declare parameter accountBalance and assign it argument 3
			g - return newPaidUser object and assign it to 'paidUser1'
	5 - look for increaseBalance in paidUser1
			a - It isn't found as a property of paidUser1
			b - It isn't found as a property of __proto__ on paidUser1
			c - push increaseBalance to call stack
			d - find accountBalance property on the left hand side
				object of the dot notation and increase balance by 1
	6 - look for sayName in paidUser1
		a - It isn't found as a property of paidUser1
		b - It isn't found in paidUser1.__proto__
		c - It's found in paidUser1.__proto__.__proto__
		d - Log name on the object to the left hand side of the
			dot notation from which sayName is being called from.
			This is why the doing
			Object.setPrototypeOf(paidUserFuntions, userFunctions) was
			key in order to chain functinalities and made them
			available to paidUser1
*/
function PaidUserCreator(paidName, paidScore, accountBalance) {
	const newPaidUser = UserCreator(paidName, paidScore);
	Object.setPrototypeOf(newPaidUser, paidUserFunctions);
	newPaidUser.accountBalance = accountBalance;
	return newPaidUser;
}

const paidUserFunctions = {
	increaseBalance: function() {
		this.accountBalance++;
	},
};

Object.setPrototypeOf(paidUserFunctions, userFunctions);

const paidUser1 = PaidUserCreator('Bianca', 33, 3);

paidUser1.increaseBalance();
paidUser1.sayName();

console.log(paidUser1);
console.log(paidUser1.__proto__);
console.log(paidUser1.__proto__.__proto__);
