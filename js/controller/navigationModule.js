function NavigationModule(displayView) {
    //var startingPoint = menuInitialization();

    this.showMessage = function (message) {
        displayView.showMessage(message);
    };

    this.showInput = function (message,text,hide) {
        displayView.showInput(message,text,hide);
    };


    function menuInitialization() {
       return new NavigationMenuModel("Hello");
    }
}