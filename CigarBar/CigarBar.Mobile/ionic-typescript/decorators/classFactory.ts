import resolveModule from "../resolveModule";

/**
 * Declare angular factory as class.
 * New instance of factory decorated class will be instantiated for each injection.
 * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
 * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
 * @param {string} name - name of defined factory
 * @returns {ClassDecorator}
 */
export function ClassFactory(module: ng.IModule | string, name: string) {
   return function(target: any) {

      function factory() {
         const context = Object.create(target.prototype);
         return target.apply(context, arguments);
      }
      factory.$inject = target.$inject || [];

      module = resolveModule(module);
      (module as ng.IModule).factory(name, factory);
   };
}