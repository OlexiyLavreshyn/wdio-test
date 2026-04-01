
const {pages} = require("../po");

const users = require('../data/users');
const products = require('../data/products');
const checkoutData = require('../data/checkoutData');

const Logger = require('../utils/logger');

describe('E2E Flow', () => {

    beforeEach(async () => {
        await browser.reloadSession();
        await pages("login").open();
    })


    it('should simulate user checkout flow', async () => {
        Logger.info('Starting checkout flow');

        //should login with valid credentials
        await pages("login").login(users.standardUser.username, users.standardUser.password); // Username and Password
        await expect(pages("inventory").secondheader.title).toHaveText("Products");
        Logger.info('Login with standardUser credentials');

        //should add product to cart
        await pages("inventory").addProductToCart(products.backpack);
        Logger.info(`Product "${products.backpack}" added to cart`);

        //should open cart
        await pages("inventory").header.cartButton.click();
        await expect(pages("cart").secondheader.title).toHaveText("Your Cart");
        Logger.info('Pressing cart opening button');

        //should validate added item present at cart
        const productEl = await pages("cart").getProductElement(products.backpack);
        await expect(productEl).not.toBeNull();
        await expect(productEl).toBeDisplayed();
        Logger.info('Checking is added item present at cart');

        //should proceed to checkout
        await pages("cart").checkoutButton.click();
        await expect(pages("checkout").secondheader.title).toHaveText("Checkout: Your Information");
        Logger.info('Clicked checkout button');

        //should fill checkout with data
        await pages("checkout").checkoutFill(checkoutData.test_user_1); // FirstName , LastName , Postal code
        await expect(pages("checkoutSecond").secondheader.title).toHaveText("Checkout: Overview");
        Logger.info('Filling checkout with data');

        //should complete second checkout stage
        await pages("checkoutSecond").finishCheckoutButton.click();
        Logger.info('Clicking finish checkout button');

        //should validate the success
        await expect(pages("checkoutComplete").secondheader.title).toHaveText("Checkout: Complete!");
        await expect(pages("checkoutComplete").successMessage).toHaveText("Thank you for your order!");
        Logger.info('Validating success of checkout');
    });
});


describe('Login Tests (Data Provider)', () => {

    beforeEach(async () => {
        await browser.reloadSession();
        await pages("login").open();
    })

    const loginCases = Object.values(users);

    loginCases.forEach(user => {

        it(`should login as ${user.username}`, async () => {

            await pages("login").login(user.username, user.password);

            if (user.errorMessage) {
                await expect(pages("login").errorMessage).toHaveText(user.errorMessage);
            } 
            else {
                await expect(pages("inventory").secondheader.title).toHaveText('Products');
            }
        });

    });
});