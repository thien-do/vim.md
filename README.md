# Vim.md

This is the source code of [Vim.md](https://vim.md).

- [web](/web): The web version of Vim.md (at [vim.md/app](https://vim.md))
- [desktop](/desktop): The [Electron](https://www.electronjs.org/)-based
  desktop app of Vim.md

## Develop

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

## Distribute

To distribute the desktop mac app (both "dmg" and "mas"), you would need to provide the following files. They are git-ignored since they are your certificates and secrets.
- desktop/.env: clone from desktop/.env.sample
- desktop/electron-builder.env: clone from desktop/electron-builder.env.sample
- desktop/build/Certificates.p12: your certificates from Apple, exported from keychain
- desktop/build/dev.provisionprofile: download from Apple's developer website
- desktop/build/prod.provisionprofile: download from Apple's developer website
