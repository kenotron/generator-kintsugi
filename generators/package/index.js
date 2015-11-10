var generators = require('yeoman-generator');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
	isExistingProject: false,
	
	constructor: function () {
		generators.Base.apply(this, arguments);
		
		this.argument('appname', { type: String, required: false });
		this.option('stack', { type:String, defaults: 'react-redux' }); // e.g. react-redux, react-mobservable
	},
	
	initializing: {
		checkExistingProject: function () {
			if (this.appname) {
				this.destinationRoot(path.join("packages", this.appname));
			}
			
			if (fs.existsSync(this.destinationPath('package.json'))) {
				this.isExistingProject = true;
			}
		}
	},
	
	prompting: {
		promptForName: function() {
			if (!this.isExistingProject) {
				var done = this.async();
				
				var prompts = [];

				if (!this.appname) {
					prompts.push({
						type    : 'input',
						name    : 'appname',
						message : 'Your package name:',
						default : this.appname // Default to current folder name
					});
				}

				if (!this.options['stack']) {
					prompts.push({
						type	: 'list',
						name	: 'stack',
						message	: 'What type of stack to use?',
						default	: this.options.stack,
						choices	: ['react-redux', 'react-mobservable']
					});
				}
				
				this.prompt(prompts, function (answers) {
					if (answers.appname) {
						this.appname = answers.appname;
						this.destinationRoot(path.join("packages", this.appname));
					}
					
					if (answers.stack) {
						this.options.stack = answers.stack;
					}
					
					this.sourceRoot(path.resolve(this.sourceRoot(), this.options.stack));
					
					done();
				}.bind(this));
			} else {
				this.sourceRoot(path.resolve(this.sourceRoot(), this.options.stack));
			}
		}
	},
	
	configuring: {},

	writing: {
		writeAppStructure: function() {
			console.log(this.templatePath('**/*'));
			
			this.fs.copyTpl(
				this.templatePath('**/*.*'),
				this.destinationPath('./'),
				this
			);
		}
	},

	install: function() {
	},
		
	end: {
		showNextSteps: function() {
						
		}
	}	
});