import resolveModule from "../resolveModule";

/**
 * Declare angular service with decorated factory method.
 * Use @Requires to declare class requirements or @Inject in case of parameter based requirement declaration.
 * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
 * @param {string} name - name of defined service
 * @returns {MethodDecorator}
 */
export function ServiceFactory(module: ng.IModule | string, name: string) {
   return function(target: any, key: string) {
      module = resolveModule(module);
      (module as ng.IModule).service(name, target[key]);
   };
}