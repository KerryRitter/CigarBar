import resolveModule from "../resolveModule";

/**
 * Declare angular component with decorated class as controller.
 * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
 * @param {ng.IModule | string} module - name or instance of angular module in which directive should be defined.
 * @param {string} name - name of defined directive.
 * @param {ng.IDirective} [directive] = {} - directive params.
 * @returns {ClassDecorator}
 */
export function Component(module: ng.IModule | string, name: string, component?: ng.IComponentOptions) {
   return function(target: any) {
      module = resolveModule(module);
      (module as ng.IModule).component(name, angular.extend(component || {}, { controller: target }));
   };
}
