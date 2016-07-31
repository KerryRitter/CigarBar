import resolveModule from "../resolveModule";

/**
 * Declare angular controller as class.
 * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
 * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
 * @param {string} name - name of defined controller
 * @returns {ClassDecorator}
 */
export function Controller(module: ng.IModule | string, name: string) {
   return function(target: Function) {
      module = resolveModule(module);
      (module as ng.IModule).controller(name, target);
   };
}