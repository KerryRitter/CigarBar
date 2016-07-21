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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var openIdAuthService_1 = require("./openIdAuthService");
var OpenIdHttp = (function () {
    function OpenIdHttp(_http, _openIdAuthService) {
        this._http = _http;
        this._openIdAuthService = _openIdAuthService;
    }
    OpenIdHttp.prototype.get = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getHeadersWithAuth()
                .then(function (headers) {
                var data = _this._http
                    .get(url, { headers: headers })
                    .map(function (res) { return res.json(); });
                resolve(data);
            })
                .catch(function (reason) {
                reject(reason);
            });
        });
    };
    OpenIdHttp.prototype.post = function (url, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getHeadersWithAuth()
                .then(function (headers) {
                _this._http.post(url, JSON.stringify(data), { headers: headers })
                    .toPromise()
                    .then(function (data) {
                    resolve(data);
                })
                    .catch(function (reason) {
                    reject(reason);
                });
            })
                .catch(function (reason) {
                reject(reason);
            });
        });
    };
    OpenIdHttp.prototype.put = function (url, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getHeadersWithAuth()
                .then(function (headers) {
                _this._http.put(url, JSON.stringify(data), { headers: headers })
                    .toPromise()
                    .then(function (data) {
                    resolve(data);
                })
                    .catch(function (reason) {
                    reject(reason);
                });
            })
                .catch(function (reason) {
                reject(reason);
            });
        });
    };
    OpenIdHttp.prototype.delete = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getHeadersWithAuth()
                .then(function (headers) {
                _this._http.delete(url, { headers: headers })
                    .toPromise()
                    .then(function (data) {
                    resolve(data);
                })
                    .catch(function (reason) {
                    reject(reason);
                });
            })
                .catch(function (reason) {
                reject(reason);
            });
        });
    };
    OpenIdHttp.prototype.getHeadersWithAuth = function () {
        var _this = this;
        var headers = new http_1.Headers();
        return new Promise(function (resolve, reject) {
            _this._openIdAuthService.getSavedToken()
                .then(function (token) {
                if (token && token.access_token !== "") {
                    headers.append("Authorization", "Bearer " + token);
                }
                resolve(headers);
            })
                .catch(function (reason) {
                reject(reason);
            });
        });
    };
    OpenIdHttp = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, openIdAuthService_1.OpenIdAuthService])
    ], OpenIdHttp);
    return OpenIdHttp;
}());
exports.OpenIdHttp = OpenIdHttp;
