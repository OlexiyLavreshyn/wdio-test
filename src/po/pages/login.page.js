const BasePage = require("./base.page");

class LoginPage extends BasePage{
    constructor(){
        super("https://www.saucedemo.com/");
    }

    get usernameInput() { return $('#user-name'); }
    get passwordInput() { return $('#password'); }
    get loginButton()   { return $('#login-button'); }

    get errorMessage()  { return $('.error-message-container'); }

    async login(username, password) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }
}

module.exports = LoginPage;