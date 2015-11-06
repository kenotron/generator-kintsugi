### OWA Next
This is the area where all the Typescript code goes for the next version of OWA. All commands below assume that we are working under "ClientNext" directory:

    cd %INETROOT%\sources\dev\owa\src\clientnext

### Getting Started
To get started, we need to install node.js and run the env.cmd

1. Install node.js - https://nodejs.org/
2. Run the setup script inside an enlistment window

	bin\setup.cmd

### Preparing Packages (and every time you do a SD SYNC)
All the source files belong in "packages" directory, and they need to be prepared. This needs to be run every time you do a SD SYNC.

1. If you noticed, after a SD SYNC + reopen enlistment window that it installed a new version of the Microsoft.Exchange.Owa.Client.NodeModules nuget package, then:
 
	npm install

2. Do a full ClientNext build to get inter-dependencies built:

	msbuild
	
3. Establish symlinks so that the dependencies are established within npm for all owa-* packages:
	
	bin\prep.cmd

### Editing files
This is done quite manually, currently. And is a two-step process for now:

1. Open up Visual Studio Code to edit files. 

	code .
	
2. Run the gulp (watch) and webpack-dev-server

	bin\dev.cmd
	
3. Open browser to a local passthrough proxy, and refresh 2 times so that the proxy can pick up on the fact that there is a Webpack Dev Server serving out files required by slabmanifest.xml (slabmanifest.xml is cached, and takes a couple of refreshes to clear it). Currently ClientNext is only enabled within the React flight, so try this URL out:

	http://localhost/owa/?features=Dogfood,React
	
Of course, if your pass through proxy points to a different vdir, use that.
 
### Gulp subset of projects based on dependencies

To edit subset of projects, simply specify it when calling bin/dev.cmd

Example 1: Run gulp on single project

	bin/dev.cmd owa-core
	
Example 2: Run gulp on multiple project

	bin/dev.cmd owa-core owa-mail-maillistview
	
Example 3: Run gulp on projects, but only up to certain depth

	bin/dev.cmd owa-foo owa-bar -d 2
	