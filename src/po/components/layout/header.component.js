const BaseComponent = require('../common/base.component');

class Header extends BaseComponent {
    constructor() {
        super('.primary_header');
    }

    get cartButton() {
        return this.rootEl.$('#shopping_cart_container');
    }
}

module.exports = Header;
