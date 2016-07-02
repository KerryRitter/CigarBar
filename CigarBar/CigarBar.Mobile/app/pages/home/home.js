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
var addRating_1 = require("../addRating/addRating");
var yourRatings_1 = require("../yourRatings/yourRatings");
var Home = (function () {
    function Home(nav) {
        this.nav = nav;
        this.pages = [
            { title: "Add Rating", component: addRating_1.AddRating },
            { title: "Your Ratings", component: yourRatings_1.YourRatings }
        ];
        this.rootPage = yourRatings_1.YourRatings;
    }
    Object.defineProperty(Home, "parameters", {
        get: function () {
            return [[ionic_angular_1.NavController]];
        },
        enumerable: true,
        configurable: true
    });
    Home.prototype.openPage = function (page) {
        this.nav.setRoot(page.component);
    };
    Home = __decorate([
        ionic_angular_1.Page({
            templateUrl: "build/pages/home/home.html"
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController])
    ], Home);
    return Home;
}());
exports.Home = Home;
