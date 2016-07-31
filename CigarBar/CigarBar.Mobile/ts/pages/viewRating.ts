import { IonicApplication, SideMenuPage, Inject, PageBase, NavController } from "../app";
import { RatingService } from "../services/ratingService";
import { EditRatingDetailsPage } from "./editRatingDetails";

@SideMenuPage(IonicApplication, "mainMenu", "viewRating", {
    url: "/viewRating",
    template: `
        <ion-view view-title="View Rating">
            <ion-content class="padding">
                <div class="card">
                    <div class="item item-divider">
                        Rating
                    </div>
                    <div class="item item-text-wrap">
                        <five-star-rating readonly="true" rating="$ctrl.rating.value" style="font-size: 32px;"></five-star-rating>
                    </div>
                </div>

                <div class="card">
                    <div class="item item-divider">
                        Details
                    </div>
                    <div class="item item-text-wrap">
                        {{$ctrl.rating.details}}
                    </div>
                    <div class="item item-divider" style="text-align: right">
                        <small>
                            <last-modified-date date="$ctrl.rating.lastModifiedAt" prefix="'Last updated'" full-date-prefix="'at'">
                            </last-modified-date>
                        </small>
                    </div>
                </div>

                <button class="button button-energized button-block"
                    ng-click="$ctrl.goToEdit()">
                    Edit Rating
                </button>

                <button class="button button-assertive button-block"
                    ng-click="$ctrl.delete()">
                    Delete Rating
                </button>
            </ion-content>
        </ion-view>
    `,
    params: {
        rating: null,
        edited: false
    }
}) 
export class ViewRatingPage extends PageBase {
    public rating: IRating;

    public searchResults: ICigar[] = null;

    public constructor(
        @Inject("$log") private _logService: ng.ILogService,
        @Inject("$ionicPopup") private _ionicPopupService: ionic.popup.IonicPopupService,
        @Inject("$ionicLoading") private _ionicLoadingService: ionic.loading.IonicLoadingService,
        @Inject("navController") private _nav: NavController,
        @Inject("ratingService") private _ratingService: RatingService,
        @Inject("$scope") scope: ng.IScope
    ) {
        super(scope);
        this._logService.log("Opened ViewRatingDetailsPage");
    }

    public delete() {
        this._ionicPopupService.confirm({
            title: "Are you sure?",
            okText: "Yes",
            cancelText: "No"
        }).then((response: boolean) => {
            if (response) {
                this._ionicLoadingService.show({ template: "Loading..." });
                this._ratingService.delete(this.rating)
                    .then((response) => {
                        this._ionicLoadingService.hide();
                        this._nav.pop();
                    })
                    .catch((response) => {
                        this._ionicLoadingService.hide();
                    });
            }
        });
    }

    public goToEdit() {
        this._nav.push(EditRatingDetailsPage, { rating: this.rating });
    }

    public ionViewWillEnter(event: ng.IAngularEvent, data: any) {
        this.rating = data.stateParams.rating;

        if (data.stateParams.edited) {
            (this._nav.history as any).removeBackView();
        }
    }
}