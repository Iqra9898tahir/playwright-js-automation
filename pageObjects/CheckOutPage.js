class CheckOutPage {

    constructor(page) {

        this.page = page
        this.checkoutButton = page.getByRole('button', { name: /checkout/i });
        this.countryInput = page.getByPlaceholder(/select country/i);
        this.dropDownPanel = page.locator('.ta-results');
        this.submitButton = page.locator(".action__submit ");
    }

    async clickCheckout() {
        await this.checkoutButton.click()
    }
    async selectCountry(countryName) {
        await this.countryInput.pressSequentially(countryName.slice(0, 3));
        //await this.countryInput.pressSequentially('ind');
        await this.dropDownPanel.waitFor();
        const optionsCount = await this.dropDownPanel.locator('button').count();
        for (let i = 0; i < optionsCount; i++) {
            const optionText = await this.dropDownPanel.locator("button").nth(i).textContent();
            if (optionText === ' Indonesia') {
                await this.dropDownPanel.locator("button").nth(i).click();
                break;
            }
        }
    }

    async placeOrder() {
        await this.submitButton.click()
    }

}

module.exports = { CheckOutPage }