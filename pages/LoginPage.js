class LoginPage {
   
    constructor(page) {
        // create locators is sync but using loctaors is async
        this.page = page
        this.userName = page.locator('#userEmail')
        this.Password = page.locator('#userPassword')
        this.signInButton = page.locator('#login')

    }
    async goTo()
    {
      await this.page.goto("https://rahulshettyacademy.com/client");
    }
   async validLogin(username,password){
        await this.userName.fill(username);
        await this.Password.fill(password);
        await this.signInButton.click();
    }
}

module.exports={LoginPage}