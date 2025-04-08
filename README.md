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
>
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

### Vite

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

### webpack

```sh
mkdir -p apps/webpack-demo
cd apps/webpack-demo
npm init -y

cd -
npm install react react-dom --workspace=webpack-demo
npm install typescript @types/react @types/react-dom \
  webpack webpack-cli webpack-dev-server \
  ts-loader html-webpack-plugin \
  babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript \
  css-loader style-loader \
  --workspace=webpack-demo --save-dev

cd -

touch tsconfig.json
touch webpack.config.mjs

sh -c 'mkdir -p "$(dirname "$0")" && touch "$0"' `echo src/index.tsx`
sh -c 'mkdir -p "$(dirname "$0")" && touch "$0"' `echo src/App.tsx`
sh -c 'mkdir -p "$(dirname "$0")" && touch "$0"' `echo public/index.html`
```

### rspack

```sh
mkdir apps/rspack-demo
cd apps/rspack-demo
pnpm init

pnpm add react react-dom
pnpm add -D @rspack/core @rspack/cli typescript ts-node @types/react @types/react-dom

touch tsconfig.json
touch rspack.config.mjs

sh -c 'mkdir -p "$(dirname "$0")" && touch "$0"' `echo src/index.tsx`
sh -c 'mkdir -p "$(dirname "$0")" && touch "$0"' `echo public/index.html`
```

```json
  // package.json
  "scripts": {
    "dev": "rspack serve",
    "build": "rspack build"
  },
  "devDependencies": {
+   "@repo/typescript-config": "*",
    "@rspack/cli": "^1.2.8",
    "@rspack/core": "^1.2.8",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
-   "typescript": "^5.8.2",
    "ts-node": "^10.9.2"
  }
```

## Linter / Formatter / type-checker

### ESLint

https://turbo.build/repo/docs/guides/tools/eslint

### Biome

https://turbo.build/repo/docs/guides/tools/biome

```sh
npm install --save-dev --save-exact @biomejs/biome
npx @biomejs/biome init --jsonc
```

### TypeScript

https://turbo.build/repo/docs/guides/tools/typescript

## Testing tools

### Jest

https://turbo.build/repo/docs/guides/tools/jest

```sh
npm install jest ts-jest @types/jest --workspace=@repo/math --save-dev
```

#### Issue

It worked with jest.config.js but not worked with jest.config.ts.
https://github.com/vercel/turborepo/issues/4126

### Vitest

https://turbo.build/repo/docs/guides/tools/vitest

```sh
npm install vitest vite-tsconfig-paths --workspace=@repo/hello --save-dev
```

### React Testing Library

```sh
npm install jest ts-jest @types/jest jest-environment-jsdom --workspace=@repo/ui --save-dev
npm install @testing-library/react @testing-library/dom @types/react @types/react-dom --workspace=@repo/ui --save-dev
```

### Playwright

https://turbo.build/repo/docs/guides/tools/playwright

```sh
npm install @playwright/test --workspace=web --save-dev
cd apps/web
npx playwright install
touch playwright.config.ts
```

### Playwright-ct

```sh
cd packages/ui
npm init playwright@latest -- --ct
```

```sh
npx turbo run test:ct -- --update-snapshots
```

### MSW

```sh
mkdir -p packages/msw/src
cd packages/msw
npm init -y

cd -
npm install msw --workspace=@repo/msw --save-dev

touch packages/msw/src/handler.ts
touch packages/msw/src/browser.ts
```

## Others

### Knip

https://knip.dev/features/monorepos-and-workspaces

```sh
npm init @knip/config
```

### dependency graph

```sh
npm install --save-dev dependency-cruiser

npx depcruise --init
✔ This looks like mono repo. Is that correct? … yes
✔ Mono repo it is! Where do your packages live? … packages
✔ Do your packages use dependencies declared in the root of your repo? … no
✔ Do you want to detect JSDoc imports as well (slower)? … no

npx depcruise packages --include-only "^packages" --output-type dot | dot -T svg > dependency-graph.svg
```

### Storybook

https://turbo.build/repo/docs/guides/tools/storybook

### affected

```sh
turbo run --affected
```

### remote cache

https://turbo.build/repo/docs/core-concepts/remote-caching

```sh
npx turbo login
npx turbo link
```

### Nested packages

https://github.com/baptisteArno/typebot.io/blob/main/packages/blocks/base/package.json

```sh
sh -c 'mkdir -p "$(dirname "$0")" && touch "$0"' `echo packages/nested/ja/package.json`
sh -c 'mkdir -p "$(dirname "$0")" && touch "$0"' `echo packages/nested/en/package.json`

sh -c 'mkdir -p "$(dirname "$0")" && touch "$0"' `echo packages/nested/ja/tsconfig.json`
sh -c 'mkdir -p "$(dirname "$0")" && touch "$0"' `echo packages/nested/en/tsconfig.json`

sh -c 'mkdir -p "$(dirname "$0")" && touch "$0"' `echo packages/nested/ja/src/hello.ts`
sh -c 'mkdir -p "$(dirname "$0")" && touch "$0"' `echo packages/nested/en/src/hello.ts`
```

```json
  // package.json
  "workspaces": ["apps/*", "packages/*", "packages/nested/*"]
```

### tsup

```sh
sh -c 'mkdir -p "$(dirname "$0")" && touch "$0"' `echo packages/ui-tsup/package.json`
sh -c 'mkdir -p "$(dirname "$0")" && touch "$0"' `echo packages/ui-tsup/tsconfig.json`
npm install
```

```sh
npm install tsup --workspace=@repo/ui-tsup --save-dev
sh -c 'mkdir -p "$(dirname "$0")" && touch "$0"' `echo packages/ui-tsup/turbo/generators/templates/component.hbs`
sh -c 'mkdir -p "$(dirname "$0")" && touch "$0"' `echo packages/ui-tsup/turbo/generators/config.ts`
```

```sh
cd packages/ui-tsup

npm run generate:component
? What is the name of the component? Button
>>> Changes made:
  • /src/button.tsx (add)
  • /package.json (append)

cd -
```

### Managing dependencies

- [syncpack](https://github.com/JamieMason/syncpack)
- [manypkg](https://github.com/Thinkmill/manypkg)
- [sherif](https://github.com/QuiiBz/sherif)

```sh
npm install typescript@latest --workspaces
```

### patch-package

Install to all via,

```sh
npm install patch-package --workspaces --save-dev
```

```sh
npx patch-package PACKAGE
```

`patch-package` works each.
It means that all apps/packages should have `post-install` and patches in each.

### Syncpack

Install syncpack:

```sh
npm install -D syncpack
```

```sh
npm run check:deps
npm run format:deps
```
