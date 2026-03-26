const LoginPage = require("./login.page")
const InventoryPage = require("./inventory.page")
const CartPage = require("./cart.page")
const CheckoutPage = require("./checkout.page")
const CheckoutPageSecond = require("./checkout_second.page")
const CheckoutComplete = require("./checkout_complete.page")

function pages(name){
    const items = {
        login: new LoginPage(),
        inventory: new InventoryPage(),
        cart: new CartPage(),
        checkout: new CheckoutPage(),
        checkoutsecond: new CheckoutPageSecond(),
        checkoutcomplete: new CheckoutComplete(),
    }
    return items[name.toLowerCase()];
}

module.exports = {
    LoginPage,
    InventoryPage,
    CartPage,
    CheckoutPage,
    CheckoutPageSecond,
    CheckoutComplete,
    pages,
}