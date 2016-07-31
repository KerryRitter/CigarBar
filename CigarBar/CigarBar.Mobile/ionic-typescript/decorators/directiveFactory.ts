import resolveModule from "../resolveModule";

/**
 * Declare angular directive with decorated factory method.
 * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
 * @param {ng.IModule | string} module - name or instance of angular module in which directive should be defined.
 * @param {string} name - name of defined directive.
 * @param {ng.IDirective} [directive] = {} - directive params.
 * @returns {ClassDecorator}
 */
export function DirectiveFactory(module: ng.IModule | string, name: string) {
   return function(target: any, key: string) {
      module = resolveModule(module);
      (module as ng.IModule).directive(name, target[key]);
   };
}