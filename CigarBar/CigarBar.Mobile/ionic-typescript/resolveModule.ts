export default function resolveModule(module: ng.IModule | string) {
  return (angular.isString(module)
    ? angular.module(module as string)
    : (module as ng.IModule));
};