import {test , expect}  from "@playwright/test"

test("alerts, hover and iframe interaction" ,async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    page.on('dialog',dialog => dialog.accept());
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();
    const framePages = page.frameLocator("#courses-iframe");
    await framePages.locator('li [href="lifetime-access"]:visible').click();
     const checkSubscribers = await framePages.locator('.text h2').textContent();
     const subscriberCount = checkSubscribers.split(" ")[1];
     expect(subscriberCount).toBeTruthy();
     console.log("Subscriber Count:", subscriberCount);

    })