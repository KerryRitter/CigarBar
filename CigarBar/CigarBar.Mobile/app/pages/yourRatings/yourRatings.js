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
var ratingService_1 = require("../../services/ratingService");
var YourRatings = (function () {
    function YourRatings(nav, navParams, _ratingService) {
        this.nav = nav;
        this.navParams = navParams;
        this._ratingService = _ratingService;
        this.ratings = null;
        this.nav = nav;
    }
    Object.defineProperty(YourRatings, "parameters", {
        get: function () {
            return [[ionic_angular_1.NavController], [ionic_angular_1.NavParams], [ratingService_1.RatingService]];
        },
        enumerable: true,
        configurable: true
    });
    YourRatings.prototype.ngOnInit = function () {
    };
    YourRatings = __decorate([
        ionic_angular_1.Page({
            templateUrl: "build/pages/yourRatings/yourRatings.html"
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, ionic_angular_1.NavParams, ratingService_1.RatingService])
    ], YourRatings);
    return YourRatings;
}());
exports.YourRatings = YourRatings;
