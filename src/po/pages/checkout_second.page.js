const BasePage = require('./base.page');

const { SecondHeader } = require('../components');

class CheckoutPageSecond extends BasePage {
    constructor() {
        super('/checkout-step-two.html');
        this.secondheader = new SecondHeader();
    }

    get finishCheckoutButton() {
        return $('#finish');
    }
}

module.exports = CheckoutPageSecond;
