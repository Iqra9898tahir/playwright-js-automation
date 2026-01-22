import {test,expect} from "@playwright/test";
test.describe("This is my login page",()=>{
    test("Positive case: Valid credentials",async({page})=>{
        const doc_link = page.locator('[href*="documents-request"]')
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        await page.locator('#username').fill("rahulshettyacademy")
        await page.locator('#password').fill("learning")
        const dropdown = page.locator('select.form-control');
        await dropdown.selectOption("consult")
        await expect (doc_link).toHaveAttribute("class","blinkingText") // await expect(doc_link).toHaveClass(/blinkingText/);
        await page.locator('#signInBtn').click()
    });

    test.skip("Negative case: Invalid credentials",async({page})=>{

        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        await page.locator('#username').fill("rahul")
        await page.locator('#password').fill("learning")
        await page.locator('#signInBtn').click()
        // Validate error message for invalid credentials
        await expect (page.locator('#login-form .alert.alert-danger')).toContainText('Incorrect') //parent.child css 
          await page.pause();
    });
    
})
// child windows -tabs
test.only("child window", async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const docLink = page.locator('[href*="documents-request"]');
  const [childPage] = await Promise.all([
    context.waitForEvent('page'),
    docLink.click(),
  ]);

const text = await childPage.locator('.red').textContent();
console.log(text);
await expect(childPage.locator('.red')).toContainText('Please email us');

});
