function NavigationModule(displayView) {
    var startingPoint = menuInitialization();


    function menuInitialization() {
       return new NavigationMenuModel("Hello");
    }
}