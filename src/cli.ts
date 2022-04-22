#!/usr/bin/env node
import { argv } from "node:process";
import { ScreenShot } from "./";
import chalk from "chalk";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const args = argv.slice(2);

(async () => {
	if (!args[0]) return console.log(`${chalk.blue("Info: ")}url missing`);
	const browser = new ScreenShot();
	const buf = await browser.screenshot(args[0]).catch(() => null);
	await browser.destroy();
	if (!buf)
		return console.log(
			`${chalk.red(
				"Error: "
			)}error getting screenshot.Please check if your url is correct`
		);
	const path = resolve(args[1] || "image.png");
	await writeFile(path, buf);
	return console.log(`${chalk.blue("Info: ")}written as ${chalk.green(path)}`);
})();
