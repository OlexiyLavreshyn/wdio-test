const allure = require('@wdio/allure-reporter').default;
const {pages} = require("../po");

const users = require('../data/users');
const products = require('../data/products');
const checkoutData = require('../data/checkoutData');

//const Logger = require('../utils/logger');

describe('E2E Flow', () => {

    beforeEach(async () => {
        await browser.reloadSession();
        await pages("login").open();
    })
    const productCases = Object.values(products);

productCases.forEach(product => {

    it(`should simulate user checkout flow for product ${product}`, async () => {
        allure.addStep('Starting checkout flow');


        //should login with valid credentials
        await pages("login").login(users.standardUser.username, users.standardUser.password); // Username and Password
        await expect(pages("inventory").secondheader.title).toHaveText("Products");
        await expect(browser).toHaveUrl(expect.stringContaining("/inventory.html"));
     
        allure.addStep('Login with standardUser credentials');

        
        //should add product to cart and store price
        const price = await pages("inventory").getPrice(product);
        await pages("inventory").addProductToCart(product);
        allure.addStep(`Product "${product}" added to cart`);


        //should open cart
        await pages("inventory").header.cartButton.click();
        await expect(pages("cart").secondheader.title).toHaveText("Your Cart");
        await expect(browser).toHaveUrl(expect.stringContaining("/cart.html"));
        allure.addStep('Pressing cart opening button');


        //should validate added item present at cart
        const productEl = await pages("cart").getProductElement(product);
        await expect(productEl).not.toBeNull();
        await expect(productEl).toBeDisplayed();

        await expect(pages("cart").shoppingCartBadge).toHaveText('1');

        const items = await pages("cart").cartList;
        await expect(items).toHaveLength(1);

        await expect(pages("cart").cartPrice).toHaveText(price);

        allure.addStep('Checking is added item present at cart');


        //should proceed to checkout
        await pages("cart").checkoutButton.click();
        await expect(pages("checkout").secondheader.title).toHaveText("Checkout: Your Information");
        await expect(browser).toHaveUrl(expect.stringContaining("/checkout-step-one.html"));
        allure.addStep('Clicked checkout button');


        //should fill checkout with data
        await pages("checkout").checkoutFill(checkoutData.test_user_1); // FirstName , LastName , Postal code
        await expect(pages("checkoutSecond").secondheader.title).toHaveText("Checkout: Overview");
        await expect(browser).toHaveUrl(expect.stringContaining("/checkout-step-two.html"));
        allure.addStep('Filling checkout with data');


        //should complete second checkout stage
        await pages("checkoutSecond").finishCheckoutButton.click();
        allure.addStep('Clicking finish checkout button');


        //should validate the success
        await expect(pages("checkoutComplete").secondheader.title).toHaveText("Checkout: Complete!");
        await expect(browser).toHaveUrl(expect.stringContaining("/checkout-complete.html"));
        await expect(pages("checkoutComplete").successMessage).toHaveText("Thank you for your order!");
        allure.addStep('Validating success of checkout');


    });
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
                await expect(browser).toHaveUrl(expect.stringContaining("/inventory.html"));
            }
        });

    });
});