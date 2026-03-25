const LoginPage = require("../po/pages/login.page")
const InventoryPage = require("../po/pages/inventory.page")

const loginPage = new LoginPage();
const inventoryPage = new InventoryPage();

describe('Checkout Flow', () => {

    it('should login with valid credentials', async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce'); // Username and Password
        await expect(inventoryPage.secondheader.title).toHaveText("Products");
    });

});