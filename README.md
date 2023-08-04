# Jolt

Acceleration is defined to be the rate of change of speed.
"Jerk" (yes that's true) is defined to be the rate of change of acceleration.
"Jolt" is defined to be the rate of change of jerk.

Custom [Revolt](https://www.github.com/revoltchat) client for desktop machines made in Tauri and Svelte.

## Build

### Prerequisites

To build Jolt for your own machine, first run the following command to install NPM packages: `npm install`, then you need some prerequisites, they are included in the [`shell.nix`](shell.nix) and [`flake.nix`](flake.nix) files. If you are on NixOS, just run `nix develop` (recommended) or `nix-shell shell.nix`. If not, you will have to install the packages and libraries listed [`shell.nix`](shell.nix) or [`flake.nix`](flake.nix) and add the libraries to the `LD_LIBRARY_PATH` variable (see `shellHook` in [`flake.nix`](flake.nix) or [`shell.nix`](shell.nix)).

### Build Process

Edit the [Tauri configuration file](src-tauri/tauri.conf.json) and change `beforeBuildCommand` to the NPM package manager of your choice then run the following command (adapting to the NPM package manager of your choice):

```bash
pnpm run tauri build # (or "npm run tauri dev", "yarn run tauri dev", etc.)
```

## Development Server

If you want to test the application before building it, you can run it in a development server.

First, edit the [Tauri configuration file](src-tauri/tauri.conf.json) and change `beforeDevCommand` to the NPM package manager of your choice and then run the following command (obviously, adapting to the NPM package manager of your choice):

```bash
pnpm run tauri dev # (or "npm run tauri dev", "yarn run tauri dev", etc.)
```

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer).
