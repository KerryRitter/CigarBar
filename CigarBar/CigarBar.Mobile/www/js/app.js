var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
System.register("angular-openiddict/service", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OpenIddictHttpService;
    return {
        setters:[],
        execute: function() {
            OpenIddictHttpService = (function () {
                function OpenIddictHttpService(_httpService, _windowService, _qService, _config) {
                    this._httpService = _httpService;
                    this._windowService = _windowService;
                    this._qService = _qService;
                    this._config = _config;
                }
                OpenIddictHttpService.prototype.register = function (email, password) {
                    var _this = this;
                    return this._qService(function (resolve, reject) {
                        return _this._httpService({
                            method: "POST",
                            url: _this._config.registerUrl,
                            data: {
                                email: email,
                                password: password,
                            }
                        })
                            .success(function (data, status, headers, config) {
                            if (data.succeeded) {
                                resolve({
                                    success: true,
                                    messages: null
                                });
                            }
                            else {
                                var message = "There was an error during registration";
                                try {
                                    message = data.errors[0].description;
                                }
                                catch (ex) {
                                    console.log(ex);
                                }
                                reject({
                                    success: false,
                                    messages: [message]
                                });
                            }
                        }).error(function (data, status, headers, config) {
                            reject({
                                success: false,
                                messages: ["There was a server error during registration"]
                            });
                        });
                    });
                };
                OpenIddictHttpService.prototype.login = function (email, password) {
                    var _this = this;
                    return this._qService(function (resolve, reject) {
                        return _this._httpService({
                            method: "POST",
                            url: _this._config.tokenUrl,
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            data: {
                                username: email,
                                password: password,
                                grant_type: "password",
                                scope: "profile email"
                            },
                            transformRequest: _this.transformToQueryString
                        })
                            .success(function (data, status, headers, config) {
                            if (data.error) {
                                resolve({
                                    success: false,
                                    messages: [data.error_description]
                                });
                            }
                            else {
                                _this._windowService.localStorage.setItem("token", JSON.stringify(data));
                                resolve({
                                    success: true,
                                    messages: null
                                });
                            }
                        }).error(function (data, status, headers, config) {
                            reject(data);
                        });
                    });
                };
                OpenIddictHttpService.prototype.get = function (url, config) {
                    return this._httpService.get(url, this.addTokenHeader(config));
                };
                OpenIddictHttpService.prototype.delete = function (url, config) {
                    return this._httpService.delete(url, this.addTokenHeader(config));
                };
                OpenIddictHttpService.prototype.head = function (url, config) {
                    return this._httpService.head(url, this.addTokenHeader(config));
                };
                OpenIddictHttpService.prototype.jsonp = function (url, config) {
                    return this._httpService.jsonp(url, this.addTokenHeader(config));
                };
                OpenIddictHttpService.prototype.post = function (url, data, config) {
                    return this._httpService.post(url, data, this.addTokenHeader(config));
                };
                OpenIddictHttpService.prototype.put = function (url, data, config) {
                    return this._httpService.put(url, data, this.addTokenHeader(config));
                };
                OpenIddictHttpService.prototype.patch = function (url, data, config) {
                    return this._httpService.patch(url, data, this.addTokenHeader(config));
                };
                Object.defineProperty(OpenIddictHttpService.prototype, "token", {
                    get: function () {
                        var tokenPayloadJson = this._windowService.localStorage.getItem("token");
                        if (!tokenPayloadJson) {
                            return null;
                        }
                        try {
                            var token = JSON.parse(tokenPayloadJson);
                            return token && token.access_token ? token.access_token : null;
                        }
                        catch (ex) {
                            return null;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                OpenIddictHttpService.prototype.clearToken = function () {
                    this._windowService.localStorage.removeItem("token");
                };
                OpenIddictHttpService.prototype.addTokenHeader = function (config) {
                    if (!config) {
                        config = {};
                    }
                    if (!config.headers) {
                        config.headers = {};
                    }
                    config.headers["Authorization"] = "Bearer " + this.token;
                    return config;
                };
                OpenIddictHttpService.prototype.transformToQueryString = function (obj) {
                    var str = [];
                    for (var p in obj) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                };
                OpenIddictHttpService.$inject = ["$http", "$window", "$q", "openIddictConfig"];
                return OpenIddictHttpService;
            }());
            exports_1("OpenIddictHttpService", OpenIddictHttpService);
        }
    }
});
System.register("angular-openiddict/angular-openiddict", ["angular-openiddict/service"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var service_1;
    var AngularOpenIddict;
    return {
        setters:[
            function (service_1_1) {
                service_1 = service_1_1;
            }],
        execute: function() {
            AngularOpenIddict = angular.module("openIddict", []);
            AngularOpenIddict.value("openIddictConfig", {});
            AngularOpenIddict.service("openIddictHttpService", service_1.OpenIddictHttpService);
        }
    }
});
System.register("ionic-typescript/pageBase", [], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var PageBase;
    return {
        setters:[],
        execute: function() {
            PageBase = (function () {
                function PageBase(scope) {
                    var _this = this;
                    this.scope = scope;
                    scope.$on("$ionicView.loaded", function (event, data) {
                        _this.ionViewLoaded(event, data);
                    });
                    scope.$on("$ionicView.enter", function (event, data) {
                        _this.ionViewDidEnter(event, data);
                    });
                    scope.$on("$ionicView.leave", function (event, data) {
                        _this.ionViewDidLeave(event, data);
                    });
                    scope.$on("$ionicView.beforeEnter", function (event, data) {
                        _this.ionViewWillEnter(event, data);
                    });
                    scope.$on("$ionicView.beforeLeave", function (event, data) {
                        _this.ionViewWillLeave(event, data);
                    });
                    scope.$on("$ionicView.unloaded", function (event, data) {
                        _this.ionViewDidUnload(event, data);
                    });
                }
                PageBase.prototype.ionViewLoaded = function (event, data) {
                    return null;
                };
                PageBase.prototype.ionViewDidEnter = function (event, data) {
                    return null;
                };
                PageBase.prototype.ionViewDidLeave = function (event, data) {
                    return null;
                };
                PageBase.prototype.ionViewWillEnter = function (event, data) {
                    return null;
                };
                PageBase.prototype.ionViewWillLeave = function (event, data) {
                    return null;
                };
                PageBase.prototype.ionViewDidUnload = function (event, data) {
                    return null;
                };
                return PageBase;
            }());
            exports_3("PageBase", PageBase);
        }
    }
});
System.register("ionic-typescript/navController", [], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var NavController;
    return {
        setters:[],
        execute: function() {
            NavController = (function () {
                function NavController(_logService, state, history, _ionicViewSwitcher) {
                    this._logService = _logService;
                    this.state = state;
                    this.history = history;
                    this._ionicViewSwitcher = _ionicViewSwitcher;
                }
                NavController.prototype.push = function (page, params, options) {
                    if (options) {
                        this.history.nextViewOptions(options);
                    }
                    this.state.go(page.__stateName, params);
                };
                NavController.prototype.pop = function (params, options) {
                    var _this = this;
                    var lastView = this.history.backView();
                    if (!lastView) {
                        this._logService.warn("Could not pop state - no last view found.");
                        return;
                    }
                    if (options) {
                        this.history.nextViewOptions(options);
                    }
                    this._ionicViewSwitcher.nextDirection("back");
                    this.state.go(lastView.stateName, params)
                        .then(function (callback) {
                        _this.history.removeBackView();
                    });
                };
                NavController.prototype.popMany = function (backCount) {
                    if (backCount && backCount > 0) {
                        backCount = backCount * -1;
                        this._logService.warn("NavController popMany was called with a positive number. Inverting value to " + backCount + ".");
                    }
                    this.history.goBack(backCount);
                };
                NavController.$inject = ["$log", "$state", "$ionicHistory", "$ionicViewSwitcher"];
                return NavController;
            }());
            exports_4("NavController", NavController);
        }
    }
});
System.register("ionic-typescript/navParams", [], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var NavParams;
    return {
        setters:[],
        execute: function() {
            NavParams = (function () {
                function NavParams(_stateService) {
                    this._stateService = _stateService;
                }
                NavParams.prototype.get = function (parameter) {
                    return this._stateService.params[parameter];
                };
                NavParams.$inject = ["$state"];
                return NavParams;
            }());
            exports_5("NavParams", NavParams);
        }
    }
});
System.register("ionic-typescript/ionic1-forward", ["ionic-typescript/navController", "ionic-typescript/navParams"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var navController_1, navParams_1;
    var Ionic1Forward;
    return {
        setters:[
            function (navController_1_1) {
                navController_1 = navController_1_1;
            },
            function (navParams_1_1) {
                navParams_1 = navParams_1_1;
            }],
        execute: function() {
            Ionic1Forward = angular.module("ionic1-forward", []);
            Ionic1Forward.service("navController", navController_1.NavController);
            Ionic1Forward.service("navParams", navParams_1.NavParams);
        }
    }
});
System.register("ionic-typescript/resolveModule", [], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    function resolveModule(module) {
        return (angular.isString(module)
            ? angular.module(module)
            : module);
    }
    exports_7("default", resolveModule);
    return {
        setters:[],
        execute: function() {
            ;
        }
    }
});
System.register("ionic-typescript/sideMenuBase", [], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var SideMenuBase;
    return {
        setters:[],
        execute: function() {
            SideMenuBase = (function () {
                function SideMenuBase() {
                }
                return SideMenuBase;
            }());
            exports_8("SideMenuBase", SideMenuBase);
        }
    }
});
System.register("ionic-typescript/decorators/app", [], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    /**
     * Declare angular module with given name.
     * Use @Requires to declare requirements.
     * Note: @Requires decorator should be put next line to the @App.
     * Note: If module already defined it will be used to bootstrap aplication.
     * Note: angular module instance will be passed to constructor.
     * @param {string} name - name of module.
     * @returns {ClassDecorator}
     */
    function App(element, name) {
        if (element === void 0) { element = document; }
        return function (target) {
            var module;
            target.$name = name;
            try {
                module = angular.module(name);
            }
            catch (err) {
                module = angular.module(name, target.$inject || []);
            }
            new target(angular.module(name, target.$inject || []));
            function bootstrap() {
                angular.bootstrap(element, [target.$name]);
            }
            if (window.$bootstrap) {
                window.$bootstrap.then(bootstrap);
            }
            else {
                angular.element(element).ready(bootstrap);
            }
        };
    }
    exports_9("App", App);
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/classFactory", ["ionic-typescript/resolveModule"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var resolveModule_1;
    /**
     * Declare angular factory as class.
     * New instance of factory decorated class will be instantiated for each injection.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
     * @param {string} name - name of defined factory
     * @returns {ClassDecorator}
     */
    function ClassFactory(module, name) {
        return function (target) {
            function factory() {
                var context = Object.create(target.prototype);
                return target.apply(context, arguments);
            }
            factory.$inject = target.$inject || [];
            module = resolveModule_1.default(module);
            module.factory(name, factory);
        };
    }
    exports_10("ClassFactory", ClassFactory);
    return {
        setters:[
            function (resolveModule_1_1) {
                resolveModule_1 = resolveModule_1_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/component", ["ionic-typescript/resolveModule"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var resolveModule_2;
    /**
     * Declare angular component with decorated class as controller.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which directive should be defined.
     * @param {string} name - name of defined directive.
     * @param {ng.IDirective} [directive] = {} - directive params.
     * @returns {ClassDecorator}
     */
    function Component(module, name, component) {
        return function (target) {
            module = resolveModule_2.default(module);
            module.component(name, angular.extend(component || {}, { controller: target }));
        };
    }
    exports_11("Component", Component);
    return {
        setters:[
            function (resolveModule_2_1) {
                resolveModule_2 = resolveModule_2_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/config", ["ionic-typescript/resolveModule"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var resolveModule_3;
    /**
     * Declare angular config clause with decorated class. New instance of decorated class will be instantiated inside config clause.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * Only providers as constants able to be injected at config stage.
     * @param {ng.IModule | string} module - name or instance of angular module in which config clause should be defined.
     * @returns {ClassDecorator}
     */
    function Config(module) {
        return function (target) {
            function config() {
                var context = Object.create(target.prototype);
                target.apply(context, arguments);
            }
            config.$inject = target.$inject || [];
            module = resolveModule_3.default(module);
            module.config(config);
        };
    }
    exports_12("Config", Config);
    return {
        setters:[
            function (resolveModule_3_1) {
                resolveModule_3 = resolveModule_3_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/constant", ["ionic-typescript/resolveModule"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var resolveModule_4;
    /**
     * Declare angular constant provider with decorated class.
     * Injections are unavailable for this type of providers.
     * @param {ng.IModule | string} module - name or instance of angular module in which constant should be defined.
     * @param {string} name - name of defined constant.
     * @returns {MethodDecorator}
     */
    function Constant(module, name) {
        return function (target) {
            module = resolveModule_4.default(module);
            module.constant(name, new target());
        };
    }
    exports_13("Constant", Constant);
    return {
        setters:[
            function (resolveModule_4_1) {
                resolveModule_4 = resolveModule_4_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/controller", ["ionic-typescript/resolveModule"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var resolveModule_5;
    /**
     * Declare angular controller as class.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
     * @param {string} name - name of defined controller
     * @returns {ClassDecorator}
     */
    function Controller(module, name) {
        return function (target) {
            module = resolveModule_5.default(module);
            module.controller(name, target);
        };
    }
    exports_14("Controller", Controller);
    return {
        setters:[
            function (resolveModule_5_1) {
                resolveModule_5 = resolveModule_5_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/directive", ["ionic-typescript/resolveModule"], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var resolveModule_6;
    /**
     * Declare angular directive with decorated class as controller.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which directive should be defined.
     * @param {string} name - name of defined directive.
     * @param {ng.IDirective} [directive] = {} - directive params.
     * @returns {ClassDecorator}
     */
    function Directive(module, name, directive) {
        return function (target) {
            module = resolveModule_6.default(module);
            module.directive(name, function () {
                return angular.extend(directive || {}, { controller: target });
            });
        };
    }
    exports_15("Directive", Directive);
    return {
        setters:[
            function (resolveModule_6_1) {
                resolveModule_6 = resolveModule_6_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/directiveFactory", ["ionic-typescript/resolveModule"], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var resolveModule_7;
    /**
     * Declare angular directive with decorated factory method.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which directive should be defined.
     * @param {string} name - name of defined directive.
     * @param {ng.IDirective} [directive] = {} - directive params.
     * @returns {ClassDecorator}
     */
    function DirectiveFactory(module, name) {
        return function (target, key) {
            module = resolveModule_7.default(module);
            module.directive(name, target[key]);
        };
    }
    exports_16("DirectiveFactory", DirectiveFactory);
    return {
        setters:[
            function (resolveModule_7_1) {
                resolveModule_7 = resolveModule_7_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/factory", ["ionic-typescript/resolveModule"], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var resolveModule_8;
    /**
     * Declare angular factory as factory method.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration
     * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
     * @param {string} name - name of defined factory
     * @returns {MethodDecorator}
     */
    function Factory(module, name) {
        return function (target, key) {
            module = resolveModule_8.default(module);
            module.factory(name, target[key]);
        };
    }
    exports_17("Factory", Factory);
    return {
        setters:[
            function (resolveModule_8_1) {
                resolveModule_8 = resolveModule_8_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/filter", ["ionic-typescript/resolveModule"], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var resolveModule_9;
    /**
     * Declare angular factory with decorated factory method.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
     * @param {string} name - name of defined filter
     * @returns {MethodDecorator}
     */
    function Filter(module, name) {
        return function (target, key) {
            module = resolveModule_9.default(module);
            module.filter(name, target[key]);
        };
    }
    exports_18("Filter", Filter);
    return {
        setters:[
            function (resolveModule_9_1) {
                resolveModule_9 = resolveModule_9_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/inject", [], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    /**
     * Define parameter injection to constructor or function
     * @param {string} dependency - name of provider to include as
     * @returns {ParameterDecorator}
     */
    function Inject(dependency) {
        return function (target, key, index) {
            target = key ? target[key] : target;
            target.$inject = target.$inject || [];
            target.$inject[index] = dependency;
        };
    }
    exports_19("Inject", Inject);
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/module", [], function(exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    /**
     * Declare angular module with given name.
     * Use @Requires to declare requirements.
     * Note: @Requires decorator should be put next line to the @Module.
     * Note: angular module instance will be passed to constructor.
     * @param {string} name - name of module.
     * @returns {ClassDecorator}
     */
    function Module(name) {
        return function (target) {
            target.$name = name;
            new target(angular.module(name, target.$inject || []));
        };
    }
    exports_20("Module", Module);
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/page", ["ionic-typescript/resolveModule"], function(exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var resolveModule_10;
    /**
     * Declare UIRouter state with decorated class as controller.
     * @link https://angular-ui.github.io/ui-router/site/#/api/ui.router
     * Note: controllerAs: $ctrl - User $ctrl for binding to controller in templates
     * @param {ng.IModule | string} module - name or instance of angular module in which config clause should be defined.
     * @param {string} stateName - name of UIRouter state state.
     * @param {ng.ui.IState} [config = {}] - state config params.
     * @returns {ClassDecorator}
     */
    function Page(module, stateName, config) {
        if (config === void 0) { config = {}; }
        return function (target) {
            module = resolveModule_10.default(module);
            module.config(["$stateProvider", function ($stateProvider) {
                    target.__stateName = stateName;
                    $stateProvider
                        .state(stateName, angular.extend({
                        controller: target,
                        controllerAs: "$ctrl"
                    }, config));
                }]);
        };
    }
    exports_21("Page", Page);
    return {
        setters:[
            function (resolveModule_10_1) {
                resolveModule_10 = resolveModule_10_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/provider", ["ionic-typescript/resolveModule"], function(exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var resolveModule_11;
    /**
     * Declare angular service provider with decorated class.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * New instance of provider decorated class will be instantiated once.
     * @param {ng.IModule | string} module - name or instance of angular module in which provider should be defined.
     * @param {string} name - name of defined provider.
     * @returns {ClassDecorator}
     */
    function Provider(module, name) {
        return function (target) {
            module = resolveModule_11.default(module);
            module.provider(name, target);
        };
    }
    exports_22("Provider", Provider);
    return {
        setters:[
            function (resolveModule_11_1) {
                resolveModule_11 = resolveModule_11_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/providerFactory", ["ionic-typescript/resolveModule"], function(exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var resolveModule_12;
    /**
     * Declare angular service provider with decorated factory method.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which provider should be defined.
     * @param {string} name - name of defined directive.
     * @returns {MethodDecorator}
     */
    function ProviderFactory(module, name) {
        return function (target, key) {
            module = resolveModule_12.default(module);
            module.provider(name, target[key]);
        };
    }
    exports_23("ProviderFactory", ProviderFactory);
    return {
        setters:[
            function (resolveModule_12_1) {
                resolveModule_12 = resolveModule_12_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/requires", [], function(exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    /**
     * Define module or service injection requirements.
     * @param {string} requires - 1 or more names of modules to require for module injection or providers to inject to constructor.
     * @returns {ClassDecorator}
     */
    function Requires() {
        var requires = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            requires[_i - 0] = arguments[_i];
        }
        return function (target) {
            target.$inject = requires || [];
        };
    }
    exports_24("Requires", Requires);
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/run", ["ionic-typescript/resolveModule"], function(exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var resolveModule_13;
    /**
     * Declare angular run clause with decorated class. New instance of decorated class will be instantiated inside run clause.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which run clause should be defined.
     * @returns {ClassDecorator}
     */
    function Run(module) {
        return function (target) {
            function run() {
                var context = Object.create(target.prototype);
                target.apply(context, arguments);
            }
            run.$inject = target.$inject || [];
            module = resolveModule_13.default(module);
            module.run(run);
        };
    }
    exports_25("Run", Run);
    return {
        setters:[
            function (resolveModule_13_1) {
                resolveModule_13 = resolveModule_13_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/service", ["ionic-typescript/resolveModule"], function(exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var resolveModule_14;
    /**
     * Declare angular service as class
     * Use @Requires to declare class requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
     * @param {string} name - name of defined service
     * @returns {ClassDecorator}
     */
    function Service(module, name) {
        return function (target) {
            module = resolveModule_14.default(module);
            module.service(name, target);
        };
    }
    exports_26("Service", Service);
    return {
        setters:[
            function (resolveModule_14_1) {
                resolveModule_14 = resolveModule_14_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/serviceFactory", ["ionic-typescript/resolveModule"], function(exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var resolveModule_15;
    /**
     * Declare angular service with decorated factory method.
     * Use @Requires to declare class requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
     * @param {string} name - name of defined service
     * @returns {MethodDecorator}
     */
    function ServiceFactory(module, name) {
        return function (target, key) {
            module = resolveModule_15.default(module);
            module.service(name, target[key]);
        };
    }
    exports_27("ServiceFactory", ServiceFactory);
    return {
        setters:[
            function (resolveModule_15_1) {
                resolveModule_15 = resolveModule_15_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/sideMenu", ["ionic-typescript/resolveModule"], function(exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var resolveModule_16;
    function getTemplateWrapper(config) {
        config.navBarClass = config.navBarClass ? config.navBarClass : "bar-positive";
        config.menuTriggerButtonClass = config.menuTriggerButtonClass ? config.menuTriggerButtonClass : "button-clear";
        config.menuHeaderBarClass = config.menuHeaderBarClass ? config.menuHeaderBarClass : "bar-stable";
        config.menuHeaderBarTitle = config.menuHeaderBarTitle ? config.menuHeaderBarTitle : "Menu";
        return "<ion-side-menus>\n                <ion-side-menu-content>\n                    <ion-nav-bar class=\"" + config.navBarClass + "\">\n                        <ion-nav-back-button>\n                        </ion-nav-back-button>\n                        <ion-nav-buttons side=\"left\">\n                            <button class=\"button button-icon ion-navicon " + config.menuTriggerButtonClass + "\" menu-toggle=\"left\"></button>\n                        </ion-nav-buttons>\n                    </ion-nav-bar>\n                    <ion-nav-view name=\"menuContent\"></ion-nav-view>\n                </ion-side-menu-content>\n                <ion-side-menu side=\"left\" enable-menu-with-back-views=\"true\">\n                    <ion-header-bar class=\"" + config.menuHeaderBarClass + "\">\n                        <h1 class=\"title\">" + config.menuHeaderBarTitle + "</h1>\n                    </ion-header-bar>\n                    <ion-content scroll=\"false\">\n                        " + config.template + "\n                    </ion-content>\n                </ion-side-menu>\n            </ion-side-menus>";
    }
    function SideMenu(module, stateName, config) {
        return function (target) {
            module = resolveModule_16.default(module);
            module.config(["$stateProvider", function ($stateProvider) {
                    config.template = getTemplateWrapper(config);
                    target.__menuStateName = stateName;
                    $stateProvider.state(stateName, angular.extend({
                        abstract: true,
                        controller: target,
                        controllerAs: "$ctrl"
                    }, config));
                }]);
        };
    }
    exports_28("SideMenu", SideMenu);
    return {
        setters:[
            function (resolveModule_16_1) {
                resolveModule_16 = resolveModule_16_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/sideMenuPage", ["ionic-typescript/resolveModule"], function(exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var resolveModule_17;
    /**
     * Declare UIRouter state with decorated class as controller.
     * @link https://angular-ui.github.io/ui-router/site/#/api/ui.router
     * Note: controllerAs: $ctrl - User $ctrl for binding to controller in templates
     * @param {ng.IModule | string} module - name or instance of angular module in which config clause should be defined.
     * @param {string} stateName - name of UIRouter state state.
     * @param {ng.ui.IState} [config = {}] - state config params.
     * @returns {ClassDecorator}
     */
    function SideMenuPage(module, sideMenu, stateName, config) {
        if (config === void 0) { config = {}; }
        return function (target) {
            module = resolveModule_17.default(module);
            module.config(["$stateProvider", function ($stateProvider) {
                    var url = (" " + config.url).slice(1);
                    var params = config.params;
                    delete config.url;
                    delete config.params;
                    if (typeof sideMenu === "string") {
                        target.__stateName = sideMenu + "." + stateName;
                    }
                    else {
                        target.__stateName = sideMenu.__menuStateName + "." + stateName;
                    }
                    var stateProperties = {
                        url: url,
                        params: params,
                        views: {
                            menuContent: angular.extend({
                                controller: target,
                                controllerAs: "$ctrl"
                            }, config)
                        }
                    };
                    $stateProvider.state(target.__stateName, stateProperties);
                }]);
        };
    }
    exports_29("SideMenuPage", SideMenuPage);
    return {
        setters:[
            function (resolveModule_17_1) {
                resolveModule_17 = resolveModule_17_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/value", ["ionic-typescript/resolveModule"], function(exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    var resolveModule_18;
    /**
     * Declare angular value provider with decorated class.
     * Injections are unavailable for this type of providers.
     * @param {ng.IModule | string} module - name or instance of angular module in which value should be defined.
     * @param {string} name - name of defined value.
     * @returns {MethodDecorator}
     */
    function Value(module, name) {
        return function (target) {
            module = resolveModule_18.default(module);
            module.value(name, new target());
        };
    }
    exports_30("Value", Value);
    return {
        setters:[
            function (resolveModule_18_1) {
                resolveModule_18 = resolveModule_18_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/index", ["ionic-typescript/decorators/app", "ionic-typescript/decorators/classFactory", "ionic-typescript/decorators/component", "ionic-typescript/decorators/config", "ionic-typescript/decorators/constant", "ionic-typescript/decorators/controller", "ionic-typescript/decorators/directive", "ionic-typescript/decorators/directiveFactory", "ionic-typescript/decorators/factory", "ionic-typescript/decorators/filter", "ionic-typescript/decorators/inject", "ionic-typescript/decorators/module", "ionic-typescript/decorators/page", "ionic-typescript/decorators/provider", "ionic-typescript/decorators/providerFactory", "ionic-typescript/decorators/requires", "ionic-typescript/decorators/run", "ionic-typescript/decorators/service", "ionic-typescript/decorators/serviceFactory", "ionic-typescript/decorators/sideMenu", "ionic-typescript/decorators/sideMenuPage", "ionic-typescript/decorators/value"], function(exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    return {
        setters:[
            function (app_1_1) {
                exports_31({
                    "App": app_1_1["App"]
                });
            },
            function (classFactory_1_1) {
                exports_31({
                    "ClassFactory": classFactory_1_1["ClassFactory"]
                });
            },
            function (component_1_1) {
                exports_31({
                    "Component": component_1_1["Component"]
                });
            },
            function (config_1_1) {
                exports_31({
                    "Config": config_1_1["Config"]
                });
            },
            function (constant_1_1) {
                exports_31({
                    "Constant": constant_1_1["Constant"]
                });
            },
            function (controller_1_1) {
                exports_31({
                    "Controller": controller_1_1["Controller"]
                });
            },
            function (directive_1_1) {
                exports_31({
                    "Directive": directive_1_1["Directive"]
                });
            },
            function (directiveFactory_1_1) {
                exports_31({
                    "DirectiveFactory": directiveFactory_1_1["DirectiveFactory"]
                });
            },
            function (factory_1_1) {
                exports_31({
                    "Factory": factory_1_1["Factory"]
                });
            },
            function (filter_1_1) {
                exports_31({
                    "Filter": filter_1_1["Filter"]
                });
            },
            function (inject_1_1) {
                exports_31({
                    "Inject": inject_1_1["Inject"]
                });
            },
            function (module_1_1) {
                exports_31({
                    "Module": module_1_1["Module"]
                });
            },
            function (page_1_1) {
                exports_31({
                    "Page": page_1_1["Page"]
                });
            },
            function (provider_1_1) {
                exports_31({
                    "Provider": provider_1_1["Provider"]
                });
            },
            function (providerFactory_1_1) {
                exports_31({
                    "ProviderFactory": providerFactory_1_1["ProviderFactory"]
                });
            },
            function (requires_1_1) {
                exports_31({
                    "Requires": requires_1_1["Requires"]
                });
            },
            function (run_1_1) {
                exports_31({
                    "Run": run_1_1["Run"]
                });
            },
            function (service_2_1) {
                exports_31({
                    "Service": service_2_1["Service"]
                });
            },
            function (serviceFactory_1_1) {
                exports_31({
                    "ServiceFactory": serviceFactory_1_1["ServiceFactory"]
                });
            },
            function (sideMenu_1_1) {
                exports_31({
                    "SideMenu": sideMenu_1_1["SideMenu"]
                });
            },
            function (sideMenuPage_1_1) {
                exports_31({
                    "SideMenuPage": sideMenuPage_1_1["SideMenuPage"]
                });
            },
            function (value_1_1) {
                exports_31({
                    "Value": value_1_1["Value"]
                });
            }],
        execute: function() {
        }
    }
});
/// <reference path="typings.d.ts" />
System.register("ts/app", ["ionic-typescript/decorators/index", "ionic-typescript/pageBase", "ionic-typescript/sideMenuBase", "ionic-typescript/navController", "angular-openiddict/service"], function(exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var decorators_1;
    var IonicApplication, IonicApplicationRun;
    var exportedNames_1 = {
        'IonicApplication': true,
        'PageBase': true,
        'SideMenuBase': true,
        'ISideMenuConfig': true,
        'NavController': true,
        'OpenIddictHttpService': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_32(exports);
    }
    return {
        setters:[
            function (decorators_2_1) {
                exportStar_1(decorators_2_1);
                decorators_1 = decorators_2_1;
            },
            function (pageBase_1_1) {
                exports_32({
                    "PageBase": pageBase_1_1["PageBase"]
                });
            },
            function (sideMenuBase_1_1) {
                exports_32({
                    "SideMenuBase": sideMenuBase_1_1["SideMenuBase"],
                    "ISideMenuConfig": sideMenuBase_1_1["ISideMenuConfig"]
                });
            },
            function (navController_2_1) {
                exports_32({
                    "NavController": navController_2_1["NavController"]
                });
            },
            function (service_3_1) {
                exports_32({
                    "OpenIddictHttpService": service_3_1["OpenIddictHttpService"]
                });
            }],
        execute: function() {
            exports_32("IonicApplication", IonicApplication = angular.module("app", ["ionic", "openIddict", "ionic1-forward"]));
            IonicApplication.config(["$urlRouterProvider", function ($urlRouterProvider) {
                    $urlRouterProvider.otherwise("/login");
                }]);
            IonicApplication.value("baseUrl", "http://localhost:5000/");
            IonicApplicationRun = (function () {
                function IonicApplicationRun(ionicPlatform, openIddictConfig, _baseUrl) {
                    this.ionicPlatform = ionicPlatform;
                    this.openIddictConfig = openIddictConfig;
                    this._baseUrl = _baseUrl;
                    openIddictConfig.scope = "email profile";
                    openIddictConfig.registerUrl = _baseUrl + "api/account";
                    openIddictConfig.tokenUrl = _baseUrl + "connect/token";
                    ionicPlatform.ready(function () {
                        if (window.cordova && window.cordova.plugins.Keyboard) {
                            window.cordova.plugins.hideKeyboardAccessoryBar(true);
                            window.cordova.plugins.disableScroll(true);
                        }
                        if (window.StatusBar) {
                            window.StatusBar.styleDefault();
                        }
                    });
                }
                IonicApplicationRun = __decorate([
                    decorators_1.Run(IonicApplication),
                    __param(0, decorators_1.Inject("$ionicPlatform")),
                    __param(1, decorators_1.Inject("openIddictConfig")),
                    __param(2, decorators_1.Inject("baseUrl")), 
                    __metadata('design:paramtypes', [Object, Object, String])
                ], IonicApplicationRun);
                return IonicApplicationRun;
            }());
        }
    }
});
System.register("ts/components/fiveStarRating", ["ts/app"], function(exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    var app_2;
    var FiveStarRating;
    return {
        setters:[
            function (app_2_1) {
                app_2 = app_2_1;
            }],
        execute: function() {
            FiveStarRating = (function () {
                function FiveStarRating() {
                }
                FiveStarRating.prototype.starClass = function (star) {
                    return {
                        "ion-ios-star": star <= this.rating,
                        "ion-ios-star-outline": star > this.rating,
                    };
                };
                FiveStarRating.prototype.setRating = function (newRating) {
                    if (this.readonly) {
                        return;
                    }
                    this.rating = newRating;
                };
                FiveStarRating = __decorate([
                    app_2.Component(app_2.IonicApplication, "fiveStarRating", {
                        template: "\n        <i ng-class=\"$ctrl.starClass(1)\" ng-click=\"$ctrl.setRating(1)\"></i>\n        <i ng-class=\"$ctrl.starClass(2)\" ng-click=\"$ctrl.setRating(2)\"></i>\n        <i ng-class=\"$ctrl.starClass(3)\" ng-click=\"$ctrl.setRating(3)\"></i>\n        <i ng-class=\"$ctrl.starClass(4)\" ng-click=\"$ctrl.setRating(4)\"></i>\n        <i ng-class=\"$ctrl.starClass(5)\" ng-click=\"$ctrl.setRating(5)\"></i>\n    ",
                        bindings: {
                            rating: "=",
                            readonly: "="
                        }
                    }), 
                    __metadata('design:paramtypes', [])
                ], FiveStarRating);
                return FiveStarRating;
            }());
            exports_33("FiveStarRating", FiveStarRating);
        }
    }
});
System.register("ts/components/lastModifiedDate", ["ts/app"], function(exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    var app_3;
    var LastModifiedDate;
    return {
        setters:[
            function (app_3_1) {
                app_3 = app_3_1;
            }],
        execute: function() {
            LastModifiedDate = (function () {
                function LastModifiedDate() {
                }
                Object.defineProperty(LastModifiedDate.prototype, "lastModifiedDisplay", {
                    get: function () {
                        var lastModifiedMoment = window.moment(this.date);
                        var wasWithinAWeek = lastModifiedMoment <= window.moment().subtract(7, "days");
                        if (this.fullDateOnly || wasWithinAWeek) {
                            return (this.fullDatePrefix ? this.fullDatePrefix : "") + " " + lastModifiedMoment.format("MMMM Do YYYY, h:mm a");
                        }
                        return lastModifiedMoment.fromNow();
                    },
                    enumerable: true,
                    configurable: true
                });
                LastModifiedDate = __decorate([
                    app_3.Component(app_3.IonicApplication, "lastModifiedDate", {
                        template: "\n        <span>{{$ctrl.prefix ? $ctrl.prefix : ''}} {{$ctrl.lastModifiedDisplay}}</span>\n    ",
                        bindings: {
                            date: "=",
                            prefix: "=",
                            fullDatePrefix: "=",
                            fullDateOnly: "="
                        }
                    }), 
                    __metadata('design:paramtypes', [])
                ], LastModifiedDate);
                return LastModifiedDate;
            }());
            exports_34("LastModifiedDate", LastModifiedDate);
        }
    }
});
System.register("ts/services/ratingService", ["ts/app"], function(exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    var app_4;
    var RatingService;
    return {
        setters:[
            function (app_4_1) {
                app_4 = app_4_1;
            }],
        execute: function() {
            RatingService = (function () {
                function RatingService(_logService, _openIddictHttpService, _baseUrl) {
                    this._logService = _logService;
                    this._openIddictHttpService = _openIddictHttpService;
                    this._baseUrl = _baseUrl;
                }
                RatingService.prototype.get = function () {
                    var url = this._baseUrl + "api/me/ratings";
                    this._logService.info("GET request to " + url);
                    return this._openIddictHttpService.get(url);
                };
                RatingService.prototype.post = function (rating) {
                    var url = this._baseUrl + "api/me/ratings";
                    this._logService.info("POST request to " + url);
                    return this._openIddictHttpService.post(url, rating);
                };
                RatingService.prototype.put = function (rating) {
                    var url = this._baseUrl + "api/me/ratings/" + rating.id;
                    this._logService.info("PUT request to " + url);
                    return this._openIddictHttpService.put(url, rating);
                };
                RatingService.prototype.delete = function (rating) {
                    var url = this._baseUrl + "api/me/ratings/" + rating.id;
                    this._logService.info("DELETE request to " + url);
                    return this._openIddictHttpService.delete(url);
                };
                RatingService = __decorate([
                    app_4.Service(app_4.IonicApplication, "ratingService"),
                    __param(0, app_4.Inject("$log")),
                    __param(1, app_4.Inject("openIddictHttpService")),
                    __param(2, app_4.Inject("baseUrl")), 
                    __metadata('design:paramtypes', [Object, app_4.OpenIddictHttpService, String])
                ], RatingService);
                return RatingService;
            }());
            exports_35("RatingService", RatingService);
        }
    }
});
System.register("ts/services/cigarService", ["ts/app"], function(exports_36, context_36) {
    "use strict";
    var __moduleName = context_36 && context_36.id;
    var app_5;
    var CigarService;
    return {
        setters:[
            function (app_5_1) {
                app_5 = app_5_1;
            }],
        execute: function() {
            CigarService = (function () {
                function CigarService(_logService, _openIddictHttpService, _baseUrl) {
                    this._logService = _logService;
                    this._openIddictHttpService = _openIddictHttpService;
                    this._baseUrl = _baseUrl;
                }
                CigarService.prototype.get = function (search) {
                    var url = this._baseUrl + "api/cigars?search=" + encodeURIComponent(search);
                    this._logService.info("GET request to " + url);
                    return this._openIddictHttpService.get(url);
                };
                CigarService.prototype.post = function (cigar) {
                    var url = this._baseUrl + "api/cigars";
                    this._logService.info("POST request to " + url);
                    return this._openIddictHttpService.post(url, cigar);
                };
                CigarService = __decorate([
                    app_5.Service(app_5.IonicApplication, "cigarService"),
                    __param(0, app_5.Inject("$log")),
                    __param(1, app_5.Inject("openIddictHttpService")),
                    __param(2, app_5.Inject("baseUrl")), 
                    __metadata('design:paramtypes', [Object, app_5.OpenIddictHttpService, String])
                ], CigarService);
                return CigarService;
            }());
            exports_36("CigarService", CigarService);
        }
    }
});
System.register("ts/pages/createCigar", ["ts/app", "ts/services/cigarService", "ts/pages/addRatingDetails"], function(exports_37, context_37) {
    "use strict";
    var __moduleName = context_37 && context_37.id;
    var app_6, cigarService_1, addRatingDetails_1;
    var CreateCigarPage;
    return {
        setters:[
            function (app_6_1) {
                app_6 = app_6_1;
            },
            function (cigarService_1_1) {
                cigarService_1 = cigarService_1_1;
            },
            function (addRatingDetails_1_1) {
                addRatingDetails_1 = addRatingDetails_1_1;
            }],
        execute: function() {
            CreateCigarPage = (function (_super) {
                __extends(CreateCigarPage, _super);
                function CreateCigarPage(_logService, _ionicLoadingService, _nav, _cigarService, scope) {
                    _super.call(this, scope);
                    this._logService = _logService;
                    this._ionicLoadingService = _ionicLoadingService;
                    this._nav = _nav;
                    this._cigarService = _cigarService;
                    this._logService.log("Opened createCigar");
                }
                CreateCigarPage.prototype.save = function (brand, name) {
                    var _this = this;
                    var cigar = {
                        brand: brand,
                        name: name
                    };
                    this._ionicLoadingService.show({ template: "Loading..." });
                    this._cigarService.post(cigar)
                        .then(function (response) {
                        _this._ionicLoadingService.hide();
                        _this._nav.push(addRatingDetails_1.AddRatingDetailsPage, {
                            cigar: response.data
                        });
                    })
                        .catch(function (response) {
                        _this._ionicLoadingService.hide();
                    });
                };
                CreateCigarPage = __decorate([
                    app_6.SideMenuPage(app_6.IonicApplication, "mainMenu", "createCigar", {
                        url: "/createCigar",
                        template: "\n        <ion-view view-title=\"Create Cigar\">\n            <ion-content class=\"padding\">\n                <div class=\"list\">\n                    <label class=\"item item-input item-floating-label\">\n                        <span class=\"input-label\">Cigar Brand (e.g. CAO, Drew Estate)</span>\n                        <input type=\"text\" \n                            placeholder=\"Cigar Brand (e.g. CAO, Drew Estate)\"\n                            ng-model=\"brand\">\n                    </label>\n                    <label class=\"item item-input item-floating-label\">\n                        <span class=\"input-label\">Cigar Name (e.g. Brazilia, Natural)</span>\n                        <input type=\"text\" \n                            placeholder=\"Cigar Name (e.g. Brazilia, Natural)\"\n                            ng-model=\"name\">\n                    </label>\n\n                    <button class=\"button button-block button-positive\"\n                        ng-disabled=\"!brand || !name\"\n                        ng-click=\"$ctrl.save(brand, name)\">\n                        Save\n                    </button>\n                </div>\n            </ion-content>\n        </ion-view>\n    "
                    }),
                    __param(0, app_6.Inject("$log")),
                    __param(1, app_6.Inject("$ionicLoading")),
                    __param(2, app_6.Inject("navController")),
                    __param(3, app_6.Inject("cigarService")),
                    __param(4, app_6.Inject("$scope")), 
                    __metadata('design:paramtypes', [Object, Object, app_6.NavController, cigarService_1.CigarService, Object])
                ], CreateCigarPage);
                return CreateCigarPage;
            }(app_6.PageBase));
            exports_37("CreateCigarPage", CreateCigarPage);
        }
    }
});
System.register("ts/pages/editRatingDetails", ["ts/app", "ts/services/ratingService", "ts/pages/myRatings"], function(exports_38, context_38) {
    "use strict";
    var __moduleName = context_38 && context_38.id;
    var app_7, RatingService_1, myRatings_1;
    var EditRatingDetailsPage;
    return {
        setters:[
            function (app_7_1) {
                app_7 = app_7_1;
            },
            function (RatingService_1_1) {
                RatingService_1 = RatingService_1_1;
            },
            function (myRatings_1_1) {
                myRatings_1 = myRatings_1_1;
            }],
        execute: function() {
            EditRatingDetailsPage = (function (_super) {
                __extends(EditRatingDetailsPage, _super);
                function EditRatingDetailsPage(_logService, _ionicLoadingService, _nav, _ratingService, scope) {
                    _super.call(this, scope);
                    this._logService = _logService;
                    this._ionicLoadingService = _ionicLoadingService;
                    this._nav = _nav;
                    this._ratingService = _ratingService;
                    this._logService.log("Opened EditRatingDetailsPage");
                }
                EditRatingDetailsPage.prototype.save = function () {
                    var _this = this;
                    this._ionicLoadingService.show({ template: "Loading..." });
                    this._ratingService.put(this.newRatingDetails)
                        .then(function (response) {
                        _this._ionicLoadingService.hide();
                        _this._nav.push(myRatings_1.MyRatingsPage, null, { historyRoot: true });
                    })
                        .catch(function (response) {
                        _this._ionicLoadingService.hide();
                    });
                };
                EditRatingDetailsPage.prototype.goToViewRating = function () {
                    this._nav.pop({ rating: this.rating });
                };
                EditRatingDetailsPage.prototype.ionViewWillEnter = function (event, data) {
                    this.rating = data.stateParams.rating;
                    this.newRatingDetails = angular.copy(this.rating);
                };
                EditRatingDetailsPage = __decorate([
                    app_7.SideMenuPage(app_7.IonicApplication, "mainMenu", "editRatingDetails", {
                        url: "/editRatingDetails",
                        template: "\n        <ion-view view-title=\"Edit Rating\">\n            <ion-content class=\"padding\">\n                <div class=\"card\">\n                    <div class=\"item item-divider\">\n                        Rating\n                    </div>\n                    <div class=\"item item-text-wrap\">\n                        <five-star-rating rating=\"$ctrl.newRatingDetails.value\" style=\"font-size: 32px;\"></five-star-rating>\n                    </div>\n                </div>\n                <div class=\"card\">\n                    <div class=\"item item-divider\">\n                        Details\n                    </div>\n                    <div class=\"item item-text-wrap\">\n                        <textarea rows=\"6\" ng-model=\"$ctrl.newRatingDetails.details\" style=\"width: 100%; resize: none;\"></textarea>\n                    </div>\n                </div>\n\n                <div class=\"padding\">\n                    <button class=\"button button-block button-positive\"\n                            ng-disabled=\"!$ctrl.newRatingDetails.value || !$ctrl.newRatingDetails.details\"\n                            ng-click=\"$ctrl.save(value, details)\">\n                        Submit\n                    </button>\n\n                    <button class=\"button button-block button-stable\"\n                            ng-click=\"$ctrl.goToViewRating()\">\n                        Cancel\n                    </button>\n                </div>\n            </ion-content>\n        </ion-view>\n    ",
                        params: {
                            rating: null
                        }
                    }),
                    __param(0, app_7.Inject("$log")),
                    __param(1, app_7.Inject("$ionicLoading")),
                    __param(2, app_7.Inject("navController")),
                    __param(3, app_7.Inject("ratingService")),
                    __param(4, app_7.Inject("$scope")), 
                    __metadata('design:paramtypes', [Object, Object, app_7.NavController, RatingService_1.RatingService, Object])
                ], EditRatingDetailsPage);
                return EditRatingDetailsPage;
            }(app_7.PageBase));
            exports_38("EditRatingDetailsPage", EditRatingDetailsPage);
        }
    }
});
System.register("ts/pages/viewRating", ["ts/app", "ts/services/ratingService", "ts/pages/editRatingDetails"], function(exports_39, context_39) {
    "use strict";
    var __moduleName = context_39 && context_39.id;
    var app_8, ratingService_1, editRatingDetails_1;
    var ViewRatingPage;
    return {
        setters:[
            function (app_8_1) {
                app_8 = app_8_1;
            },
            function (ratingService_1_1) {
                ratingService_1 = ratingService_1_1;
            },
            function (editRatingDetails_1_1) {
                editRatingDetails_1 = editRatingDetails_1_1;
            }],
        execute: function() {
            ViewRatingPage = (function (_super) {
                __extends(ViewRatingPage, _super);
                function ViewRatingPage(_logService, _ionicPopupService, _ionicLoadingService, _nav, _ratingService, scope) {
                    _super.call(this, scope);
                    this._logService = _logService;
                    this._ionicPopupService = _ionicPopupService;
                    this._ionicLoadingService = _ionicLoadingService;
                    this._nav = _nav;
                    this._ratingService = _ratingService;
                    this.searchResults = null;
                    this._logService.log("Opened ViewRatingDetailsPage");
                }
                ViewRatingPage.prototype.delete = function () {
                    var _this = this;
                    this._ionicPopupService.confirm({
                        title: "Are you sure?",
                        okText: "Yes",
                        cancelText: "No"
                    }).then(function (response) {
                        if (response) {
                            _this._ionicLoadingService.show({ template: "Loading..." });
                            _this._ratingService.delete(_this.rating)
                                .then(function (response) {
                                _this._ionicLoadingService.hide();
                                _this._nav.pop();
                            })
                                .catch(function (response) {
                                _this._ionicLoadingService.hide();
                            });
                        }
                    });
                };
                ViewRatingPage.prototype.goToEdit = function () {
                    this._nav.push(editRatingDetails_1.EditRatingDetailsPage, { rating: this.rating });
                };
                ViewRatingPage.prototype.ionViewWillEnter = function (event, data) {
                    this.rating = data.stateParams.rating;
                    if (data.stateParams.edited) {
                        this._nav.history.removeBackView();
                    }
                };
                ViewRatingPage = __decorate([
                    app_8.SideMenuPage(app_8.IonicApplication, "mainMenu", "viewRating", {
                        url: "/viewRating",
                        template: "\n        <ion-view view-title=\"View Rating\">\n            <ion-content class=\"padding\">\n                <div class=\"card\">\n                    <div class=\"item item-divider\">\n                        Rating\n                    </div>\n                    <div class=\"item item-text-wrap\">\n                        <five-star-rating readonly=\"true\" rating=\"$ctrl.rating.value\" style=\"font-size: 32px;\"></five-star-rating>\n                    </div>\n                </div>\n\n                <div class=\"card\">\n                    <div class=\"item item-divider\">\n                        Details\n                    </div>\n                    <div class=\"item item-text-wrap\">\n                        {{$ctrl.rating.details}}\n                    </div>\n                    <div class=\"item item-divider\" style=\"text-align: right\">\n                        <small>\n                            <last-modified-date date=\"$ctrl.rating.lastModifiedAt\" prefix=\"'Last updated'\" full-date-prefix=\"'at'\">\n                            </last-modified-date>\n                        </small>\n                    </div>\n                </div>\n\n                <button class=\"button button-energized button-block\"\n                    ng-click=\"$ctrl.goToEdit()\">\n                    Edit Rating\n                </button>\n\n                <button class=\"button button-assertive button-block\"\n                    ng-click=\"$ctrl.delete()\">\n                    Delete Rating\n                </button>\n            </ion-content>\n        </ion-view>\n    ",
                        params: {
                            rating: null,
                            edited: false
                        }
                    }),
                    __param(0, app_8.Inject("$log")),
                    __param(1, app_8.Inject("$ionicPopup")),
                    __param(2, app_8.Inject("$ionicLoading")),
                    __param(3, app_8.Inject("navController")),
                    __param(4, app_8.Inject("ratingService")),
                    __param(5, app_8.Inject("$scope")), 
                    __metadata('design:paramtypes', [Object, Object, Object, app_8.NavController, ratingService_1.RatingService, Object])
                ], ViewRatingPage);
                return ViewRatingPage;
            }(app_8.PageBase));
            exports_39("ViewRatingPage", ViewRatingPage);
        }
    }
});
System.register("ts/pages/findCigar", ["ts/app", "ts/services/cigarService", "ts/pages/createCigar", "ts/pages/addRatingDetails"], function(exports_40, context_40) {
    "use strict";
    var __moduleName = context_40 && context_40.id;
    var app_9, cigarService_2, createCigar_1, addRatingDetails_2;
    var FindCigarPage;
    return {
        setters:[
            function (app_9_1) {
                app_9 = app_9_1;
            },
            function (cigarService_2_1) {
                cigarService_2 = cigarService_2_1;
            },
            function (createCigar_1_1) {
                createCigar_1 = createCigar_1_1;
            },
            function (addRatingDetails_2_1) {
                addRatingDetails_2 = addRatingDetails_2_1;
            }],
        execute: function() {
            FindCigarPage = (function (_super) {
                __extends(FindCigarPage, _super);
                function FindCigarPage(_logService, _ionicLoadingService, _nav, _cigarService, scope) {
                    _super.call(this, scope);
                    this._logService = _logService;
                    this._ionicLoadingService = _ionicLoadingService;
                    this._nav = _nav;
                    this._cigarService = _cigarService;
                    this.searchResults = null;
                    this._logService.log("Opened FindCigarPage");
                }
                FindCigarPage.prototype.search = function (searchQuery) {
                    var _this = this;
                    this._ionicLoadingService.show({ template: "Loading..." });
                    this._cigarService.get(searchQuery)
                        .then(function (response) {
                        _this._ionicLoadingService.hide();
                        _this.searchResults = response.data;
                    })
                        .catch(function (response) {
                        _this._ionicLoadingService.hide();
                    });
                };
                FindCigarPage.prototype.selectCigar = function (cigar) {
                    this._nav.push(addRatingDetails_2.AddRatingDetailsPage, {
                        cigar: cigar
                    });
                };
                FindCigarPage.prototype.goToCreateCigar = function () {
                    this._nav.push(createCigar_1.CreateCigarPage);
                };
                FindCigarPage.prototype.ionViewWillEnter = function (event, data) {
                    if (data.stateParams.cigar) {
                        this.cigar = data.stateParams.cigar;
                    }
                    this._logService.debug(this.cigar, data.stateParams.cigar);
                };
                FindCigarPage = __decorate([
                    app_9.SideMenuPage(app_9.IonicApplication, "mainMenu", "findCigar", {
                        url: "/findCigar",
                        template: "\n        <ion-view view-title=\"Find Cigar\">\n            <ion-content class=\"padding\">\n                <div class=\"bar bar-header item-input-inset\" style=\"margin-bottom: 10px;\">\n                    <label class=\"item-input-wrapper\">\n                        <i class=\"icon ion-ios-search placeholder-icon\"></i>\n                        <input type=\"text\" \n                            placeholder=\"Search for Cigar\" \n                            ng-model=\"searchQuery\" \n                            ng-model-options=\"{ debounce: 300 }\"\n                            ng-change=\"$ctrl.search(searchQuery)\">\n                    </label>\n                </div>\n                \n                <ion-list>\n                    <ion-item collection-repeat=\"searchResult in $ctrl.searchResults\"\n                        ng-click=\"$ctrl.selectCigar(searchResult)\">\n                        {{searchResult.brand}} - {{searchResult.name}}\n                    </ion-item>\n\n                    <ion-item ng-show=\"$ctrl.searchResults != null && $ctrl.searchResults.length === 0\"\n                            class=\"energized\">\n                        Sorry, we couldn't find any results!\n                    </ion-item>\n                </ion-list>\n                \n                <div class=\"padding\" ng-show=\"$ctrl.searchResults != null\">\n                    <button class=\"button button-block button-energized button-small\"\n                            ng-click=\"$ctrl.goToCreateCigar()\">\n                        Can't find your cigar? Add it!\n                    </button>\n                </div>\n            </ion-content>\n        </ion-view>\n    ",
                        params: {
                            cigar: null
                        }
                    }),
                    __param(0, app_9.Inject("$log")),
                    __param(1, app_9.Inject("$ionicLoading")),
                    __param(2, app_9.Inject("navController")),
                    __param(3, app_9.Inject("cigarService")),
                    __param(4, app_9.Inject("$scope")), 
                    __metadata('design:paramtypes', [Object, Object, app_9.NavController, cigarService_2.CigarService, Object])
                ], FindCigarPage);
                return FindCigarPage;
            }(app_9.PageBase));
            exports_40("FindCigarPage", FindCigarPage);
        }
    }
});
System.register("ts/pages/myRatings", ["ts/app", "ts/services/ratingService", "ts/pages/viewRating", "ts/pages/findCigar"], function(exports_41, context_41) {
    "use strict";
    var __moduleName = context_41 && context_41.id;
    var app_10, ratingService_2, viewRating_1, findCigar_1;
    var MyRatingsPage;
    return {
        setters:[
            function (app_10_1) {
                app_10 = app_10_1;
            },
            function (ratingService_2_1) {
                ratingService_2 = ratingService_2_1;
            },
            function (viewRating_1_1) {
                viewRating_1 = viewRating_1_1;
            },
            function (findCigar_1_1) {
                findCigar_1 = findCigar_1_1;
            }],
        execute: function() {
            MyRatingsPage = (function (_super) {
                __extends(MyRatingsPage, _super);
                function MyRatingsPage(_logService, _ionicLoadingService, _nav, _ratingService, scope) {
                    _super.call(this, scope);
                    this._logService = _logService;
                    this._ionicLoadingService = _ionicLoadingService;
                    this._nav = _nav;
                    this._ratingService = _ratingService;
                    this.ratings = [];
                    this.isLoading = false;
                    this._logService.log("Opened myRating");
                }
                MyRatingsPage.prototype.goToViewRating = function (rating) {
                    this._nav.push(viewRating_1.ViewRatingPage, { rating: rating });
                };
                MyRatingsPage.prototype.goToFindCigar = function () {
                    this._nav.push(findCigar_1.FindCigarPage);
                };
                MyRatingsPage.prototype.lastModifiedDisplay = function (rating) {
                    var lastModifiedMoment = window.moment(rating.lastModifiedAt);
                    if (lastModifiedMoment > window.moment().subtract(7, "days")) {
                        return lastModifiedMoment.fromNow();
                    }
                    return lastModifiedMoment.format("MMMM Do YYYY, h:mm a");
                };
                MyRatingsPage.prototype.ionViewDidEnter = function () {
                    var _this = this;
                    this.isLoading = true;
                    this._ionicLoadingService.show({ template: "Loading..." });
                    this._ratingService.get()
                        .then(function (response) {
                        _this.isLoading = false;
                        _this._ionicLoadingService.hide();
                        _this.ratings = response.data;
                    })
                        .catch(function (response) {
                        _this.isLoading = false;
                        _this._ionicLoadingService.hide();
                    });
                };
                MyRatingsPage = __decorate([
                    app_10.SideMenuPage(app_10.IonicApplication, "mainMenu", "myRatings", {
                        url: "/myRatings",
                        template: "\n        <ion-view view-title=\"My Ratings\">\n            <ion-content class=\"padding\">\n                <div class=\"card\" ng-show=\"!$ctrl.ratings && !$ctrl.isLoading\">\n                    <div class=\"item\" style=\"text-align: center\">\n                        <strong>No ratings yet!</strong>\n\n                        <button class=\"button button-positive button-block\" ng-click=\"$ctrl.goToFindCigar()\">\n                            Add your first rating\n                        </button>\n                    </div>\n                </div>\n                <ion-list ng-show=\"$ctrl.ratings && $ctrl.ratings.length\">\n                    <ion-item collection-repeat=\"rating in $ctrl.ratings\" ng-click=\"$ctrl.goToViewRating(rating)\">\n                        <div>\n                            {{rating.cigar.brand}} - {{rating.cigar.name}}\n                            <span class=\"item-note\">\n                                <five-star-rating rating=\"rating.value\" readonly=\"true\" style=\"float: right;\"></five-star-rating>\n                            </span>\n                        </div>\n                            \n                        <last-modified-date date=\"$ctrl.rating.lastModifiedAt\" \n                            full-date-only=\"true\"\n                            style=\"display: block; text-align: right; font-size: 12px;\">\n                        </last-modified-date>\n                    </ion-item>\n                </ion-list>\n            </ion-content>\n        </ion-view>\n    "
                    }),
                    __param(0, app_10.Inject("$log")),
                    __param(1, app_10.Inject("$ionicLoading")),
                    __param(2, app_10.Inject("navController")),
                    __param(3, app_10.Inject("ratingService")),
                    __param(4, app_10.Inject("$scope")), 
                    __metadata('design:paramtypes', [Object, Object, app_10.NavController, ratingService_2.RatingService, Object])
                ], MyRatingsPage);
                return MyRatingsPage;
            }(app_10.PageBase));
            exports_41("MyRatingsPage", MyRatingsPage);
        }
    }
});
System.register("ts/pages/addRatingDetails", ["ts/app", "ts/services/ratingService", "ts/pages/myRatings"], function(exports_42, context_42) {
    "use strict";
    var __moduleName = context_42 && context_42.id;
    var app_11, RatingService_2, myRatings_2;
    var AddRatingDetailsPage;
    return {
        setters:[
            function (app_11_1) {
                app_11 = app_11_1;
            },
            function (RatingService_2_1) {
                RatingService_2 = RatingService_2_1;
            },
            function (myRatings_2_1) {
                myRatings_2 = myRatings_2_1;
            }],
        execute: function() {
            AddRatingDetailsPage = (function (_super) {
                __extends(AddRatingDetailsPage, _super);
                function AddRatingDetailsPage(_logService, _ionicLoadingService, _nav, _ratingService, scope) {
                    _super.call(this, scope);
                    this._logService = _logService;
                    this._ionicLoadingService = _ionicLoadingService;
                    this._nav = _nav;
                    this._ratingService = _ratingService;
                    this.searchResults = null;
                    this._logService.log("Opened AddRatingDetailsPage");
                }
                AddRatingDetailsPage.prototype.save = function (value, details) {
                    var _this = this;
                    var rating = {
                        value: value,
                        details: details,
                        cigar: this.cigar
                    };
                    this._ionicLoadingService.show({ template: "Loading..." });
                    this._ratingService.post(rating)
                        .then(function (response) {
                        _this._ionicLoadingService.hide();
                        _this._nav.push(myRatings_2.MyRatingsPage, null, { historyRoot: true });
                    })
                        .catch(function (response) {
                        _this._ionicLoadingService.hide();
                    });
                };
                AddRatingDetailsPage.prototype.goToFindCigar = function () {
                    this._nav.pop({
                        cigar: this.cigar
                    });
                };
                AddRatingDetailsPage.prototype.ionViewWillEnter = function (event, data) {
                    this.cigar = data.stateParams.cigar;
                };
                AddRatingDetailsPage = __decorate([
                    app_11.SideMenuPage(app_11.IonicApplication, "mainMenu", "addRatingDetails", {
                        url: "/addRatingDetails",
                        template: "\n        <ion-view view-title=\"Add Rating\">\n            <ion-content class=\"padding\">\n                <div class=\"card\">\n                    <div class=\"item item-divider\">\n                        Rating\n                    </div>\n                    <div class=\"item item-text-wrap\">\n                        <five-star-rating ng-init=\"value = 3;\" rating=\"value\" style=\"font-size: 32px;\"></five-star-rating>\n                    </div>\n                </div>\n                <div class=\"card\">\n                    <div class=\"item item-divider\">\n                        Details\n                    </div>\n                    <div class=\"item item-text-wrap\">\n                        <textarea rows=\"6\" ng-model=\"details\" style=\"width: 100%; resize: none;\"></textarea>\n                    </div>\n                </div>\n\n                <div class=\"padding\">\n                    <button class=\"button button-block button-positive\"\n                            ng-disabled=\"!value || !details\"\n                            ng-click=\"$ctrl.save(value, details)\">\n                        Submit\n                    </button>\n                </div>\n            </ion-content>\n        </ion-view>\n    ",
                        params: {
                            cigar: null
                        }
                    }),
                    __param(0, app_11.Inject("$log")),
                    __param(1, app_11.Inject("$ionicLoading")),
                    __param(2, app_11.Inject("navController")),
                    __param(3, app_11.Inject("ratingService")),
                    __param(4, app_11.Inject("$scope")), 
                    __metadata('design:paramtypes', [Object, Object, app_11.NavController, RatingService_2.RatingService, Object])
                ], AddRatingDetailsPage);
                return AddRatingDetailsPage;
            }(app_11.PageBase));
            exports_42("AddRatingDetailsPage", AddRatingDetailsPage);
        }
    }
});
System.register("ts/pages/forgotPassword", ["ts/app", "ts/pages/myRatings"], function(exports_43, context_43) {
    "use strict";
    var __moduleName = context_43 && context_43.id;
    var app_12, myRatings_3;
    var ForgotPasswordController;
    return {
        setters:[
            function (app_12_1) {
                app_12 = app_12_1;
            },
            function (myRatings_3_1) {
                myRatings_3 = myRatings_3_1;
            }],
        execute: function() {
            ForgotPasswordController = (function (_super) {
                __extends(ForgotPasswordController, _super);
                function ForgotPasswordController(_openIddictHttpService, _nav, scope) {
                    _super.call(this, scope);
                    this._openIddictHttpService = _openIddictHttpService;
                    this._nav = _nav;
                }
                ForgotPasswordController.prototype.forgotPassword = function (name) {
                    console.log(name);
                };
                ForgotPasswordController.prototype.ionViewWillEnter = function (event, data) {
                    if (this._openIddictHttpService.token) {
                        this._nav.push(myRatings_3.MyRatingsPage);
                    }
                };
                ForgotPasswordController = __decorate([
                    app_12.Page(app_12.IonicApplication, "forgotPassword", {
                        template: "\n        <ion-view title=\"Register\">\n            <ion-nav-bar class=\"bar-positive\">\n                <ion-nav-back-button>\n                </ion-nav-back-button>\n            </ion-nav-bar>\n            <ion-content padding=\"true\" scroll=\"false\">\n                <label class=\"item item-input\" style=\"margin-bottom: 40px;\">\n                    <span class=\"input-label\">Name</span>\n                    <input type=\"text\" ng-model=\"name\">\n                </label>\n                <button type=\"submit\" class=\"button button-calm button-block\" ng-click=\"$ctrl.forgotPassword(name)\">\n                    Request New Password\n                </button>\n            </ion-content>\n        </ion-view>\n    "
                    }),
                    __param(0, app_12.Inject("openIddictHttpService")),
                    __param(1, app_12.Inject("navController")),
                    __param(2, app_12.Inject("$scope")), 
                    __metadata('design:paramtypes', [Object, app_12.NavController, Object])
                ], ForgotPasswordController);
                return ForgotPasswordController;
            }(app_12.PageBase));
            exports_43("ForgotPasswordController", ForgotPasswordController);
        }
    }
});
System.register("ts/pages/home", ["ts/app"], function(exports_44, context_44) {
    "use strict";
    var __moduleName = context_44 && context_44.id;
    var app_13;
    var HomePage;
    return {
        setters:[
            function (app_13_1) {
                app_13 = app_13_1;
            }],
        execute: function() {
            HomePage = (function (_super) {
                __extends(HomePage, _super);
                function HomePage(_logService, scope) {
                    _super.call(this, scope);
                    this._logService = _logService;
                    this._logService.log("Opened home");
                }
                HomePage = __decorate([
                    app_13.SideMenuPage(app_13.IonicApplication, "mainMenu", "home", {
                        url: "/home",
                        template: "\n        <ion-view view-title=\"Page 1\">\n            <ion-content class=\"padding\">\n                <button class=\"button button-positive button-block\">I'm a home button!</button>\n            </ion-content>\n        </ion-view>\n    "
                    }),
                    __param(0, app_13.Inject("$log")),
                    __param(1, app_13.Inject("$scope")), 
                    __metadata('design:paramtypes', [Object, Object])
                ], HomePage);
                return HomePage;
            }(app_13.PageBase));
            exports_44("HomePage", HomePage);
        }
    }
});
System.register("ts/pages/register", ["ts/app", "ts/pages/myRatings"], function(exports_45, context_45) {
    "use strict";
    var __moduleName = context_45 && context_45.id;
    var app_14, myRatings_4;
    var RegisterPage;
    return {
        setters:[
            function (app_14_1) {
                app_14 = app_14_1;
            },
            function (myRatings_4_1) {
                myRatings_4 = myRatings_4_1;
            }],
        execute: function() {
            RegisterPage = (function (_super) {
                __extends(RegisterPage, _super);
                function RegisterPage(_logService, _ionicPopupService, _ionicLoadingService, _openIddictHttpService, _nav, scope) {
                    _super.call(this, scope);
                    this._logService = _logService;
                    this._ionicPopupService = _ionicPopupService;
                    this._ionicLoadingService = _ionicLoadingService;
                    this._openIddictHttpService = _openIddictHttpService;
                    this._nav = _nav;
                }
                RegisterPage.prototype.register = function (email, password, confirmPassword) {
                    var _this = this;
                    if (!email || !password || !confirmPassword) {
                        return;
                    }
                    if (!this.poorlyValidateEmail(email)) {
                        this._ionicPopupService.alert({
                            title: "Could not register",
                            template: "'" + email + "' is not a valid email address.\""
                        });
                        return;
                    }
                    if (password !== confirmPassword) {
                        this._ionicPopupService.alert({
                            title: "Could not register",
                            template: "The entered passwords do not match."
                        });
                        return;
                    }
                    this._ionicLoadingService.show({ template: "Loading..." });
                    this._openIddictHttpService.register(email, password)
                        .then(function (response) {
                        _this._ionicLoadingService.hide();
                        _this._nav.push(myRatings_4.MyRatingsPage);
                    })
                        .catch(function (response) {
                        _this._ionicLoadingService.hide();
                        _this._ionicPopupService.alert({
                            title: "Could not register",
                            template: response.messages.join(" ")
                        });
                    });
                };
                RegisterPage.prototype.goToLogin = function () {
                    this._nav.pop();
                };
                RegisterPage.prototype.ionViewWillEnter = function (event, data) {
                    if (this._openIddictHttpService.token) {
                        this._nav.push(myRatings_4.MyRatingsPage);
                    }
                };
                RegisterPage.prototype.poorlyValidateEmail = function (email) {
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(email);
                };
                RegisterPage = __decorate([
                    app_14.Page(app_14.IonicApplication, "register", {
                        template: "\n        <ion-view title=\"Register\">\n            <ion-nav-bar class=\"bar-positive\">\n                <ion-nav-back-button>\n                </ion-nav-back-button>\n            </ion-nav-bar>\n            <ion-content class=\"padding\" scroll=\"false\">\n                <div class=\"list list-inset\" style=\"background: transparent;\">\n                    <label class=\"item item-input\" style=\"margin-bottom: 10px;\">\n                        <input type=\"text\" ng-model=\"email\" placeholder=\"Email\">\n                    </label>\n                    <label class=\"item item-input\" style=\"margin-bottom: 10px;\">\n                        <input type=\"password\" ng-model=\"password\" placeholder=\"Password\">\n                    </label>\n                    <label class=\"item item-input\">\n                        <input type=\"password\" ng-model=\"confirmPassword\" placeholder=\"Confirm Password\">\n                    </label>\n                </div>\n                \n                <button type=\"submit\" \n                    class=\"button button-positive button-block\" \n                    ng-click=\"$ctrl.register(email, password, confirmPassword)\">\n                    Register\n                </button>\n                <button type=\"submit\" \n                    class=\"button button-stable button-block\" \n                    ng-click=\"$ctrl.goToLogin()\">\n                    Login with existing account\n                </button>\n            </ion-content>\n        </ion-view>\n    ",
                    }),
                    __param(0, app_14.Inject("$log")),
                    __param(1, app_14.Inject("$ionicPopup")),
                    __param(2, app_14.Inject("$ionicLoading")),
                    __param(3, app_14.Inject("openIddictHttpService")),
                    __param(4, app_14.Inject("navController")),
                    __param(5, app_14.Inject("$scope")), 
                    __metadata('design:paramtypes', [Object, Object, Object, Object, app_14.NavController, Object])
                ], RegisterPage);
                return RegisterPage;
            }(app_14.PageBase));
            exports_45("RegisterPage", RegisterPage);
        }
    }
});
System.register("ts/pages/login", ["ts/app", "ts/pages/myRatings", "ts/pages/register"], function(exports_46, context_46) {
    "use strict";
    var __moduleName = context_46 && context_46.id;
    var app_15, myRatings_5, register_1;
    var LoginPage;
    return {
        setters:[
            function (app_15_1) {
                app_15 = app_15_1;
            },
            function (myRatings_5_1) {
                myRatings_5 = myRatings_5_1;
            },
            function (register_1_1) {
                register_1 = register_1_1;
            }],
        execute: function() {
            LoginPage = (function (_super) {
                __extends(LoginPage, _super);
                function LoginPage(_logService, _stateService, _ionicPopupService, _ionicLoadingService, _openIddictHttpService, _nav, scope) {
                    _super.call(this, scope);
                    this._logService = _logService;
                    this._stateService = _stateService;
                    this._ionicPopupService = _ionicPopupService;
                    this._ionicLoadingService = _ionicLoadingService;
                    this._openIddictHttpService = _openIddictHttpService;
                    this._nav = _nav;
                }
                LoginPage.prototype.login = function (email, password) {
                    var _this = this;
                    if (!email || !password) {
                        return;
                    }
                    this._ionicLoadingService.show({ template: "Loading..." });
                    this._openIddictHttpService.login(email, password)
                        .then(function (response) {
                        password = "";
                        _this._ionicLoadingService.hide();
                        _this._nav.push(myRatings_5.MyRatingsPage);
                    })
                        .catch(function (response) {
                        _this._ionicLoadingService.hide();
                        _this._ionicPopupService.alert({
                            title: "Could not login",
                            template: response && response.error_description
                                ? response.error_description
                                : "There was an error during login"
                        });
                    });
                };
                LoginPage.prototype.goToRegister = function () {
                    this._nav.push(register_1.RegisterPage);
                };
                LoginPage.prototype.ionViewWillEnter = function (event, data) {
                    if (this._openIddictHttpService.token) {
                        this._nav.push(myRatings_5.MyRatingsPage);
                    }
                };
                LoginPage = __decorate([
                    app_15.Page(app_15.IonicApplication, "login", {
                        url: "/login",
                        template: "\n        <ion-view title=\"Login\" hide-nav-bar=\"true\">\n            <ion-nav-bar class=\"bar-positive\">\n                <ion-nav-back-button>\n                </ion-nav-back-button>\n            </ion-nav-bar>\n            <ion-content padding=\"true\" scroll=\"false\" ng-init=\"email = ''; password = '';\">\n                <img src=\"img/logo.png\" alt=\"CigarBar\" class=\"logo\" style=\"margin: 20px auto;\">\n\n                <div class=\"list list-inset\" style=\"background: transparent; margin: 0\">\n                    <label class=\"item item-input\" style=\"margin-bottom: 10px;\">\n                        <input type=\"text\" ng-model=\"email\" placeholder=\"Email\">\n                    </label>\n                    <label class=\"item item-input\">\n                        <input type=\"password\" ng-model=\"password\" placeholder=\"Password\">\n                    </label>\n                </div>\n                \n                <button type=\"submit\" class=\"button button-positive button-block\" ng-click=\"$ctrl.login(email, password)\">\n                    Login\n                </button>\n                <button type=\"submit\" class=\"button button-stable button-block\" ng-click=\"$ctrl.goToRegister()\">\n                    Create a new account\n                </button>\n            </ion-content>\n        </ion-view>\n    "
                    }),
                    __param(0, app_15.Inject("$log")),
                    __param(1, app_15.Inject("$state")),
                    __param(2, app_15.Inject("$ionicPopup")),
                    __param(3, app_15.Inject("$ionicLoading")),
                    __param(4, app_15.Inject("openIddictHttpService")),
                    __param(5, app_15.Inject("navController")),
                    __param(6, app_15.Inject("$scope")), 
                    __metadata('design:paramtypes', [Object, Object, Object, Object, Object, app_15.NavController, Object])
                ], LoginPage);
                return LoginPage;
            }(app_15.PageBase));
            exports_46("LoginPage", LoginPage);
        }
    }
});
System.register("ts/pages/mainMenu", ["ts/app", "ts/pages/myRatings", "ts/pages/findCigar", "ts/pages/login"], function(exports_47, context_47) {
    "use strict";
    var __moduleName = context_47 && context_47.id;
    var app_16, myRatings_6, findCigar_2, login_1;
    var MainMenu;
    return {
        setters:[
            function (app_16_1) {
                app_16 = app_16_1;
            },
            function (myRatings_6_1) {
                myRatings_6 = myRatings_6_1;
            },
            function (findCigar_2_1) {
                findCigar_2 = findCigar_2_1;
            },
            function (login_1_1) {
                login_1 = login_1_1;
            }],
        execute: function() {
            MainMenu = (function (_super) {
                __extends(MainMenu, _super);
                function MainMenu(_logService, _nav, _openIddictHttpService) {
                    _super.call(this);
                    this._logService = _logService;
                    this._nav = _nav;
                    this._openIddictHttpService = _openIddictHttpService;
                    this._logService.log("Opened the main menu page");
                }
                MainMenu.prototype.goToMyRatings = function () {
                    this._nav.push(myRatings_6.MyRatingsPage, null, { historyRoot: true, disableAnimate: true });
                };
                MainMenu.prototype.goToAddRatings = function () {
                    this._nav.push(findCigar_2.FindCigarPage, null, { historyRoot: true, disableAnimate: true });
                };
                MainMenu.prototype.logout = function () {
                    this._openIddictHttpService.clearToken();
                    this._nav.push(login_1.LoginPage, null, { historyRoot: true });
                };
                MainMenu = __decorate([
                    app_16.SideMenu(app_16.IonicApplication, "mainMenu", {
                        template: "\n        <ion-list>\n            <ion-item menu-close ng-click=\"$ctrl.goToMyRatings()\">\n                My Ratings\n            </ion-item>\n            <ion-item menu-close ng-click=\"$ctrl.goToAddRatings()\">\n                Add Rating\n            </ion-item>\n            <ion-item menu-close ng-click=\"$ctrl.logout()\">\n                Logout\n            </ion-item>\n        </ion-list>\n    ",
                        menuHeaderBarClass: "bar-dark"
                    }),
                    __param(0, app_16.Inject("$log")),
                    __param(1, app_16.Inject("navController")),
                    __param(2, app_16.Inject("openIddictHttpService")), 
                    __metadata('design:paramtypes', [Object, app_16.NavController, Object])
                ], MainMenu);
                return MainMenu;
            }(app_16.SideMenuBase));
            exports_47("MainMenu", MainMenu);
        }
    }
});
