import resolveModule from "../resolveModule";

/**
 * Define parameter injection to constructor or function
 * @param {string} dependency - name of provider to include as
 * @returns {ParameterDecorator}
 */
export function Inject(dependency: string) {
   return function(target: any, key: string, index: number) {
      target = key ? target[key] : target;
      target.$inject = target.$inject || [];
      target.$inject[index] = dependency;
   };
}