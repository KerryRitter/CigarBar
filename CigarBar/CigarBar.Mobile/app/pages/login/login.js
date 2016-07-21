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
var openIdAuthService_1 = require("../../services/openIdAuthService");
var register_1 = require("../register/register");
var home_1 = require("../home/home");
var Login = (function () {
    function Login(nav, navParams, _authService) {
        this.nav = nav;
        this.navParams = navParams;
        this._authService = _authService;
        this.nav = nav;
    }
    Object.defineProperty(Login, "parameters", {
        get: function () {
            return [[ionic_angular_1.NavController], [ionic_angular_1.NavParams], [openIdAuthService_1.OpenIdAuthService]];
        },
        enumerable: true,
        configurable: true
    });
    Login.prototype.ngOnInit = function () {
    };
    Login.prototype.login = function (username, password) {
        this.nav.push(home_1.Home);
        //this._authService.getNewToken(username, password)
        //    .then(token => {
        //        this.nav.present(Alert.create({
        //            title: "It worked!",
        //            buttons: ["OK"]
        //        }));
        //    })
        //    .catch(token => {
        //        this.nav.present(Alert.create({
        //            title: "Error",
        //            subTitle: token.json().error_description,
        //            buttons: ["OK"]
        //        }));
        //    });
    };
    Login.prototype.goToRegister = function () {
        this.nav.push(register_1.Register);
    };
    Login = __decorate([
        ionic_angular_1.Page({
            templateUrl: "build/pages/login/login.html"
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, ionic_angular_1.NavParams, openIdAuthService_1.OpenIdAuthService])
    ], Login);
    return Login;
}());
exports.Login = Login;
