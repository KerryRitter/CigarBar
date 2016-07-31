import resolveModule from "../resolveModule";

/**
 * Declare angular directive with decorated class as controller.
 * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
 * @param {ng.IModule | string} module - name or instance of angular module in which directive should be defined.
 * @param {string} name - name of defined directive.
 * @param {ng.IDirective} [directive] = {} - directive params.
 * @returns {ClassDecorator}
 */
export function Directive(module: ng.IModule | string, name: string, directive?: ng.IDirective) {
   return function(target: any) {
      module = resolveModule(module);
      (module as ng.IModule).directive(name, function() {
         return angular.extend(directive || {}, { controller: target });
      });
   };
}