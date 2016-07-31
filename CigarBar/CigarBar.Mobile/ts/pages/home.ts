import { IonicApplication, SideMenuPage, Inject, PageBase } from "../app";

@SideMenuPage(IonicApplication, "mainMenu", "home", {
    url: "/home",
    template: `
        <ion-view view-title="Page 1">
            <ion-content class="padding">
                <button class="button button-positive button-block">I'm a home button!</button>
            </ion-content>
        </ion-view>
    `
}) 
export class HomePage extends PageBase {
    public constructor(
        @Inject("$log") private _logService: ng.ILogService,
        @Inject("$scope") scope: ng.IScope
    ) {
        super(scope);
        this._logService.log("Opened home");
    }
}