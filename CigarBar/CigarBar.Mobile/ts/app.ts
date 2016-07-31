/// <reference path="typings.d.ts" />

export * from "../ionic-typescript/decorators";
export {PageBase} from "../ionic-typescript/pageBase";
export {SideMenuBase, ISideMenuConfig} from "../ionic-typescript/sideMenuBase";
export {NavController} from "../ionic-typescript/navController";
export {OpenIddictHttpService} from "../angular-openiddict/service";

import {App, Requires, Run, Inject} from "../ionic-typescript/decorators";

export const IonicApplication = angular.module("app", ["ionic", "openIddict", "ionic1-forward"]);

IonicApplication.config(["$urlRouterProvider", function ($urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");
}]);

IonicApplication.value("baseUrl", "http://localhost:5000/");

@Run(IonicApplication)
class IonicApplicationRun {
    constructor(
        @Inject("$ionicPlatform") private ionicPlatform: ionic.platform.IonicPlatformService,
        @Inject("openIddictConfig") private openIddictConfig: openIddict.IOpenIddictConfig,
        @Inject("baseUrl") private _baseUrl: string
    ) {
        openIddictConfig.scope = "email profile";
        openIddictConfig.registerUrl = `${_baseUrl}api/account`;
        openIddictConfig.tokenUrl = `${_baseUrl}connect/token`;

        ionicPlatform.ready(function() {
            if (window.cordova && (window.cordova.plugins as any).Keyboard) {
                (window.cordova.plugins as any).hideKeyboardAccessoryBar(true);
                (window.cordova.plugins as any).disableScroll(true);
            }

            if ((window as any).StatusBar) {
                (window as any).StatusBar.styleDefault();
            }
        });
    }
}