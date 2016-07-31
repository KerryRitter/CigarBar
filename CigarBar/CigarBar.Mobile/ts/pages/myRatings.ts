import { IonicApplication, SideMenuPage, Inject, PageBase, NavController } from "../app";
import { RatingService } from "../services/ratingService";
import { ViewRatingPage } from "./viewRating";
import { FindCigarPage } from "./findCigar";

@SideMenuPage(IonicApplication, "mainMenu", "myRatings", {
    url: "/myRatings",
    template: `
        <ion-view view-title="My Ratings">
            <ion-content class="padding">
                <div class="card" ng-show="!$ctrl.ratings && !$ctrl.isLoading">
                    <div class="item" style="text-align: center">
                        <strong>No ratings yet!</strong>

                        <button class="button button-positive button-block" ng-click="$ctrl.goToFindCigar()">
                            Add your first rating
                        </button>
                    </div>
                </div>
                <ion-list ng-show="$ctrl.ratings && $ctrl.ratings.length">
                    <ion-item collection-repeat="rating in $ctrl.ratings" ng-click="$ctrl.goToViewRating(rating)">
                        <div>
                            {{rating.cigar.brand}} - {{rating.cigar.name}}
                            <span class="item-note">
                                <five-star-rating rating="rating.value" readonly="true" style="float: right;"></five-star-rating>
                            </span>
                        </div>
                            
                        <last-modified-date date="$ctrl.rating.lastModifiedAt" 
                            full-date-only="true"
                            style="display: block; text-align: right; font-size: 12px;">
                        </last-modified-date>
                    </ion-item>
                </ion-list>
            </ion-content>
        </ion-view>
    `
}) 
export class MyRatingsPage extends PageBase {
    public ratings: IRating[] = [];
    public isLoading = false;

    public constructor(
        @Inject("$log") private _logService: ng.ILogService,
        @Inject("$ionicLoading") private _ionicLoadingService: ionic.loading.IonicLoadingService,
        @Inject("navController") private _nav: NavController,
        @Inject("ratingService") private _ratingService: RatingService,
        @Inject("$scope") scope: ng.IScope
    ) {
        super(scope);
        this._logService.log("Opened myRating");
    }

    public goToViewRating(rating: IRating) {
        this._nav.push(ViewRatingPage, { rating: rating });
    }

    public goToFindCigar() {
        this._nav.push(FindCigarPage);
    }

    public lastModifiedDisplay(rating: IRating): string {
        const lastModifiedMoment = (window as any).moment(rating.lastModifiedAt);

        if (lastModifiedMoment > (window as any).moment().subtract(7, "days")) {
            return lastModifiedMoment.fromNow();
        }

        return lastModifiedMoment.format("MMMM Do YYYY, h:mm a");
    }

    public ionViewDidEnter() {
        this.isLoading = true;
        this._ionicLoadingService.show({ template: "Loading..." });
        this._ratingService.get()
            .then((response) => {
                this.isLoading = false;
                this._ionicLoadingService.hide();
                this.ratings = response.data;
            })
            .catch((response) => {
                this.isLoading = false;
                this._ionicLoadingService.hide();
            });
    }
}