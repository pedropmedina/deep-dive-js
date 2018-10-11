const people = [
	{
		name: 'Pedro',
		age: 29,
	},
	{
		name: 'Bianca',
		age: 33,
	},
];

// destructoring array
const [person1, person2] = people;

console.log(person1);
console.log(person2);

// destructoring object
const { name, age } = person1;

console.log(name);
console.log(age);
