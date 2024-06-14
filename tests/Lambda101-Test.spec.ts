import { expect } from "@playwright/test";
import test from "../lambda101-setup";
 // import test from '@playwright/test'
const Data = {
  URL: "https://www.lambdatest.com/selenium-playground/",
  WELCOME_MSG: "Welcome to LambdaTest page",
  USER_NAME: "Manideep lanka",
  EMAIL: "LManideep@yahoo.com",
  PASSWORD: "lm@123",
  COMPANY: "LM ltd",
  WEBSITE: "www.lmc.com",
  COUNTRY: "United States",
  CITY: "Boston",
  ADDRESS1: "Halowen street",
  ADDRESS2: "Beside Canon mart",
  STATE: "Massachusetts",
  ZIP: "68301",
  SUCCESS_MSG: "Thanks for contacting us, we will get back to you shortly.",
};

test.describe("PlayWright Assignment Test Scenarios", async () => {
  test.beforeEach(async ({ page }) => {
    test.step("Launch Application ", async () => {
      await page.goto(Data.URL);
      await page.waitForLoadState("domcontentloaded");
    });
  });

  test("Test Scenario 1", async ({ page }) => {
    await page.getByRole("link", { name: "Simple Form Demo" }).click();
    await page.getByPlaceholder("Please enter your Message").fill(Data.WELCOME_MSG);
    await page.getByRole("button", { name: "Get Checked Value" }).click();
    await expect(page.locator("#message")).toHaveText(Data.WELCOME_MSG);
  });

  test("Test Scenario 2", async ({ page }) => {
    await page.getByRole("link", { name: "Drag & Drop Sliders" }).click();
    await page.waitForSelector("#slider3");
    let defaultValTxt = await page.locator("#rangeSuccess").innerText();
    expect(defaultValTxt).toBe("15");
    await page.locator("#slider3").getByRole("slider").fill("95");
    let afterValTxt = await page.locator("#rangeSuccess").innerText();
    expect(afterValTxt).toBe("95");
  });

  test("Test Scenario 3", async ({ page }) => {
    await page.getByRole("link", { name: "Input Form Submit" }).click();
    await page.getByRole("button", { name: "Submit" }).click();
    await page.getByPlaceholder("Name", { exact: true }).fill(Data.USER_NAME);
    await page.getByPlaceholder("Email", { exact: true }).fill(Data.EMAIL);
    await page.getByPlaceholder("Password").fill(Data.PASSWORD);
    await page.getByPlaceholder("Company").fill(Data.COMPANY);
    await page.getByPlaceholder("Website").fill(Data.WEBSITE);
    await page.getByRole("combobox").selectOption(Data.COUNTRY);
    await page.getByPlaceholder("City").fill(Data.CITY);
    await page.getByPlaceholder("Address 1").fill(Data.ADDRESS1);
    await page.getByPlaceholder("Address 2").fill(Data.ADDRESS2);
    await page.getByPlaceholder("State").fill(Data.STATE);
    await page.getByPlaceholder("Zip code").fill(Data.ZIP);
    await page.getByRole("button", { name: "Submit" }).click();
    await page.waitForTimeout(2000);
    const successMessage = await page
      .locator('//*[contains(@class,"loginform")]//p')
      .textContent();
    expect(successMessage).toBe(Data.SUCCESS_MSG);
  });
});
