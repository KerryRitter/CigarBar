import resolveModule from "../resolveModule";

/**
 * Declare angular service as class
 * Use @Requires to declare class requirements or @Inject in case of parameter based requirement declaration.
 * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
 * @param {string} name - name of defined service
 * @returns {ClassDecorator}
 */
export function Service(module: ng.IModule | string, name: string) {
   return function(target: Function) {
      module = resolveModule(module);
      (module as ng.IModule).service(name, target);
   };
}