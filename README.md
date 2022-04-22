# Screenshot
A library which wraps `puppeteer` to make it easy taking screenshots

# Installation
- cli
```sh
npm i -g @glowsrc/screenshot
```
- node
```sh
npm i @glowsrc/screenshot
```

# Typescript & NodeJs

```ts
import { ScreenShot } from "@glowsrc/screenshot";
import { writeFile } from "node:fs/promises";
const shotter = new ScreenShot()
shotter.screenshot("https://npmjs.org/")
    .then(buf => writeFile("image.png", buf))
    .then(() => shotter.destroy())
```

# Browser 

No supports;

# Cli

```sh
ss https://npmjs.com/ screen.png(if nothing, image.png)
```