
// THIS FILE = REUSABLE LOGIC

// This file does NOT know about UI
// This file does NOT know how many users exist
// This file ONLY knows:
// 1. How to login using given credentials
// 2. How to create an order using given token


class apiUtils {

    
    // CONSTRUCTOR
    // This is CALLED AUTOMATICALLY every time you use:
    // new apiUtils(...)
    // It runs ONCE PER OBJECT
    // It does NOT care if this is user1, user2, user50
    // It only receives DATA that YOU pass at creation time
    constructor(apiContext, loginPayload) {

        // 'this' = the NEW object being created RIGHT NOW
        // If object name in test is:
        // const ApiUtils = new apiUtils(...)
        // then:
        // this === ApiUtils
        // Store Playwright API context inside THIS object
        this.apiContext = apiContext;
        // Store login credentials inside THIS object
        // IMPORTANT:
        // loginPayload comes from:
        // new apiUtils(apiContext, apiPayload)
        // So internally JS does:
        // this.loginPayload = apiPayload
        this.loginPayload = loginPayload;
    }
    // METHOD: getToken()
    // This method USES the data that was stored
    // during constructor execution
    //
    async getToken() {

        // Here, this.loginPayload means:
        // "Use the credentials stored inside THIS object"
        //
        // NOT global
        // NOT shared
        // NOT overwritten by other users
        //
        const loginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            { data: this.loginPayload }
        );

        const loginResponseJson = await loginResponse.json();

        // Extract token from API response
        const token = loginResponseJson.token;

        console.log("TOKEN:", token);

        // Return token to whoever called getToken()
        return token;
    }

    // METHOD: createOrder()
    // This method:
    // 1. Calls getToken() using stored credentials
    // 2. Uses token to create order
    // 3. Returns BOTH token and orderID
    //
    async createOrder(orderPayLoad) {

        // This object will be returned to test file
        const response = {};

        // Step 1: Login
        // getToken() uses this.loginPayload
        response.token = await this.getToken();

        // Step 2: Create order using token
        const orderResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayLoad,
                headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Convert API response to JSON
        const orderResponseJson = await orderResponse.json();

        // Debug log 
        console.log(
            "FULL ORDER RESPONSE:",
            JSON.stringify(orderResponseJson, null, 2)
        );

        // Extract orderID from API response
        const orderID = orderResponseJson.orders[0];

        // Store orderID in response object
        response.orderID = orderID;

        // Return token + orderID to test file
        return response;
    }
}

module.exports = { apiUtils };









