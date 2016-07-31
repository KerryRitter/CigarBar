import { IonicApplication, SideMenuPage, Inject, PageBase, NavController } from "../app";
import { CigarService } from "../services/cigarService";
import { AddRatingDetailsPage } from "./addRatingDetails";

@SideMenuPage(IonicApplication, "mainMenu", "createCigar", {
    url: "/createCigar",
    template: `
        <ion-view view-title="Create Cigar">
            <ion-content class="padding">
                <div class="list">
                    <label class="item item-input item-floating-label">
                        <span class="input-label">Cigar Brand (e.g. CAO, Drew Estate)</span>
                        <input type="text" 
                            placeholder="Cigar Brand (e.g. CAO, Drew Estate)"
                            ng-model="brand">
                    </label>
                    <label class="item item-input item-floating-label">
                        <span class="input-label">Cigar Name (e.g. Brazilia, Natural)</span>
                        <input type="text" 
                            placeholder="Cigar Name (e.g. Brazilia, Natural)"
                            ng-model="name">
                    </label>

                    <button class="button button-block button-positive"
                        ng-disabled="!brand || !name"
                        ng-click="$ctrl.save(brand, name)">
                        Save
                    </button>
                </div>
            </ion-content>
        </ion-view>
    `
}) 
export class CreateCigarPage extends PageBase {
    public constructor(
        @Inject("$log") private _logService: ng.ILogService,
        @Inject("$ionicLoading") private _ionicLoadingService: ionic.loading.IonicLoadingService,
        @Inject("navController") private _nav: NavController,
        @Inject("cigarService") private _cigarService: CigarService,
        @Inject("$scope") scope: ng.IScope
    ) {
        super(scope);
        this._logService.log("Opened createCigar");
    }

    public save(brand: string, name: string) {
        const cigar = {
            brand: brand,
            name: name
        } as ICigar;

        this._ionicLoadingService.show({ template: "Loading..." });
        this._cigarService.post(cigar)
            .then((response) => { 
                this._ionicLoadingService.hide();
                this._nav.push(AddRatingDetailsPage, {
                    cigar: response.data
                });
            })
            .catch((response) => {
                this._ionicLoadingService.hide();
            });
    }
}