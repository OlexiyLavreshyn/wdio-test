const BasePage = require("./base.page");

const {Header, SecondHeader} = require("../components")

class InventoryPage extends BasePage{
    constructor(){
        super("/inventory.html");
        this.secondheader = new SecondHeader();
        this.header = new Header();
    }

    getAddToCartButton(productName) {
        const formattedName = productName
            .toLowerCase()
            .replaceAll(' ', '-');

        return $(`[data-test="add-to-cart-${formattedName}"]`);
    }

    async addProductToCart(productName) {
        const button = await this.getAddToCartButton(productName);
        await button.waitForClickable();
        await button.click();
    }
}

module.exports = InventoryPage;