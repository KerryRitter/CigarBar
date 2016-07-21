import {Page, NavController, NavParams} from "ionic-angular";
import {ICigar, IRating} from "../../models";

@Page({
    templateUrl: "build/pages/addRating/ratingDetails.html"
})
export class RatingDetails {
    static get parameters() {
        return [[NavController], [NavParams]];
    }

    public rating: IRating;

    constructor(
        public nav: NavController,
        public navParams: NavParams
    ) {
        this.nav = nav;
        this.rating = {
            value: 3,
            details: "",
            cigar: navParams.get("cigar") as ICigar
        } as IRating;
    }
}