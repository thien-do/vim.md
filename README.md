# Vim.md

This is the monorepo of Vim.md:

- [editor](/editor): The core editor as a library. This also includes the explorer and preferences.
- [desktop](/desktop): The [Electron](https://www.electronjs.org/)-based desktop app of Vim.md
- [web](/web): The web version of Vim.md (at [vim.md/app](https://vim.md/app))

## Development

1. Clone the repo then [`yarn install`](https://classic.yarnpkg.com/en/docs/cli/install) at root. This is a [yarn workspace](https://classic.yarnpkg.com/en/docs/workspaces/).
2. Use VSCode's "NPM SCRIPTS" panel to build or start the app you want:
   - ![Image of NPM SCRIPTS panel](/docs/npm-scripts.png)
   - Apps (like "desktop" and "web") depend on libs (like "editor") so you may need to build libs before build or start an app.
