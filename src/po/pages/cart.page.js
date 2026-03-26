const BasePage = require("./base.page");

const {SecondHeader} = require("../components")

class CartPage extends BasePage{
    constructor(){
        super("/cart.html");
        this.secondheader = new SecondHeader();
    }

    get cartItems() {
        return $$('div.inventory_item_name');
    }

    get checkoutButton() {
        return $('#checkout');
    }

    async getProductElement(productName) {
        const items = await this.cartItems;

        for (const item of items) {
            const text = await item.getText();
            if (text === productName) {
                return item; // return the element itself
            }
        }

        return null; // if not found
    }
}

module.exports = CartPage;