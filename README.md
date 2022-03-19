# 🖕iCloud (from 🔋's everywhere)

## iCloud NoSync node

This package gives you access to `nsn` command which does some work to stop iCloud from syncing `node_modules` and forever eating your processing power, bandwidth, and battery.

To use:

```sh
# Install tool
yarn global add @daniel765/node-nosync-icloud
```
```sh
# Install dependencies with yarn
nsn

# Or install dependencies with npm
nsn -m npm
```
- `-m` flag: is what package manager `yarn/npm` that you want to use. Default  package manager is `yarn`
- `-n` flag will prevent it from creating/modifying `.gitignore` file

The script does a few things to work:

- Step 1: if no `node_modules` is detected it will `yarn/npm install` for you
- Step 2: Rename `node_modules` to `node_modules.nosync`
- Step 3: Add symlink `node_modules` -> `node_modules.nosync` so stuff still works
- Step 4: Add entry to `.git/info/exclude` to ignore the newly created `node_modules` symlink and `node_modules.nosync`
- Step 5: Add entry to `.gitignore` to ignore the `node_modules` folder
- Step 6: 💰💰💰?

### Special thx to Apple for not creating an ignore setting 🙄

## To prevent iCloud from syncing any folder in Finder

https://github.com/danielpham765/icloud-nosync-node
