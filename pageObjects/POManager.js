const { LoginPage } = require('./LoginPage')
const { DashboardPage } = require('./DashboardPage')
const { CheckOutPage } = require('./CheckOutPage')
const { MyOrdersPage } = require('./MyOrdersPage')

class POManager {

    constructor(page) {
        this.page = page

        // Page object instances (camelCase, consistent)
        this.loginPage = new LoginPage(this.page)
        this.dashboardPage = new DashboardPage(this.page)
        this.checkOutPage = new CheckOutPage(this.page)
        this.myOrdersPage = new MyOrdersPage(this.page)
    }

    getLoginPage() {
        return this.loginPage
    }

    getDashboardPage() {
        return this.dashboardPage
    }

    getCheckOutPage() {
        return this.checkOutPage
    }

    getMyOrdersPage() {
        return this.myOrdersPage
    }
}

module.exports = { POManager }
