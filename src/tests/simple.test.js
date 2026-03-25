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


//const item = "Sauce Labs Backpack";

describe('E2E Flow', () => {

    beforeEach(async () => {
        await browser.reloadSession();
        await loginPage.open();
    })


    it('should simulate user checkout flow', async () => {

        //should login with valid credentials
        await loginPage.login(users.standardUser.username, users.standardUser.password); // Username and Password
        await expect(inventoryPage.secondheader.title).toHaveText("Products");


        //should add product to cart
        await inventoryPage.addProductToCart(products.backpack);


        //should open cart
        await inventoryPage.header.cartButton.click();
        await expect(cartPage.secondheader.title).toHaveText("Your Cart");


        //should validate added item present at cart
        const productEl = await cartPage.getProductElement(products.backpack);
        await expect(productEl).not.toBeNull();
        await expect(productEl).toBeDisplayed();


        //should proceed to checkout
        await cartPage.checkoutButton.click();
        await expect(checkoutPage.secondheader.title).toHaveText("Checkout: Your Information");


        //should fill checkout with data
        await checkoutPage.checkoutFill(checkoutData.test_user_1); // FirstName , LastName , Postal code
        await expect(checkoutPageSecond.secondheader.title).toHaveText("Checkout: Overview");


        //should complete second checkout stage
        await checkoutPageSecond.finishCheckoutButton.click();


        //should validate the success
        await expect(checkoutComplete.secondheader.title).toHaveText("Checkout: Complete!");
        await expect(checkoutComplete.successMessage).toHaveText("Thank you for your order!");
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