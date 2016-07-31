import { IonicApplication, SideMenuPage, Inject, PageBase, NavController } from "../app";
import { RatingService } from "../services/RatingService";
import { CreateCigarPage } from "./createCigar";
import { MyRatingsPage } from "./myRatings";

@SideMenuPage(IonicApplication, "mainMenu", "editRatingDetails", {
    url: "/editRatingDetails",
    template: `
        <ion-view view-title="Edit Rating">
            <ion-content class="padding">
                <div class="card">
                    <div class="item item-divider">
                        Rating
                    </div>
                    <div class="item item-text-wrap">
                        <five-star-rating rating="$ctrl.newRatingDetails.value" style="font-size: 32px;"></five-star-rating>
                    </div>
                </div>
                <div class="card">
                    <div class="item item-divider">
                        Details
                    </div>
                    <div class="item item-text-wrap">
                        <textarea rows="6" ng-model="$ctrl.newRatingDetails.details" style="width: 100%; resize: none;"></textarea>
                    </div>
                </div>

                <div class="padding">
                    <button class="button button-block button-positive"
                            ng-disabled="!$ctrl.newRatingDetails.value || !$ctrl.newRatingDetails.details"
                            ng-click="$ctrl.save(value, details)">
                        Submit
                    </button>

                    <button class="button button-block button-stable"
                            ng-click="$ctrl.goToViewRating()">
                        Cancel
                    </button>
                </div>
            </ion-content>
        </ion-view>
    `,
    params: {
        rating: null
    }
}) 
export class EditRatingDetailsPage extends PageBase {
    public rating: IRating;
    public newRatingDetails: IRating;

    public constructor(
        @Inject("$log") private _logService: ng.ILogService,
        @Inject("$ionicLoading") private _ionicLoadingService: ionic.loading.IonicLoadingService,
        @Inject("navController") private _nav: NavController,
        @Inject("ratingService") private _ratingService: RatingService,
        @Inject("$scope") scope: ng.IScope
    ) {
        super(scope);
        this._logService.log("Opened EditRatingDetailsPage");
    }

    public save() {
        this._ionicLoadingService.show({ template: "Loading..." });
        this._ratingService.put(this.newRatingDetails)
            .then((response) => {
                this._ionicLoadingService.hide();
                this._nav.push(MyRatingsPage, null, { historyRoot: true });
            })
            .catch((response) => {
                this._ionicLoadingService.hide();
            });
    }

    public goToViewRating() {
        this._nav.pop({ rating: this.rating });
    }

    public ionViewWillEnter(event: ng.IAngularEvent, data: any) {
        this.rating = data.stateParams.rating;
        this.newRatingDetails = angular.copy(this.rating);
    }
}