const LoginPage = require("../po/pages/login.page")
const InventoryPage = require("../po/pages/inventory.page")
const CartPage = require("../po/pages/cart.page")
const CheckoutPage = require("../po/pages/checkout.page")
const CheckoutPageSecond = require("../po/pages/checkout_second.page")
const CheckoutComplete = require("../po/pages/checkout_complete.page")

const loginPage = new LoginPage();
const inventoryPage = new InventoryPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();
const checkoutPageSecond = new CheckoutPageSecond();
const checkoutComplete = new CheckoutComplete();


const users = require('../data/users');
const products = require('../data/products');
const checkoutData = require('../data/checkoutData');

const Logger = require('../utils/logger');

//const item = "Sauce Labs Backpack";

describe('E2E Flow', () => {

    beforeEach(async () => {
        await browser.reloadSession();
        await loginPage.open();
    })


    it('should simulate user checkout flow', async () => {
        Logger.info('Starting checkout flow');

        //should login with valid credentials
        await loginPage.login(users.standardUser.username, users.standardUser.password); // Username and Password
        await expect(inventoryPage.secondheader.title).toHaveText("Products");
        Logger.info('Login with standardUser credentials');

        //should add product to cart
        await inventoryPage.addProductToCart(products.backpack);
        Logger.info(`Product "${products.backpack}" added to cart`);

        //should open cart
        await inventoryPage.header.cartButton.click();
        await expect(cartPage.secondheader.title).toHaveText("Your Cart");
        Logger.info('Pressing cart opening button');

        //should validate added item present at cart
        const productEl = await cartPage.getProductElement(products.backpack);
        await expect(productEl).not.toBeNull();
        await expect(productEl).toBeDisplayed();
        Logger.info('Checking is added item present at cart');

        //should proceed to checkout
        await cartPage.checkoutButton.click();
        await expect(checkoutPage.secondheader.title).toHaveText("Checkout: Your Information");
        Logger.info('Clicked checkout button');

        //should fill checkout with data
        await checkoutPage.checkoutFill(checkoutData.test_user_1); // FirstName , LastName , Postal code
        await expect(checkoutPageSecond.secondheader.title).toHaveText("Checkout: Overview");
        Logger.info('Filling checkout with data');

        //should complete second checkout stage
        await checkoutPageSecond.finishCheckoutButton.click();
        Logger.info('Clicking finish checkout button');

        //should validate the success
        await expect(checkoutComplete.secondheader.title).toHaveText("Checkout: Complete!");
        await expect(checkoutComplete.successMessage).toHaveText("Thank you for your order!");
        Logger.info('Validating success of checkout');
    });
});


describe('Login Tests (Data Provider)', () => {

    beforeEach(async () => {
        await browser.reloadSession();
        await loginPage.open();
    })

    const loginCases = Object.values(users);

    loginCases.forEach(user => {

        it(`should login as ${user.username}`, async () => {

            await loginPage.login(user.username, user.password);

            if (user.errorMessage) {
                await expect(loginPage.errorMessage).toHaveText(user.errorMessage);
            } 
            else {
                await expect(inventoryPage.secondheader.title).toHaveText('Products');
            }
        });

    });
});