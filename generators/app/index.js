var generators = require('yeoman-generator');
var fs = require('fs');
var path = require('path');

module.exports = generators.Base.extend({
	isExistingProject: false,
	
	constructor: function () {
		generators.Base.apply(this, arguments);
		
		this.argument('appname', { type: String, required: false });
		this.option('stack', { defaults: 'react-redux' }); // e.g. react-redux, react-mobservable
	},
	
	initializing: {
		checkExistingProject: function () {
			if (this.argument['appname']) {
				this.destinationRoot(this.argument['appname']);
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
				this.prompt([
					{
						type    : 'input',
						name    : 'appname',
						message : 'Your project name:',
						default : this.appname // Default to current folder name
					},
					
					{
						type	: 'list',
						name	: 'stack',
						message	: 'What type of stack to use?',
						default	: this.options.stack,
						choices	: ['react-redux', 'react-mobservable']
					}
				
				], function (answers) {
					this.argument['appname'] = answers.appname;
					this.destinationRoot(answers.appname);
					
					this.option['stack'] = answers.stack;
					this.sourceRoot(path.resolve(this.sourceRoot(), answers.stack));
					
					done();
				}.bind(this));
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
		this.installDependencies({
			npm: true,
			bower: false
		});
	},
		
	end: {
		showNextSteps: function() {
			console.log("isExistingProject: " + this.isExistingProject);			
		}
	}	
});