import {Page, NavController, NavParams} from "ionic-angular";
import {ICigar, IRating} from "../../models";

@Page({
    templateUrl: "build/pages/addRating/createNewCigar.html"
})
export class CreateNewCigar {
    static get parameters() {
        return [[NavController], [NavParams]];
    }

    public rating: IRating;

    constructor(
        public nav: NavController,
        public navParams: NavParams
    ) {
        this.nav = nav;
    }
}