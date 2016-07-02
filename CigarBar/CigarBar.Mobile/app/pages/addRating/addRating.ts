import {Page, NavController, NavParams} from "ionic-angular";


@Page({
    templateUrl: "build/pages/addRating/addRating.html"
})
export class AddRating {
    static get parameters() {
        return [[NavController], [NavParams]];
    }

    public selectedItem: string;
    public icons: [string];
    public items: [any];

    constructor(
        public nav: NavController,
        public navParams: NavParams
    ) {
        this.nav = nav;
    }

    itemTapped(event, item) {
        this.nav.push(AddRating, {
            item: item
        });
    }
}