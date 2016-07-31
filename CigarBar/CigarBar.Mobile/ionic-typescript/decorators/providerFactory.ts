import resolveModule from "../resolveModule";

/**
 * Declare angular service provider with decorated factory method.
 * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
 * @param {ng.IModule | string} module - name or instance of angular module in which provider should be defined.
 * @param {string} name - name of defined directive.
 * @returns {MethodDecorator}
 */
export function ProviderFactory(module: ng.IModule | string, name: string) {
   return function(target: any, key: string) {
      module = resolveModule(module);
      (module as ng.IModule).provider(name, target[key]);
   };
}