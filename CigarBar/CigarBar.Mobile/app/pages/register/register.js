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
var login_1 = require("../login/login");
var Register = (function () {
    function Register(nav, navParams, _authService) {
        this.nav = nav;
        this.navParams = navParams;
        this._authService = _authService;
        this.nav = nav;
    }
    Object.defineProperty(Register, "parameters", {
        get: function () {
            return [[ionic_angular_1.NavController], [ionic_angular_1.NavParams], [openIdAuthService_1.OpenIdAuthService]];
        },
        enumerable: true,
        configurable: true
    });
    Register.prototype.ngOnInit = function () {
    };
    Register.prototype.register = function (username, password, confirmPassword) {
        var _this = this;
        if (password !== confirmPassword) {
            this.nav.present(ionic_angular_1.Alert.create({
                title: "Passwords do not match",
                buttons: ["OK"]
            }));
        }
        this._authService.createNewAccount(username, password)
            .then(function (response) {
            if (response.Succeeded) {
                _this._authService.getNewToken(username, password)
                    .then(function (token) {
                    _this.nav.present(ionic_angular_1.Alert.create({
                        title: "It worked!",
                        buttons: ["OK"]
                    }));
                })
                    .catch(function (token) {
                    _this.nav.present(ionic_angular_1.Alert.create({
                        title: "Error",
                        subTitle: token.json().error_description,
                        buttons: ["OK"]
                    }));
                });
            }
            else {
                _this.nav.present(ionic_angular_1.Alert.create({
                    title: "Registration Error",
                    subTitle: response.Errors[0].Description,
                    buttons: ["OK"]
                }));
            }
        });
    };
    Register.prototype.goToLogin = function () {
        this.nav.push(login_1.Login);
    };
    Register = __decorate([
        ionic_angular_1.Page({
            templateUrl: "build/pages/register/register.html"
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, ionic_angular_1.NavParams, openIdAuthService_1.OpenIdAuthService])
    ], Register);
    return Register;
}());
exports.Register = Register;
