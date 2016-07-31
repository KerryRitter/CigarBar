import resolveModule from "../resolveModule";

/**
 * Declare angular service provider with decorated class.
 * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
 * New instance of provider decorated class will be instantiated once.
 * @param {ng.IModule | string} module - name or instance of angular module in which provider should be defined.
 * @param {string} name - name of defined provider.
 * @returns {ClassDecorator}
 */
export function Provider(module: ng.IModule | string, name: string) {
   return function(target: ng.IServiceProviderFactory) {
      module = resolveModule(module);
      (module as ng.IModule).provider(name, target);
   };
}