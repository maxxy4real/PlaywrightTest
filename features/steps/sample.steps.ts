import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, Page, Browser } from "playwright";

let browser: Browser;
let page: Page;

Given("I open the Google homepage", async function () {
    // browser = await chromium.launch({ headless: false });
    browser = await chromium.launch({ headless: true }); // Change from false to true

    page = await browser.newPage();
    await page.goto("https://www.google.com");
    // await page.locator('#L2AGLb > div').click();

    // Wait for the cookie banner to appear and click "Accept all"
    const acceptButton = page.locator('#L2AGLb > div');
    if (await acceptButton.isVisible()) {
        await acceptButton.click();
        console.log("Accepted cookies");
    } else {
        console.log("No cookie popup found");
    }
});

When("I search for {string}", async function (searchQuery: string) {
    await page.fill('textarea[name="q"]', searchQuery);
    await page.press('textarea[name="q"]', "Enter");
    await page.waitForTimeout(2000);
});

Then("I should see {string} in the results", async function (expectedText: string) {
    const content = await page.textContent("body");
    if (!content?.includes(expectedText)) {
        throw new Error(`Text "${expectedText}" not found on page.`);
    }
    await browser.close();
});
