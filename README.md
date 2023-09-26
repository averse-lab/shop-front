<h1 align="center">
Averse Shop
</h1>

## Node

To avoid incompatibilities between different work environments it's important for everybody to work with the same Node
version. You can use [NVM](https://github.com/nvm-sh/nvm) to install different Node versions and set the correct one by
running :

```bash
nvm use
```

## Yarn

This project have been bootstrapped using Yarn so it's highly recommended to also use this packet manager during
development. If you did the step above, you should now be using Node 18 _(lts/hydrogen)_. Yarn is built into this Node
version and can be used after activating `corepack` by running :

```bash
corepack enable
```

## VSCode

To avoid incompatibilities between different work environments it's important for everybody to work with the same
Typescript version. If you're using VSCode make sure
to [use the workspace version](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript)
and not the VSCode built in one.

_(Optional)_

If you want to use the project specific, optimized, editor configuration, duplicate the `.vscode.sample` sample folder into the VSCode workspace configuration folder `.vscode` by running :

```bash
cp .vscode.sample .vscode
```

## Getting Started

Be sure to have covered all the upcoming sections to ensure a flawless development experience. Documentation has been
redacted to cover all the major steps in chronological order so you better do them one after another.

### Setup environment variables

Create your `.env.local` environment variable file. You can dublicate the `.env.local.example` template file into `.env.local` by running :

```bash
cp .env.local.sample .env.local
```

and replace the placeholders by your own values.

### Install dependencies

```bash
yarn install
```

## Running the app

```bash
# watch mode
$ yarn run dev
```

```bash
# Production mode
$ yarn run start
```
