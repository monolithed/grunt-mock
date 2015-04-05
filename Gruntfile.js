'use strict';

module.exports = function (grunt) {
	grunt.initConfig({
		mock: {
			standard: {
				options: {
					process: function (data, original) {
						return original;
					}
				},

				files: {
					'cache/actual/standard.json': [ 'tests/fixtures/**/*.js' ]
				}
			},

			custom: {
				options: {
					process: function (data, original) {
						var output = {};

						data.forEach(function (mocks) {
							for (var mock in mocks.data) {
								output[mock] = mocks.data[mock](mock, mocks.file);
							}
						});

						return JSON.stringify([ output ], null, '\t');
					}
				},

				files: {
					'cache/actual/custom.json': [ 'tests/fixtures/**/*.js' ]
				}
			}
		},

		nodeunit: {
			tasks: ['tests/test.js']
		}
	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	grunt.registerTask('test', ['mock', 'nodeunit']);
	grunt.registerTask('default', ['test']);
};
