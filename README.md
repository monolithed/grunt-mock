# grunt-mock

[![npm version badge](https://img.shields.io/npm/v/grunt-mock.svg)](https://www.npmjs.org/package/grunt-mock)
[![Build Status](https://travis-ci.org/monolithed/grunt-mock.png)](https://travis-ci.org/monolithed/grunt-mock)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE.txt)


> The grunt task is used to execute the specified mock-functions and save the result


*In a unit test, mock objects can simulate the behavior of complex, real objects and are therefore useful when a real object is impractical or impossible to incorporate into a unit test.*

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-mock --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-mock');
```

## grunt-mock task
_Run this task with the `grunt mock` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.


### Usage Example

```js
module.exports = function (grunt) {
	grunt.initConfig({
		mock: {
			test: {
				files: {
					'output.json': [ 'mocks/**/*.js' ]
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-mock');
	grunt.registerTask('default', ['mock']);
};
```


*Input file*

```js
module.exports = {
	'mock#1': function () {
		return 1;
	},

	'mock#2': function () {
		return 2;
	}
};
```


*Output file*

```js
{
	"mock#1": 1,
	"mock#2": 2,
}
```


### Options

#### process
Type: `Function (data, original)`<br />
Default: `(data, original) => original;`

This option as an advanced way to control the file contents that are created.

```js
module.exports = function (grunt) {
	grunt.initConfig({
		mock: {
			test: {
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
					'output.json': [ 'mocks/**/*.js' ]
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-mock');
	grunt.registerTask('default', ['mock']);
};
```


*Input file*

```js
module.exports = {
	'mock#1': function () {
		return 1;
	},

	'mock#2': function () {
		return 2;
	}
};
```


*Output file*

```js
[
	{
		"mock#1": 1,
		"mock#2": 2,
	}
]
```


### Tests

```
grunt test
```


### License

MIT


### Links
[Mock object](http://en.wikipedia.org/wiki/Mock_object) <br />


Task submitted by [Alexander Abashkin](https://github.com/monolithed)
