const BasePage = require("./base.page");
const Header = require("../components/layout/header.component")
const SecondHeader = require("../components/layout/second_header.component")

class InventoryPage extends BasePage{
    constructor(){
        super("/inventory.html");
        this.secondheader = new SecondHeader();
        this.header = new Header();
    }

    async addProductToCart(productName) {
        const productNameDiv = await $(`div.inventory_item_name=${productName}`);
        const itemContainer = await productNameDiv.$('../../..'); // 3 levels up
        const addButton = await itemContainer.$('div.pricebar button.btn_inventory');
        await addButton.click();
    }
}

module.exports = InventoryPage;