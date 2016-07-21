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
var app_1 = require("../app");
require("rxjs/Rx");
var CigarService = (function () {
    function CigarService(_http) {
        this._http = _http;
    }
    CigarService.prototype.findAll = function (search) {
        return this._http
            .get(app_1.AppSettings.getAppUrl("api/cigars?search=" + search))
            .map(function (res) {
            return res.json();
        });
    };
    CigarService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    CigarService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CigarService);
    return CigarService;
}());
exports.CigarService = CigarService;
