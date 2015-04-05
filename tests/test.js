'use strict';

var fs = require('fs');

exports.tests = {
	standard: function (test) {
		var fixtures = fs.readFileSync('./cache/actual/standard.json', 'utf8'),
			expected = fs.readFileSync('./tests/expected/standard.json', 'utf8');

		test.equal(fixtures, expected);
		test.done();
	},

	custom: function (test) {
		var fixtures = fs.readFileSync('./cache/actual/custom.json', 'utf8'),
			expected = fs.readFileSync('./tests/expected/custom.json', 'utf8');

		test.equal(fixtures, expected);
		test.done();
	}
};
