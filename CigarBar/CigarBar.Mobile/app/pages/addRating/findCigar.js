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
var ratingDetails_1 = require("./ratingDetails");
var createNewCigar_1 = require("./createNewCigar");
var FindCigar = (function () {
    function FindCigar(nav, navParams) {
        this.nav = nav;
        this.navParams = navParams;
        this.cigars = [];
        this.nav = nav;
        this.cigars.push({
            id: 0,
            brand: "CAO",
            name: "Brazilia"
        });
        this.cigars.push({
            id: 1,
            brand: "CAO",
            name: "Flathead"
        });
        this.cigars.push({
            id: 2,
            brand: "CAO",
            name: "Italia"
        });
        this.cigars.push({
            id: 3,
            brand: "CAO",
            name: "Something"
        });
        this.cigars.push({
            id: 4,
            brand: "CAO",
            name: "Else"
        });
    }
    Object.defineProperty(FindCigar, "parameters", {
        get: function () {
            return [[ionic_angular_1.NavController], [ionic_angular_1.NavParams]];
        },
        enumerable: true,
        configurable: true
    });
    FindCigar.prototype.goToRatingDetails = function (cigar) {
        this.nav.push(ratingDetails_1.RatingDetails, {
            cigar: cigar
        });
    };
    FindCigar.prototype.goToCreateNewCigar = function () {
        this.nav.push(createNewCigar_1.CreateNewCigar);
    };
    FindCigar = __decorate([
        ionic_angular_1.Page({
            templateUrl: "build/pages/addRating/findCigar.html"
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, ionic_angular_1.NavParams])
    ], FindCigar);
    return FindCigar;
}());
exports.FindCigar = FindCigar;
