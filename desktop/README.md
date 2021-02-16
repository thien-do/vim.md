Main scritps:

- start: Start local development. This uses the "web" app at localhost:3000.
	- Require "yarn start" in "../web" project first.
- dist: Build a distributable package. This uses the "web" app at "../web/build".
	- Require "yarn build" in "../web" project first.
- extract: Extract the packaged bundle for debugging purpose.

Underlying scripts:

- compile: Compiles typescript files to javascript so they can be used with electron
- clean: Delete distribution folder
- postinstall: Auto run after installs, to ensure all dependencies are up-to-date.
