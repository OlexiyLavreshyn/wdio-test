const BasePage = require("./base.page");
const SecondHeader = require("../components/layout/second_header.component")

class InventoryPage extends BasePage{
    constructor(){
        super();
        this.secondheader = new SecondHeader();
    }

}

module.exports = InventoryPage;