import resolveModule from "../resolveModule";

/**
 * Declare angular constant provider with decorated class.
 * Injections are unavailable for this type of providers.
 * @param {ng.IModule | string} module - name or instance of angular module in which constant should be defined.
 * @param {string} name - name of defined constant.
 * @returns {MethodDecorator}
 */
export function Constant(module: ng.IModule | string, name: string) {
   return function(target: any) {
      module = resolveModule(module);
      (module as ng.IModule).constant(name, new target());
   };
}