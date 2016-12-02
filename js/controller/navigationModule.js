function NavigationModule(displayView) {
    //var startingPoint = menuInitialization();

    this.showMessage = function (message) {
        displayView.showMessage(message);
    };

    this.showInput = function (message) {
        displayView.showInput(message);
    };


    function menuInitialization() {
       return new NavigationMenuModel("Hello");
    }
}