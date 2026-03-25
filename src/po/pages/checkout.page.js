const BasePage = require("./base.page");
const SecondHeader = require("../components/layout/second_header.component")

class CheckoutPage extends BasePage{
    constructor(){
        super("/checkout-step-one.html");
        this.secondheader = new SecondHeader();  
    }
}

module.exports = CheckoutPage;