const BaseComponent = require("../common/base.component");

class SecondHeader extends BaseComponent{

    constructor(){
       super(".header_secondary_container");
    }

    get title() {
        return this.rootEl.$('.title');
    }
}

module.exports = SecondHeader;