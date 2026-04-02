const winston = require('winston');

const {LoginPage, InventoryPage, CartPage, CheckoutPage, CheckoutPageSecond, CheckoutComplete} = require("../po/pages/index");

const loginPage = new LoginPage();
const inventoryPage = new InventoryPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();
const checkoutPageSecond = new CheckoutPageSecond();
const checkoutComplete = new CheckoutComplete();

const users = require('../data/users');
const products = require('../data/products');
const checkoutData = require('../data/checkoutData');

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

describe('E2E Flow', () => {

    beforeEach(async () => {
        await browser.reloadSession();
        await loginPage.open();
    })

const productCases = Object.values(products);

productCases.forEach(product => {

    it(`should simulate user checkout flow for product ${product}`, async () => {
        logger.info('Starting checkout flow');


        //should login with valid credentials
        await loginPage.login(users.standardUser.username, users.standardUser.password); // Username and Password
        await expect(inventoryPage.secondheader.title).toHaveText("Products");
        await expect(browser).toHaveUrl(expect.stringContaining("/inventory.html"));
     
        logger.info('Login with standardUser credentials');

        
        //should add product to cart and store price
        const price = await inventoryPage.getPrice(product);
        await inventoryPage.addProductToCart(product);
        logger.info(`Product "${product}" added to cart`);

        //checking is cart icon has number 1
        await expect(cartPage.shoppingCartBadge).toHaveText('1');
        logger.info('Cart badge is number 1');

        //should open cart
        await inventoryPage.header.cartButton.click();
        await expect(cartPage.secondheader.title).toHaveText("Your Cart");
        await expect(browser).toHaveUrl(expect.stringContaining("/cart.html"));
        logger.info('Pressing cart opening button');


        //should validate added item present at cart
        const productEl = await cartPage.getProductElement(product);
        await expect(productEl).not.toBeNull();
        await expect(productEl).toBeDisplayed();

        const items = await cartPage.cartList;
        await expect(items).toHaveLength(1);

        await expect(cartPage.cartPrice).toHaveText(price);

        logger.info('Checking is added item present at cart');


        //should proceed to checkout
        await cartPage.checkoutButton.click();
        await expect(checkoutPage.secondheader.title).toHaveText("Checkout: Your Information");
        await expect(browser).toHaveUrl(expect.stringContaining("/checkout-step-one.html"));
        logger.info('Clicked checkout button');


        //should fill checkout with data
        await checkoutPage.checkoutFill(checkoutData.test_user_1); // FirstName , LastName , Postal code
        await expect(checkoutPageSecond.secondheader.title).toHaveText("Checkout: Overview");
        await expect(browser).toHaveUrl(expect.stringContaining("/checkout-step-two.html"));
        logger.info('Filling checkout with data');


        //should complete second checkout stage
        await checkoutPageSecond.finishCheckoutButton.click();
        logger.info('Clicking finish checkout button');


        //should validate the success
        await expect(checkoutComplete.secondheader.title).toHaveText("Checkout: Complete!");
        await expect(browser).toHaveUrl(expect.stringContaining("/checkout-complete.html"));
        await expect(checkoutComplete.successMessage).toHaveText("Thank you for your order!");
        logger.info('Validating success of checkout');


    });
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
                await expect(browser).toHaveUrl(expect.stringContaining("/inventory.html"));
            }
        });

    });
});