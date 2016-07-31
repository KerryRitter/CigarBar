import {NavController} from "./navController";
import {NavParams} from "./navParams";

const Ionic1Forward = angular.module("ionic1-forward", []);

Ionic1Forward.service("navController", NavController);
Ionic1Forward.service("navParams", NavParams);