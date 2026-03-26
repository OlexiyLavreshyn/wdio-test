const BasePage = require("./base.page");

const {SecondHeader} = require("../components")

class CheckoutComplete extends BasePage{
    constructor(){
        super("/checkout-complete.html");
        this.secondheader = new SecondHeader();  
    }

    get successMessage() { return $('.complete-header'); }
}

module.exports = CheckoutComplete;