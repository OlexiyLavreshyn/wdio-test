const BasePage = require("./base.page");
const SecondHeader = require("../components/layout/second_header.component")

class CheckoutPage extends BasePage{
    constructor(){
        super("/checkout-step-one.html");
        this.secondheader = new SecondHeader();  
    }

    get firstnameInput() { return $('#first-name'); }
    get lastnameInput() { return $('#last-name'); }
    get postalcodeInput()   { return $('#postal-code'); }
    get continueButton()   { return $('#continue'); }

    async checkoutFill({ firstName, lastName, postalCode }) {
        await this.firstnameInput.setValue(firstName);
        await this.lastnameInput.setValue(lastName);
        await this.postalcodeInput.setValue(postalCode);
        await this.continueButton.click();
    }
}

module.exports = CheckoutPage;