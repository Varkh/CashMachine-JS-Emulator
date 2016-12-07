function NavigationModule(displayView) {
    //var startingPoint = menuInitialization();

    this.showMessage = function (message) {
        displayView.showMessage(message);
    };

    this.showInput = function (message,text,hide) {
        displayView.showInput(message,text,hide);
    };

    this.createMenu = function (val,append) {
        displayView.createMenu(val,append)
    }


    function menuInitialization() {
       return new NavigationMenuModel("Hello");
    }
}