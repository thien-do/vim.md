# Vim.md

This is the source code of [Vim.md](https://vim.md).

- [web](/web): The web version of Vim.md (at [vim.md/app](https://vim.md))
- [desktop](/desktop): The [Electron](https://www.electronjs.org/)-based
  desktop app of Vim.md

## Contributing

The "web" project is the actual app. It is used on both the web and desktop versions. You'll always need to run it:

```sh
cd ./web && yarn start
```

This starts the CRA local server at [localhost:3000](http://localhost:3000). It has built-in auto-compile and auto-reload. If you only need to work on the "web" version, you don't need to do anything else.

To work on the desktop version, you also need to start the electron app:

```sh
cd ./desktop && yarn start
```

This uses the CRA local server above, so changes inside "web" are automatically applied. However, changes in "desktop" require a restart of the desktop server.

Because of this difference, we intentionally don't have a single "yarn start" at root.
