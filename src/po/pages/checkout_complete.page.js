const BasePage = require("./base.page");
const SecondHeader = require("../components/layout/second_header.component")

class CheckoutComplete extends BasePage{
    constructor(){
        super("/checkout-complete.html");
        this.secondheader = new SecondHeader();  
    }

    get successMessage() { return $('.complete-header'); }
}

module.exports = CheckoutComplete;