import resolveModule from "../resolveModule";

/**
 * Define module or service injection requirements.
 * @param {string} requires - 1 or more names of modules to require for module injection or providers to inject to constructor.
 * @returns {ClassDecorator}
 */
export function Requires(...requires: string[]) {
   return function(target: Function) {
      target.$inject = requires || [];
   };
}