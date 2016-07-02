import {ViewChild} from "@angular/core";
import {Page, NavController} from "ionic-angular";
import {StatusBar} from "ionic-native";
import {AddRating} from "../addRating/addRating";
import {YourRatings} from "../yourRatings/yourRatings";


@Page({
    templateUrl: "build/pages/home/home.html"
})
export class Home {
    static get parameters() {
        return [[NavController]];
    }

    public pages: [any];
    public rootPage: any;

    constructor(
        public nav: NavController
    ) {
        this.pages = [
            { title: "Add Rating", component: AddRating },
            { title: "Your Ratings", component: YourRatings }
        ];

        this.rootPage = YourRatings;
    }

    openPage(page) {
        this.nav.setRoot(page.component);
    }
}