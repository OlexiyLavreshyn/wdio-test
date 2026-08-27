const BasePage = require('./base.page');

const { Header, SecondHeader } = require('../components');

class InventoryPage extends BasePage {
    constructor() {
        super('/inventory.html');
        this.secondheader = new SecondHeader();
        this.header = new Header();
    }

    getFormattedName(productName) {
        const formattedName = productName.toLowerCase().replaceAll(' ', '-');
        return formattedName;
    }

    getAddToCartButton(productName) {
        const formattedName = this.getFormattedName(productName);
        return $(`[data-test="add-to-cart-${formattedName}"]`);
    }

    async addProductToCart(productName) {
        const button = await this.getAddToCartButton(productName);
        await button.waitForClickable();
        await button.click();
    }

    async getPrice(productName) {
        const button = await this.getAddToCartButton(productName);
        const priceElement = await button.parentElement().$('.inventory_item_price');
        const priceText = await priceElement.getText();

        return priceText;
    }
}

module.exports = InventoryPage;
