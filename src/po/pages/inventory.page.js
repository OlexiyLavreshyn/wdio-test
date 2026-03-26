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
        // 1. Locate the product name element
        const productNameDiv = await $(`div.inventory_item_name=${productName}`);
        
        // 2. Explicitly wait for it to be present (prevents the 'not a function' error)
        await productNameDiv.waitForDisplayed();

        // 3. Use the .parentElement() method repeatedly 
        const itemContainer = await productNameDiv.parentElement().parentElement().parentElement();
        
        // 4. Find the button within that container
        const addButton = await itemContainer.$('button.btn_inventory');
        
        await addButton.click();    
    }
}

module.exports = InventoryPage;