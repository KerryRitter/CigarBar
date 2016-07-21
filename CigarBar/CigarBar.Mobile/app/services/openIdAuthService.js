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
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var http_1 = require("@angular/http");
var app_1 = require("../app");
// ReSharper restore InconsistentNaming
var OpenIdAuthService = (function () {
    function OpenIdAuthService(_http) {
        this._http = _http;
        this._storage = new ionic_angular_1.Storage(ionic_angular_1.LocalStorage);
    }
    OpenIdAuthService.prototype.saveToken = function (token) {
        token.expires_at = (new Date()).getTime() + token.expires_in;
        this._storage.set("token", JSON.stringify(token));
    };
    OpenIdAuthService.prototype.getSavedToken = function () {
        var _this = this;
        console.log("getSavedToken()");
        return new Promise(function (resolve, reject) {
            _this._storage.get("token")
                .then(function (tokenString) {
                console.log("tokenString: " + tokenString);
                var token = JSON.parse(tokenString);
                console.log("token:", token);
                if (_this.isTokenExpired(token)) {
                    console.log("Token is expired, getting refresh token:", token);
                    _this.getRefreshedToken(token)
                        .then(function (newToken) {
                        resolve(newToken);
                    });
                }
                else {
                    console.log("Token is not expired, returning token:", token);
                    resolve(token);
                }
            })
                .catch(function (reason) {
                reject(reason);
            });
        });
    };
    OpenIdAuthService.prototype.getNewToken = function (email, password) {
        var _this = this;
        console.log("getNewToken('" + email + "', '" + password + "')");
        return this._http.post(app_1.AppSettings.getAppUrl("connect/token"), this.urlEncodeValues({
            "grant_type": "password",
            "username": email,
            "password": password,
            "scope": "offline_access profile email"
        }), { headers: this.getHeaders(null) })
            .toPromise()
            .then(function (response) { return response.json(); })
            .then(function (token) {
            console.log("getNewToken() got a token.");
            if (!token.error) {
                console.log("getNewToken() is saving the token.");
                _this.saveToken(token);
            }
            return token;
        });
    };
    OpenIdAuthService.prototype.createNewAccount = function (email, password) {
        console.log("getNewToken('" + email + "', '" + password + "')");
        return this._http.post(app_1.AppSettings.getAppUrl("api/account"), JSON.stringify({ email: email, password: password }), { headers: this.getHeaders("application/json") })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (response) { return response.json(); });
    };
    OpenIdAuthService.prototype.getRefreshedToken = function (token) {
        var _this = this;
        console.log("getRefreshedToken()", token);
        return this._http.post(app_1.AppSettings.getAppUrl("connect/token"), this.urlEncodeValues({
            "grant_type": "refresh_token",
            "scope": "offline_access profile email",
            "refresh_token": token.refresh_token
        }), { headers: this.getHeaders(null) })
            .toPromise()
            .then(function (response) { return response.json(); })
            .then(function (token) {
            console.log("getRefreshedToken() got a token.");
            if (!token.error) {
                console.log("getRefreshedToken() is saving the token.");
                _this.saveToken(token);
            }
            return token;
        });
    };
    OpenIdAuthService.prototype.isTokenExpired = function (token) {
        return (new Date()).getTime() > token.expires_at;
    };
    OpenIdAuthService.prototype.getHeaders = function (contentType) {
        var headers = new http_1.Headers();
        headers.append("Content-Type", contentType ? contentType : "application/x-www-form-urlencoded");
        return headers;
    };
    OpenIdAuthService.prototype.urlEncodeValues = function (data) {
        var str = "";
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                str += key + "=" + data[key] + "&";
            }
        }
        return str;
    };
    OpenIdAuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], OpenIdAuthService);
    return OpenIdAuthService;
}());
exports.OpenIdAuthService = OpenIdAuthService;
