import resolveModule from "../resolveModule";

/**
 * Declare angular factory as factory method.
 * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration
 * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
 * @param {string} name - name of defined factory
 * @returns {MethodDecorator}
 */
export function Factory(module: ng.IModule | string, name: string) {
   return function(target: any, key: string) {
      module = resolveModule(module);
      (module as ng.IModule).factory(name, target[key]);
   };
}