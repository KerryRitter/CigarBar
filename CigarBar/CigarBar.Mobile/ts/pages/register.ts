import { IonicApplication, Page, Inject, PageBase, NavController } from "../app";
import { MyRatingsPage } from "./myRatings";

@Page(IonicApplication, "register", {
    template: `
        <ion-view title="Register">
            <ion-nav-bar class="bar-positive">
                <ion-nav-back-button>
                </ion-nav-back-button>
            </ion-nav-bar>
            <ion-content class="padding" scroll="false">
                <div class="list list-inset" style="background: transparent;">
                    <label class="item item-input" style="margin-bottom: 10px;">
                        <input type="text" ng-model="email" placeholder="Email">
                    </label>
                    <label class="item item-input" style="margin-bottom: 10px;">
                        <input type="password" ng-model="password" placeholder="Password">
                    </label>
                    <label class="item item-input">
                        <input type="password" ng-model="confirmPassword" placeholder="Confirm Password">
                    </label>
                </div>
                
                <button type="submit" 
                    class="button button-positive button-block" 
                    ng-click="$ctrl.register(email, password, confirmPassword)">
                    Register
                </button>
                <button type="submit" 
                    class="button button-stable button-block" 
                    ng-click="$ctrl.goToLogin()">
                    Login with existing account
                </button>
            </ion-content>
        </ion-view>
    `,
})
export class RegisterPage extends PageBase {
    public constructor(
        @Inject("$log") private _logService: ng.ILogService,
        @Inject("$ionicPopup") private _ionicPopupService: ionic.popup.IonicPopupService,
        @Inject("$ionicLoading") private _ionicLoadingService: ionic.loading.IonicLoadingService,
        @Inject("openIddictHttpService") private _openIddictHttpService: openIddict.IOpenIddictHttpService,
        @Inject("navController") private _nav: NavController,
        @Inject("$scope") scope: ng.IScope
    ) {
        super(scope);
    }

    public register(email: string, password: string, confirmPassword: string) {
        if (!email || !password || !confirmPassword) {
            return;
        }
        
        if (!this.poorlyValidateEmail(email)) {
            this._ionicPopupService.alert({
                title: "Could not register",
                template: `'${email}' is not a valid email address."`
            });
            return;
        }

        if (password !== confirmPassword) {
            this._ionicPopupService.alert({
                title: "Could not register",
                template: "The entered passwords do not match."
            });
            return;
        }

        this._ionicLoadingService.show({ template: "Loading..." });
        this._openIddictHttpService.register(email, password)
            .then((response) => {
                this._ionicLoadingService.hide();
                this._nav.push(MyRatingsPage);
            })
            .catch((response) => {
                this._ionicLoadingService.hide();
                this._ionicPopupService.alert({
                    title: "Could not register",
                    template: response.messages.join(" ")
                });
            }); 
    }

    public goToLogin() {
        this._nav.pop();
    }

    public ionViewWillEnter(event: ng.IAngularEvent, data: any) {
        if (this._openIddictHttpService.token) {
            this._nav.push(MyRatingsPage);
        }
    }

    private poorlyValidateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}