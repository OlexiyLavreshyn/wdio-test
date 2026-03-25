const LoginPage = require("../po/pages/login.page")

const loginPage = new LoginPage();

describe('Checkout Flow', () => {

    it('should login with valid credentials', async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce'); // Username and Password
    });

});