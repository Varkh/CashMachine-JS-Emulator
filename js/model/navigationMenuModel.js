/**
 * Model that contains menu options
 * @constructor
 *
 * @param text to show in middle of display
 *
 * @param option {Array} NavigationMenuModel or function(action)
 * List of button options
 */
function NavigationMenuModel(text, options) {
    options = options || [];
    /**
     *
     * @param number - 1..8 of button on monitor
     * @param menuModel - item of NavigationMenuModel
     */
    this.setOption = function (number, menuModel) {

    };

    /**
     * @param number
     *
     * @return option with number
     */
    this.getOption = function (number) {

    };


}