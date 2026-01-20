class MyOrdersPage{


    constructor(page){

        this.page = page
        this.myOrdersButton = page.locator('button[routerlink*="myorders"]');
        this.orderRows = page.locator("tbody tr");
        this.viewButton = page.getByRole('button', { name: "View" });
        this.orderDetailsText = page.locator(".col-text").first();
    }

    async navigateToMyOrders() {
        await this.myOrdersButton.click();
        await this.orderRows.first().waitFor();
    }

     async openOrderById(orderID) {
        const rowCount = await this.orderRows.count();

        for (let i = 0; i < rowCount; i++) {
            const orderIdColumn = (await this.orderRows.nth(i).locator("th").textContent()).trim();                
            if (orderID.includes(orderIdColumn)) {
                await this.orderRows.nth(i).locator(this.viewButton).click();
                return;
            }
        }

        throw new Error(`Order ID ${orderID} not found in My Orders`);
    }

    async getOrderDetailsText() {
         return (await this.orderDetailsText.textContent()).trim();
       
    }
    
}
module.exports = {MyOrdersPage}