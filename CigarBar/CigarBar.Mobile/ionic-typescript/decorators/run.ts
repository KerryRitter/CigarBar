import resolveModule from "../resolveModule";

/**
 * Declare angular run clause with decorated class. New instance of decorated class will be instantiated inside run clause.
 * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
 * @param {ng.IModule | string} module - name or instance of angular module in which run clause should be defined.
 * @returns {ClassDecorator}
 */
export function Run(module: ng.IModule | string) {
   return function(target: any) {

      function run() {
         const context = Object.create(target.prototype);
         target.apply(context, arguments);
      }
      run.$inject = target.$inject || [];

      module = resolveModule(module);
      (module as ng.IModule).run(run);
   };
}