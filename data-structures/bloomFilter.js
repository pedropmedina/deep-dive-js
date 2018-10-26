const XXH = require('xxhashjs');

const hash1 = string =>
	Math.abs(
		XXH.h32(0xabcd)
			.update(string)
			.digest()
			.toNumber() % 100,
	);

const hash2 = string =>
	Math.abs(
		XXH.h32(0x1234)
			.update(string)
			.digest()
			.toNumber() % 100,
	);

const hash3 = string =>
	Math.abs(
		XXH.h32(0x6789)
			.update(string)
			.digest()
			.toNumber() % 100,
	);

class BloomFilter {
	constructor() {
		this._array = new Array(100).fill(0);
	}

	add(string) {
		const hashes = [hash1(string), hash2(string), hash3(string)];

		hashes.forEach(index => (this._array[index] = 1));
	}

	contains(string) {
		return !!(
			this._array[hash1(string)] &&
			this._array[hash2(string)] &&
			this._array[hash3(string)]
		);
	}
}

const bloomFilter = new BloomFilter();

bloomFilter.add('luca');

console.log(bloomFilter.contains('luca'));

console.log(bloomFilter._array);
