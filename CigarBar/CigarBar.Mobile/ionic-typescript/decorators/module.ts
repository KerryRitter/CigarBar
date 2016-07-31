import resolveModule from "../resolveModule";

/**
 * Declare angular module with given name.
 * Use @Requires to declare requirements.
 * Note: @Requires decorator should be put next line to the @Module.
 * Note: angular module instance will be passed to constructor.
 * @param {string} name - name of module.
 * @returns {ClassDecorator}
 */
export function Module(name: string) {
   return function(target: any) {
      target.$name = name;
      new target(angular.module(name, target.$inject || []));
   };
}