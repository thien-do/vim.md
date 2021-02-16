Main scritps:

- start: Start local development. This uses the app at localhost:3000.
	- Require "yarn start" in "../web" project first.
- dist: Build distributable packages. This uses the app at "../web/build".
	- Require "yarn build" in "../web" project first.

Underlying scripts:

- _compile: Compiles typescript files to javascript so they can be used with electron
- _clean: Delete distribution folder
- _extract: Extract the packaged bundle for debugging purpose.

Auto scripts:
- postinstall: Auto run after installs, to ensure all dependencies are up-to-date.
