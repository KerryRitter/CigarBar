import { IonicApplication, SideMenuPage, Inject, PageBase, NavController } from "../app";
import { CigarService } from "../services/cigarService";
import { CreateCigarPage } from "./createCigar";
import { AddRatingDetailsPage } from "./addRatingDetails";

@SideMenuPage(IonicApplication, "mainMenu", "findCigar", {
    url: "/findCigar",
    template: `
        <ion-view view-title="Find Cigar">
            <ion-content class="padding">
                <div class="bar bar-header item-input-inset" style="margin-bottom: 10px;">
                    <label class="item-input-wrapper">
                        <i class="icon ion-ios-search placeholder-icon"></i>
                        <input type="text" 
                            placeholder="Search for Cigar" 
                            ng-model="searchQuery" 
                            ng-model-options="{ debounce: 300 }"
                            ng-change="$ctrl.search(searchQuery)">
                    </label>
                </div>
                
                <ion-list>
                    <ion-item collection-repeat="searchResult in $ctrl.searchResults"
                        ng-click="$ctrl.selectCigar(searchResult)">
                        {{searchResult.brand}} - {{searchResult.name}}
                    </ion-item>

                    <ion-item ng-show="$ctrl.searchResults != null && $ctrl.searchResults.length === 0"
                            class="energized">
                        Sorry, we couldn't find any results!
                    </ion-item>
                </ion-list>
                
                <div class="padding" ng-show="$ctrl.searchResults != null">
                    <button class="button button-block button-energized button-small"
                            ng-click="$ctrl.goToCreateCigar()">
                        Can't find your cigar? Add it!
                    </button>
                </div>
            </ion-content>
        </ion-view>
    `,
    params: {
        cigar: null
    }
}) 
export class FindCigarPage extends PageBase {
    public cigar: ICigar;

    public searchResults: ICigar[] = null;

    public constructor(
        @Inject("$log") private _logService: ng.ILogService,
        @Inject("$ionicLoading") private _ionicLoadingService: ionic.loading.IonicLoadingService,
        @Inject("navController") private _nav: NavController,
        @Inject("cigarService") private _cigarService: CigarService,
        @Inject("$scope") scope: ng.IScope
    ) {
        super(scope);
        this._logService.log("Opened FindCigarPage");
    }

    public search(searchQuery: string) {
        this._ionicLoadingService.show({ template: "Loading..." });
        this._cigarService.get(searchQuery)
            .then((response) => {
                this._ionicLoadingService.hide();
                this.searchResults = response.data;
            })
            .catch((response) => {
                this._ionicLoadingService.hide();
            });
    }

    public selectCigar(cigar: ICigar) {
        this._nav.push(AddRatingDetailsPage, {
            cigar: cigar
        });
    }

    public goToCreateCigar() {
        this._nav.push(CreateCigarPage);
    }

    public ionViewWillEnter(event: ng.IAngularEvent, data: any) {
        if (data.stateParams.cigar) {
            this.cigar = data.stateParams.cigar;
        }
        this._logService.debug(this.cigar, data.stateParams.cigar);
    }
}