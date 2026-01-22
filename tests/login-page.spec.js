import { test, expect } from "@playwright/test"
const { PageObjectManager } = require('../pages/PageObjectManager')
const dataSet = JSON.parse(JSON.stringify(require("../utils/order-test-data.json")))

for (const data of dataSet)
{
test(`Placing order for ${data.productName} by ${data.username}`, async ({ page }) => {
    
   const poManager = new PageObjectManager(page);    
    
    // Step 2: Initialize login page and navigate to it
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();

    // Step 3: Perform valid login using credentials
    await loginPage.validLogin(data.username,data.password);

    // Step 4: Assert that landing page shows expected heading after login
    await expect(page.getByRole('heading', { name: 'Automation' }).nth(0)).toBeVisible();

    // Step 5: Initialize dashboard page object to search and add product to cart
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchAddProduct(data.productName);
    await dashboardPage.navigateToCart();

    // Step 6: Verify that the product is visible in the cart
    const productTitle = page.getByRole('heading', { name: new RegExp(data.productName, "i") });
    //const productTitle = page.getByRole('heading', { name: /adidas original/i });
    await expect(productTitle).toBeVisible({ timeout: 60000 });

    // Step 7: Initialize checkout page object and perform checkout steps
    const checkOutPage = poManager.getCheckOutPage();
    await checkOutPage.clickCheckout();
    await checkOutPage.selectCountry(data.countryName);
    await checkOutPage.placeOrder();

    // Step 8: Verify user name is displayed and order confirmation heading is visible
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(data.username);
    await expect(page.getByRole('heading', { level: 1, name: /thankyou for the order/i })).toBeVisible();

    // Step 9: Capture order ID from confirmation page for later verification
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID)
    
    // Step 10: Navigate to My Orders page
    const myOrdersPage = poManager.getMyOrdersPage();
    await myOrdersPage.navigateToMyOrders();

    // Step 11: Open the specific order by captured orderID
    await myOrdersPage.openOrderById(orderID);

    // Step 12: Fetch the order details text for verification
    const details = await myOrdersPage.getOrderDetailsText();
    expect(orderID.includes(details)).toBeTruthy();
    // Step 13: Assert that captured orderID matches the details in My Orders
   // const normalizedOrderID = orderID.replace(/\|/g, '').trim();
//expect(details).toContain(normalizedOrderID);
 
})};
