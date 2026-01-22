import { test, expect, request } from "@playwright/test";

// LOGIN DATA (credentials)
// This is JUST DATA, nothing executes here
const apiPayload = {
  userEmail: "iqra@gmail.com",
  userPassword: "Abc@1234567"
};

// ORDER DATA
// This will be sent AFTER login
const orderPayLoad = {
  orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }]
};

// Importing the CLASS (blueprint)
// NOTE: This does NOT create an object
const { apiUtils } = require("../utils/apiUtils");

// This variable will store API results (token + orderID)
// We declare it outside so BOTH beforeAll and test can use it
let response;

test.beforeAll(async () => {

  // STEP 1: Create API context
 
  // This is Playwright's HTTP client
  const apiContext = await request.newContext();

  
  // STEP 2: OBJECT CREATION happens HERE 
  
  // IMPORTANT:
  // 'new' keyword creates a NEW object in memory
  // constructor inside apiUtils class is CALLED here
  // apiPayload is PASSED into constructor
  //
  // Internally JS does:
  // constructor(apiContext, loginPayload) {
  //   this.loginPayload = apiPayload
  // }
  //
  const ApiUtils = new apiUtils(apiContext, apiPayload);

 
  // STEP 3: METHOD CALL on that object
 
  // createOrder():
  // uses this.loginPayload (stored during constructor)
  // logs in
  // creates order
  // returns token + orderID
  //
  response = await ApiUtils.createOrder(orderPayLoad);

  // response = {
  //   token: "xxxx",
  //   orderID: "yyyy"
  // }
});

test.only("Positive case: Valid credentials", async ({ page }) => {

  // STEP 4: USE API TOKEN IN UI
  // We SKIP UI login by directly injecting token
  //
  // response.token came from:
  // createOrder() → getToken() → API response
  //
  await page.addInitScript(value => {
    window.localStorage.setItem("token", value);
  }, response.token);


  // STEP 5: Open application
  await page.goto("https://rahulshettyacademy.com/client");

  // If token is correct, user is already logged in
  await page.locator('button[routerlink*="myorders"]').click();

  // STEP 6: Verify created order in UI
  await page.locator("tbody").waitFor();

  const order_rows = page.locator("tbody tr");
  const rowCount = await order_rows.count();

  for (let i = 0; i < rowCount; ++i) {
    const orderID_column = await order_rows.nth(i).locator("th").textContent();

    // response.orderID came from API order creation
    if (response.orderID.includes(orderID_column)) {
      await order_rows
        .nth(i)
        .locator(page.getByRole("button", { name: "View" }))
        .click();
      break;
    }
  }

  const viewOrderDetails = await page.locator(".col-text").first().textContent();


  // FINAL ASSERTION:
  // API-created order should match UI order
  expect(response.orderID.includes(viewOrderDetails)).toBeTruthy();
});


    