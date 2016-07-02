"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ionic_angular_1 = require("ionic-angular");
var ionic_native_1 = require("ionic-native");
var login_1 = require("./pages/login/login");
var ratingService_1 = require("./services/ratingService");
var cigarService_1 = require("./services/cigarService");
var openIdAuthService_1 = require("./services/openIdAuthService");
var openIdHttp_1 = require("./services/openIdHttp");
var MyApp = (function () {
    function MyApp(platform) {
        this.rootPage = login_1.Login;
        platform.ready().then(function () {
            ionic_native_1.StatusBar.styleDefault();
        });
    }
    MyApp = __decorate([
        ionic_angular_1.App({
            template: '<ion-nav [root]="rootPage"></ion-nav>',
            config: {},
            providers: [ratingService_1.RatingService, cigarService_1.CigarService, openIdAuthService_1.OpenIdAuthService, openIdHttp_1.OpenIdHttp],
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.Platform])
    ], MyApp);
    return MyApp;
}());
exports.MyApp = MyApp;
var AppSettings = (function () {
    function AppSettings() {
    }
    AppSettings.getAppUrl = function (path) {
        return "http://localhost:52342/" + path;
    };
    return AppSettings;
}());
exports.AppSettings = AppSettings;
