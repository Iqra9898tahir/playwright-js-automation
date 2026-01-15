import {test , expect} from "@playwright/test"
let webContext;
test.beforeAll(async ({browser})=>{
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator('#userEmail').fill("iqra@gmail.com")
        await page.locator('#userPassword').fill("Abc@1234567")
        await page.locator('#login').click()
        await expect(page.getByRole('heading',{name: 'Automation'})).toBeVisible();
        await context.storageState({path:'state.json'})
        webContext= await browser.newContext({storageState:'state.json'})
})
test.describe("This is my test without login",()=>{
    test.only("login with api",async()=>{
        const productName = "ADIDAS ORIGINAL"
        const email = "iqra@gmail.com"
        const page = await webContext.newPage()
         await page.goto("https://rahulshettyacademy.com/client");
        const products = await page.locator(".card-body")
        //in SPA network may never come to idle so best option to use is following
       const productTitles = page.locator('.card-body b'); 
       await expect(productTitles.first()).toBeVisible();
       const titles = await productTitles.allTextContents();
       console.log(titles)
        //await page.waitForLoadState('networkidle');
        const count = await products.count();
        for (let i=0;i<count;++i){
           if(await products.nth(i).locator("b").textContent()==productName) {
            // Use accessible role + partial name to avoid icon/whitespace issues
            await products.nth(i).getByRole('button', { name: /add to cart/i }).click();

           }

        }
    
// go to cart
const cartLink = page.locator("[routerlink*='cart']");
await cartLink.click();

// verify product is visible
const productTitle = page.getByRole('heading', { name: /adidas original/i });
await expect(productTitle).toBeVisible();

// click checkout
const checkoutButton = page.getByRole('button', { name: /checkout/i });
await checkoutButton.click();

// type country
const countryInput = page.getByPlaceholder(/select country/i);
await countryInput.pressSequentially('ind');


// dropdown handling
const dropDownPanel = page.locator('.ta-results');
await dropDownPanel.waitFor();
const optionsCount = await dropDownPanel.locator('button').count();

for (let i = 0; i < optionsCount; i++) {
  const optionText = await dropDownPanel.locator("button").nth(i).textContent();
  if (optionText === ' Indonesia') {
    await dropDownPanel.locator("button").nth(i).click();
    break;
  }
}
await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
await page.locator(".action__submit ").click();
await expect( page.getByRole('heading', { level: 1, name: /thankyou for the order/i, }) ).toBeVisible();
const orderID=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(orderID)
await page.locator('button[routerlink*="myorders"]').click();
await page.locator("tbody").waitFor()
const order_rows = page.locator("tbody tr")
const rowCount = await order_rows.count();
for (let i=0; i<rowCount;++i){
const orderID_column = await order_rows.nth(i).locator("th").textContent();
if (orderID.includes(orderID_column)){
  await order_rows.nth(i).locator(page.getByRole('button', { name: "View" })).click();
  break;
}
const viewOrderDetails = await page.locator(".col-text").first().textContent();
expect (orderID.includes(viewOrderDetails)).toBeTruthy();
}

    });

    test("Negative case: Invalid credentials",async({page})=>{

        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator('#userEmail').fill("iqra@gmail.com")
        await page.locator('#userPassword').fill("wrong@1234567")
        await page.locator('#login').click()
        // Validate error message for invalid credentials
        await expect (page.locator('#toast-container')).toContainText('Incorrect') //parent.child css 
          await page.pause();
    });
    
})


/*

Reuse auth state

Never reuse browser context

test("User places order successfully", async ({ browser }) => {

    // Each test gets its own isolated context
    const context = await browser.newContext({ storageState: 'state.json' });
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client");

    */