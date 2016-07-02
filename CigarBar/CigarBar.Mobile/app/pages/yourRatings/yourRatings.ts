import {Page, NavController, NavParams} from "ionic-angular";
import {RatingService} from "../../services/ratingService";
import { IRating } from "../../models/rating";

@Page({
    templateUrl: "build/pages/yourRatings/yourRatings.html"
})
export class YourRatings {
    public static get parameters() {
        return [[NavController], [NavParams], [RatingService]];
    }

    public ratings: [IRating] = null;

    constructor(
        public nav: NavController,
        public navParams: NavParams,
        private _ratingService: RatingService
    ) {
        this.nav = nav;
    }

    public ngOnInit() {
    }

    //itemTapped(event, item) {
    //    this.nav.push(YourRatings, {
    //        item: item
    //    });
    //}
}