import resolveModule from "../resolveModule";
import {ISideMenu, ISideMenuConfig} from "../sideMenuBase";

function getTemplateWrapper(config: ISideMenuConfig) {
    config.navBarClass = config.navBarClass ? config.navBarClass : "bar-positive";
    config.menuTriggerButtonClass = config.menuTriggerButtonClass ? config.menuTriggerButtonClass : "button-clear";
    config.menuHeaderBarClass = config.menuHeaderBarClass ? config.menuHeaderBarClass : "bar-stable";
    config.menuHeaderBarTitle = config.menuHeaderBarTitle ? config.menuHeaderBarTitle : "Menu";

    return `<ion-side-menus>
                <ion-side-menu-content>
                    <ion-nav-bar class="${config.navBarClass}">
                        <ion-nav-back-button>
                        </ion-nav-back-button>
                        <ion-nav-buttons side="left">
                            <button class="button button-icon ion-navicon ${config.menuTriggerButtonClass}" menu-toggle="left"></button>
                        </ion-nav-buttons>
                    </ion-nav-bar>
                    <ion-nav-view name="menuContent"></ion-nav-view>
                </ion-side-menu-content>
                <ion-side-menu side="left" enable-menu-with-back-views="true">
                    <ion-header-bar class="${config.menuHeaderBarClass}">
                        <h1 class="title">${config.menuHeaderBarTitle}</h1>
                    </ion-header-bar>
                    <ion-content scroll="false">
                        ${config.template}
                    </ion-content>
                </ion-side-menu>
            </ion-side-menus>`;
}

export function SideMenu(module: ng.IModule | string, stateName: string, config: ISideMenuConfig) {
    return function (target: ISideMenu) {
        module = resolveModule(module);
        (module as ng.IModule).config(["$stateProvider", function($stateProvider: ng.ui.IStateProvider) {
            config.template = getTemplateWrapper(config);

            target.__menuStateName = stateName;

            $stateProvider.state(stateName, angular.extend({
                abstract: true,
                controller: target,
                controllerAs: "$ctrl"
            }, config as ng.ui.IState));
        }]);
    };
}