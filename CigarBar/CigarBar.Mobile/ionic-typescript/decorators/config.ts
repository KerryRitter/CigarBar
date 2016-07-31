import resolveModule from "../resolveModule";

/**
 * Declare angular config clause with decorated class. New instance of decorated class will be instantiated inside config clause.
 * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
 * Only providers as constants able to be injected at config stage.
 * @param {ng.IModule | string} module - name or instance of angular module in which config clause should be defined.
 * @returns {ClassDecorator}
 */
export function Config(module: ng.IModule | string) {
   return function(target: any) {

      function config() {
         const context = Object.create(target.prototype);
         target.apply(context, arguments);
      }
      config.$inject = target.$inject || [];

      module = resolveModule(module);
      (module as ng.IModule).config(config);
   };
}