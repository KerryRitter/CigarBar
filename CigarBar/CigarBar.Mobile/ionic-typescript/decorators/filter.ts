import resolveModule from "../resolveModule";

/**
 * Declare angular factory with decorated factory method.
 * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
 * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
 * @param {string} name - name of defined filter
 * @returns {MethodDecorator}
 */
export function Filter(module: ng.IModule | string, name: string) {
   return function(target: any, key: string) {
      module = resolveModule(module);
      (module as ng.IModule).filter(name, target[key]);
   };
}