import resolveModule from "../resolveModule";
import {IPage} from "../pageBase";

/**
 * Declare UIRouter state with decorated class as controller.
 * @link https://angular-ui.github.io/ui-router/site/#/api/ui.router
 * Note: controllerAs: $ctrl - User $ctrl for binding to controller in templates
 * @param {ng.IModule | string} module - name or instance of angular module in which config clause should be defined.
 * @param {string} stateName - name of UIRouter state state.
 * @param {ng.ui.IState} [config = {}] - state config params.
 * @returns {ClassDecorator}
 */
export function Page(module: ng.IModule | string, stateName: string, config: ng.ui.IState = {}) {
   return function (target: IPage) {
      module = resolveModule(module);
      (module as ng.IModule).config(["$stateProvider", function ($stateProvider: ng.ui.IStateProvider) {
         target.__stateName = stateName;

         $stateProvider
            .state(stateName, angular.extend({
               controller: target,
               controllerAs: "$ctrl"
            }, config));
      }]);
   };
}