import resolveModule from "../resolveModule";

/**
 * Declare angular value provider with decorated class.
 * Injections are unavailable for this type of providers.
 * @param {ng.IModule | string} module - name or instance of angular module in which value should be defined.
 * @param {string} name - name of defined value.
 * @returns {MethodDecorator}
 */
export function Value(module: ng.IModule | string, name: string) {
   return function(target: any) {
      module = resolveModule(module);
      (module as ng.IModule).value(name, new target());
   };
}