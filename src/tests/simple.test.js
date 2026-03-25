const LoginPage = require("../po/pages/login.page")
const InventoryPage = require("../po/pages/inventory.page")
const CartPage = require("../po/pages/cart.page")
const CheckoutPage = require("../po/pages/checkout.page")

const loginPage = new LoginPage();
const inventoryPage = new InventoryPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();

const item = "Sauce Labs Backpack";

describe('Checkout Flow', () => {

    it('should login with valid credentials', async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce'); // Username and Password
        await expect(inventoryPage.secondheader.title).toHaveText("Products");
    });


    it('should add product to cart', async () => {
        await inventoryPage.addProductToCart(item);
    });


    it('should open cart', async () => {
        await inventoryPage.header.cartButton.click();
        await expect(cartPage.secondheader.title).toHaveText("Your Cart");
    });


    it('should validate added item present at cart', async () => {
        const isPresent = await cartPage.isProductInCart(item);
        expect(isPresent).toBe(true);
    });

    it('should proceed to checkout', async () => {
        await cartPage.checkoutButton.click();
        await expect(checkoutPage.secondheader.title).toHaveText("Checkout: Your Information");
    });
});