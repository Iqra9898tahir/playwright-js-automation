class DashboardPage{

    //A constructor is automatically executed when an object of a class is created using the new keyword (usually from the test or fixture).
    //The constructor is used to inject the Playwright page dependency into the Page Object so that browser actions can be performed in a controlled and reusable way.
constructor(page){
this.page = page
this.products =  page.locator(".card-body");
this.productText = page.locator('.card-body b');
this.cartLink = page.locator("[routerlink*='cart']");
}

async searchAddProduct(productName){
          
           const productTitles = await this.productText.allTextContents(); 
           console.log(productTitles)
          await this.products.first().waitFor();
            const count = await this.products.count();
            for (let i=0;i<count;++i){
               if(await this.products.nth(i).locator("b").textContent()===productName) {
                await this.products.nth(i).getByRole('button', { name: /add to cart/i }).click();
                break;
    
               }
    
            }
}
async navigateToCart(){

  await this.cartLink.click();

}
}
module.exports={DashboardPage}