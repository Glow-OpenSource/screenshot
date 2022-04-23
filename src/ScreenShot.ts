import puppeteer, {
  type Browser,
  Viewport,
  ScreenshotOptions as PuppeteerScreenshotOptions,
} from "puppeteer";

export interface ScreenshotOptions {
  returnType?: PuppeteerScreenshotOptions["encoding"];
  width?: Viewport["width"];
  height?: Viewport["height"];
  full?: PuppeteerScreenshotOptions["fullPage"];
  quality?: PuppeteerScreenshotOptions["quality"];
  timeout?: number;
}

export const DefaultScreenshotOption: ScreenshotOptions = {
  returnType: "binary",
  full: true,
  timeout: 5000,
};

export interface ScreenShotConstructorOptions {
  endPoint?: string;
}

export const DefaultScreenShotConstructorOptions: ScreenShotConstructorOptions =
  {};

export class ScreenShot {
  private browser: Browser | undefined = undefined;
  private endPoint: string | undefined = undefined;
  private shotStat: Array<boolean> = [];
  constructor(
    options: ScreenShotConstructorOptions = DefaultScreenShotConstructorOptions
  ) {
    this.endPoint = options.endPoint;
  }
  async getBrowser(): Promise<Browser> {
    let browser = this.browser;
    if (!browser) {
      if (this.endPoint)
        browser = await puppeteer.connect({ browserWSEndpoint: this.endPoint });
      else browser = await puppeteer.launch({ headless: false });
    }
    this.browser = browser;
    return browser;
  }
  async screenshot(
    url: string,
    options: ScreenshotOptions = DefaultScreenshotOption
  ): Promise<Buffer | string> {
    const browser = await this.getBrowser();
    const page = await browser.newPage();
    await page.setViewport({
      width: options.width || 1280,
      height: options.height || 1024,
    });
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: options.timeout,
    });
    return page.screenshot({
      fullPage: options.full,
      encoding: options.returnType,
    });
  }
  async destroy(): Promise<void> {
    this.browser && (await this.browser.close());
    return;
  }
}
