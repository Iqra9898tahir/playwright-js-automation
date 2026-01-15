import { test, expect, request } from "@playwright/test";
import { json } from "node:stream/consumers";

const apiPayload = {
  userEmail: "iqra@gmail.com",
  userPassword: "Abc@1234567"
};

const orderPayLoad = {
  orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }]
};

const { apiUtils } = require("./utils/apiUtils");

let response;
const fakePayload = {data:[],message:"No Orders"}
test.beforeAll(async () => {

  // STEP 1: Create API context
 
  // This is Playwright's HTTP client
  const apiContext = await request.newContext();

  const ApiUtils = new apiUtils(apiContext, apiPayload);

  response = await ApiUtils.createOrder(orderPayLoad);

});

test.only("Positive case: Valid credentials", async ({ page }) => {

  await page.addInitScript(value => {
    window.localStorage.setItem("token", value);
  }, response.token);


  // STEP 5: Open application
  await page.goto("https://rahulshettyacademy.com/client");
  await page.route(
  "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
  async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(fakePayload)
      })
        //intercepting the response-api response send to browser>render data on UI
    }
  )

  // If token is correct, user is already logged in
  await page.locator('button[routerlink*="myorders"]').click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
  console.log(await page.locator(".mt-4").textContent());
});

/*
await page.route(
  // Intercept the orders API request
  "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",

  async route => {

    // Safely continue the intercepted request to the real backend
    const response = await route.fetch();

    // Parse the real backend response body
    const body = await response.json();

    // Modify the response: simulate "no orders"
    body.data = [];

    // Fulfill the request with the modified response
    // - response: keeps original status & headers
    // - body: overrides the response payload
    await route.fulfill({
      response,
      body: JSON.stringify(body)
    });
  }
);
*/
    