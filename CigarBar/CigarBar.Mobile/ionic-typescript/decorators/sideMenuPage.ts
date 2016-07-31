import resolveModule from "../resolveModule";
import {IPage} from "../pageBase";
import {SideMenuBase} from "../sideMenuBase";

/**
 * Declare UIRouter state with decorated class as controller.
 * @link https://angular-ui.github.io/ui-router/site/#/api/ui.router
 * Note: controllerAs: $ctrl - User $ctrl for binding to controller in templates
 * @param {ng.IModule | string} module - name or instance of angular module in which config clause should be defined.
 * @param {string} stateName - name of UIRouter state state.
 * @param {ng.ui.IState} [config = {}] - state config params.
 * @returns {ClassDecorator}
 */
export function SideMenuPage(
    module: ng.IModule | string, 
    sideMenu: SideMenuBase | string, 
    stateName: string, 
    config: ng.ui.IState = {}) {

    return function (target: IPage) {
        module = resolveModule(module);
        (module as ng.IModule).config(["$stateProvider", function ($stateProvider: ng.ui.IStateProvider) {
            var url = (" " + config.url).slice(1);
            var params = config.params;

            delete config.url;
            delete config.params;

            if (typeof sideMenu === "string") {
                target.__stateName = `${sideMenu}.${stateName}`;
            } else {
                target.__stateName = `${sideMenu.__menuStateName}.${stateName}`;
            }

            var stateProperties = {
                url: url,
                params: params,
                views: {
                    menuContent: angular.extend({
                        controller: target,
                        controllerAs: "$ctrl"
                    }, config)
                }
            } as ng.ui.IState;

            $stateProvider.state(target.__stateName, stateProperties);
        }]);
    };
}