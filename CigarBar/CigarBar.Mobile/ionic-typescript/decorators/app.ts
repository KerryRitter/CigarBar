import resolveModule from "../resolveModule";

/**
 * Declare angular module with given name.
 * Use @Requires to declare requirements.
 * Note: @Requires decorator should be put next line to the @App.
 * Note: If module already defined it will be used to bootstrap aplication.
 * Note: angular module instance will be passed to constructor.
 * @param {string} name - name of module.
 * @returns {ClassDecorator}
 */
export function App(element: (string | Element | JQuery | Document) = document, name: string) {
   return function(target: any) {
      let module: ng.IModule;
      target.$name = name;

      try {
         module = angular.module(name);
      } catch (err) {
         module = angular.module(name, target.$inject || []);
      }
      new target(angular.module(name, target.$inject || []));

      function bootstrap() {
         angular.bootstrap(element, [target.$name]);
      }

      if ((window as any).$bootstrap) {
         (window as any).$bootstrap.then(bootstrap);
      } else {
         angular.element(element).ready(bootstrap);
      }
   };
}