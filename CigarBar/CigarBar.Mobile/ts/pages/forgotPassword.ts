import { IonicApplication, Page, Inject, PageBase, NavController } from "../app";
import { MyRatingsPage } from "./myRatings";

@Page(IonicApplication, "forgotPassword", {
    template: `
        <ion-view title="Register">
            <ion-nav-bar class="bar-positive">
                <ion-nav-back-button>
                </ion-nav-back-button>
            </ion-nav-bar>
            <ion-content padding="true" scroll="false">
                <label class="item item-input" style="margin-bottom: 40px;">
                    <span class="input-label">Name</span>
                    <input type="text" ng-model="name">
                </label>
                <button type="submit" class="button button-calm button-block" ng-click="$ctrl.forgotPassword(name)">
                    Request New Password
                </button>
            </ion-content>
        </ion-view>
    `
})
export class ForgotPasswordController extends PageBase {
    public constructor(
        @Inject("openIddictHttpService") private _openIddictHttpService: openIddict.IOpenIddictHttpService,
        @Inject("navController") private _nav: NavController,
        @Inject("$scope") scope: ng.IScope
    ) {
        super(scope);
    }

    public forgotPassword(name: string) {
        console.log(name);
    }

    public ionViewWillEnter(event: ng.IAngularEvent, data: any) {
        if (this._openIddictHttpService.token) {
            this._nav.push(MyRatingsPage);
        }
    }
}