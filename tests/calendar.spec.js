import {test , expect}  from "@playwright/test"

test("calendar selection" ,async({page})=>{
    const monthNumber = "7";
    const year = "2026";
    const date = "21";
   // const expectedList = [monthNumber.toString(), date.toString(), year.toString()];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")
    await page.locator('.react-date-picker__inputGroup').click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
    await page.locator('//abbr[text()="'+date+'"]').click();
   // Step 1: Build the expected list dynamically from the date variables
// Convert all to strings because inputValue() always returns a string
  const expectedList = [monthNumber.toString(), date.toString(), year.toString()];
// Step 2: Locate the visible input fields in the calendar by their unique 'name' attributes
// Using name ensures we ignore any hidden inputs and the leading-zero <span>
const monthInput = page.locator('input[name="month"]');
const dayInput = page.locator('input[name="day"]');
const yearInput = page.locator('input[name="year"]');
// Step 3: Get the current values from each input
// These are the actual values the calendar shows after selection
const actualList = [
    await monthInput.inputValue(),
    await dayInput.inputValue(),
    await yearInput.inputValue()
];

for (let i = 0; i < expectedList.length; i++) {
    expect(actualList[i]).toEqual(expectedList[i]);
}


    

})

/* using functions here
import { test } from "@playwright/test";

async function selectDate(page, year, monthNumber, date) {
  // 1️ Open calendar
  await page.locator('.react-date-picker__inputGroup').click();

  // 2️ Navigate to decade view (2 clicks)
  await page.locator(".react-calendar__navigation__label").click(); // month -> year
  await page.locator(".react-calendar__navigation__label").click(); // year -> decade

  // 3️ Select year
  await page.getByText(year).click();

  // 4️ Select month (zero-based index)
  await page
    .locator(".react-calendar__year-view__months__month")
    .nth(Number(monthNumber) - 1)
    .click();

  // 5️ Select date
  await page.locator(`//abbr[text()='${date}']`).click();
}

test("calendar selection 2026", async ({ page }) => {
  const monthNumber = "7";
  const year = "2026";
  const date = "21";

  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

  //  Call the function
  await selectDate(page, year, monthNumber, date);
});


*/