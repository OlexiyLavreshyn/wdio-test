const LoginPage = require("./login.page")
const InventoryPage = require("./inventory.page")
const CartPage = require("./cart.page")
const CheckoutPage = require("./checkout.page")
const CheckoutPageSecond = require("./checkout_second.page")
const CheckoutComplete = require("./checkout_complete.page")

const pageClasses = {
    login: LoginPage,
    inventory: InventoryPage,
    cart: CartPage,
    checkout: CheckoutPage,
    checkoutsecond: CheckoutPageSecond,
    checkoutcomplete: CheckoutComplete,
};

const instances = {};

function pages(name) {
    const key = name.toLowerCase();

    if (!instances[key]) {
        instances[key] = new pageClasses[key]();
    }

    return instances[key];
}

module.exports = {
    pages
}