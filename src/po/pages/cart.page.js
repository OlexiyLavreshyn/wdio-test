const BasePage = require("./base.page");
const SecondHeader = require("../components/layout/second_header.component")

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

    async isProductInCart(productName) {
        const items = await this.cartItems;

        for (const item of items) {
            const text = await item.getText();
            if (text === productName) {
                return true;
            }
        }

        return false;
    }
}

module.exports = CartPage;