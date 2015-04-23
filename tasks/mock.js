/*!
 * grunt-mock
 *
 * @author Abashkin Alexander <monolithed@gmail.com>
 * @license MIT, 2015
 */

'use strict';

var path = require('path');

module.exports = function (grunt) {
	grunt.registerMultiTask('mock', 'Mock data', function () {
		var options = this.options(),
			process = [];

		this.files.forEach(function (files) {
			files.src.forEach(function (file) {
				if (!grunt.file.isFile(file)) {
					return 0;
				}

				try {
					file = path.resolve('.', file);

					process.push({
						file: file,
						data: require(file)
					});
				}
				catch (error) {
					grunt.fail.fatal('[File reading]\n - \n' + file +
						'\n' + error.stack, -1);
				}
			});

			var output = {};

			process.forEach(function (mocks) {
				for (var mock in mocks.data) {
					try {
						output[mock] = mocks.data[mock](mock, mocks.file);
					}
					catch (error) {
						grunt.fail.fatal('[Mock execution]\n - ' +
							mock + ': ' + error.stack + ' in ', -1);
					}
				}
			});

			var content = JSON.stringify(output, null, '\t');

			if (options.process) {
				content = options.process(process, content);
			}

			grunt.file.write(files.dest, content);
			grunt.log.oklns('File "' + files.dest + '" created.');
		});
	});
};
