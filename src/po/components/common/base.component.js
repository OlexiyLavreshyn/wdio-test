class BaseComponent{

    constructor(root){
        this.root = root;
    }

    get rootEl(){
        return $(this.root);
    }
}

module.exports = BaseComponent;