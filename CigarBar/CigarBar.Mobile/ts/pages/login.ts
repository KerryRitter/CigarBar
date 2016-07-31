import { IonicApplication, Page, Inject, PageBase, NavController } from "../app";
import { MyRatingsPage } from "./myRatings";
import { RegisterPage } from "./register";

@Page(IonicApplication, "login", {
    url: "/login",
    template: `
        <ion-view title="Login" hide-nav-bar="true">
            <ion-nav-bar class="bar-positive">
                <ion-nav-back-button>
                </ion-nav-back-button>
            </ion-nav-bar>
            <ion-content padding="true" scroll="false" ng-init="email = ''; password = '';">
                <img src="img/logo.png" alt="CigarBar" class="logo" style="margin: 20px auto;">

                <div class="list list-inset" style="background: transparent; margin: 0">
                    <label class="item item-input" style="margin-bottom: 10px;">
                        <input type="text" ng-model="email" placeholder="Email">
                    </label>
                    <label class="item item-input">
                        <input type="password" ng-model="password" placeholder="Password">
                    </label>
                </div>
                
                <button type="submit" class="button button-positive button-block" ng-click="$ctrl.login(email, password)">
                    Login
                </button>
                <button type="submit" class="button button-stable button-block" ng-click="$ctrl.goToRegister()">
                    Create a new account
                </button>
            </ion-content>
        </ion-view>
    `
}) 
export class LoginPage extends PageBase {
    public constructor(
        @Inject("$log") private _logService: ng.ILogService,
        @Inject("$state") private _stateService: ng.ui.IStateService,
        @Inject("$ionicPopup") private _ionicPopupService: ionic.popup.IonicPopupService,
        @Inject("$ionicLoading") private _ionicLoadingService: ionic.loading.IonicLoadingService,
        @Inject("openIddictHttpService") private _openIddictHttpService: openIddict.IOpenIddictHttpService,
        @Inject("navController") private _nav: NavController,
        @Inject("$scope") scope: ng.IScope
    ) {
        super(scope);
    }

    public login(email: string, password: string) {
        if (!email || !password) {
            return;
        }

        this._ionicLoadingService.show({ template: "Loading..." });
        this._openIddictHttpService.login(email, password)
            .then((response) => {
                password = "";
                this._ionicLoadingService.hide();
                this._nav.push(MyRatingsPage);
            })
            .catch((response: openIddict.IOpenIdToken) => {
                this._ionicLoadingService.hide();
                this._ionicPopupService.alert({
                    title: "Could not login",
                    template: response && response.error_description 
                        ? response.error_description 
                        : "There was an error during login"
                });
            });
    }

    public goToRegister() {
        this._nav.push(RegisterPage);
    }

    public ionViewWillEnter(event: ng.IAngularEvent, data: any) {
        if (this._openIddictHttpService.token) {
            this._nav.push(MyRatingsPage);
        }
    }
}