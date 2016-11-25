function NavigationModule() {
    var startingPoint = menuInitialization();


    function menuInitialization() {
       return new NavigationMenuModel("Hello");
    }
}