# Turborepo Sandbox

## Install

```sh
npx create-turbo@latest
? Where would you like to create your Turborepo? turborepo-sandbox
? Which package manager do you want to use? npm

>>> Creating a new Turborepo with:

Application packages
 - apps/docs
 - apps/web
Library packages
 - packages/eslint-config
 - packages/typescript-config
 - packages/ui

>>> Success! Created your Turborepo at turborepo-sandbox

To get started:
- Change to the directory: cd turborepo-sandbox
- Enable Remote Caching (recommended): npx turbo login
   - Learn more: https://turbo.build/repo/remote-cache

- Run commands with Turborepo:
   - npm run build: Build all apps and packages
   - npm run dev: Develop all apps and packages
   - npm run lint: Lint all apps and packages
- Run a command twice to hit cache
```

### [Install dependencies](https://turbo.build/repo/docs/crafting-your-repository/managing-dependencies#best-practices-for-dependency-installation)


```sh
npm install jest --workspace=web --workspace=@repo/ui --save-dev
```

> #### Turborepo does not manage dependencies
> Note that Turborepo does not play a role in managing your dependencies, leaving that work up to your package manager of choice.
>
> It's up to the package manager to handle things like downloading the right external dependency version, symlinking, and resolving modules. The recommendations on this page are best practices for managing dependencies in a Workspace, and are not enforced by Turborepo.

#### To keep dependencies on the same version

##### Use purpose-built tooling

- [syncpack](https://www.npmjs.com/package/syncpack)
- [Manypkg](https://www.npmjs.com/package/@manypkg/cli)
- [sherif](https://www.npmjs.com/package/sherif)

##### Use the feature of package manager

```sh
# npm
npm install typescript@latest --workspaces

# Yarn v1
yarn upgrade-interactive --latest
# Yarn v2
yarn upgrade typescript@latest --upgrade

# pnpm
pnpm up --recursive typescript@latest
```

##### Use an IDE

## Create an internal package

```sh
mkdir packages/math
touch packages/math/package.json
touch packages/math/tsconfig.json
# or
sh -c 'mkdir -p "$(dirname "$0")" && touch "$0"' `echo packages/math/package.json`
sh -c 'mkdir -p "$(dirname "$0")" && touch "$0"' `echo packages/math/tsconfig.json`
```

```json
// package.json
{
  "name": "@repo/math",
  "type": "module",
  "scripts": {
    "dev": "tsc --watch",
    "build": "tsc"
  },
  "exports": {
    "./add": {
      "types": "./src/add.ts",
      "default": "./dist/add.js"
    },
    "./subtract": {
      "types": "./src/subtract.ts",
      "default": "./dist/subtract.js"
    }
  },
  "devDependencies": {
    "@repo/typescript-config": "*", // npm
    // "@repo/typescript-config": "workspace:*", // Yarn or pnpm
    "typescript": "latest"
  }
}
```

```json
// tsconfig.json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

```sh
sh -c 'mkdir -p "$(dirname "$0")" && touch "$0"' `echo packages/math/src/add.ts`
sh -c 'mkdir -p "$(dirname "$0")" && touch "$0"' `echo packages/math/src/subtract.ts`
```

### Add the package to an application

```json
// apps/web/package.json
  "dependencies": {
    "@repo/ui": "*",
+   "@repo/math": "*",
    "next": "^15.2.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
```

```ts
import { add } from "@repo/math/add"; // Add

// ...

export default function Home() {
  return (
    // ...
        <div>{add(1, 2)}</div>
    // ...
  )
}
```

### Edit `turbo.json`

```json
// ./turbo.json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    }
  }
}
```

### Run `turbo build`

```sh
npm run build
```

## Run tasks

### Run multiple tasks

```sh
npx turbo run lint build check-types
```

### Filter

```sh
# by package
turbo build --filter=@acme/web

# by directory
turbo lint --filter="./packages/utilities/*"

# include dependents
turbo build --filter=...@repo/ui

# include dependencies
turbo build --filter=web...
```

```sh
turbo ls --filter ...@repo/ui
```

## Builder and bundler

### Create a vite app

```sh
cd apps
npm create vite@latest vite-app

◇  Select a framework:
│  React
│
◇  Select a variant:
│  TypeScript

cd -
npm install
```

```json
  // apps/vite-app/package.json
  "devDependencies": {
    "@repo/ui": "*",
    // ...
  }
```

## Testing libraries

### jest

```sh
npm install jest ts-jest @types/jest --workspace=@repo/math --save-dev
```