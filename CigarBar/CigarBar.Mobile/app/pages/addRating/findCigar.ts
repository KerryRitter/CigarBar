import {Page, NavController, NavParams} from "ionic-angular";
import {ICigar} from "../../models";
import {RatingDetails} from "./ratingDetails";
import {CreateNewCigar} from "./createNewCigar";

@Page({
    templateUrl: "build/pages/addRating/findCigar.html"
})
export class FindCigar {
    static get parameters() {
        return [[NavController], [NavParams]];
    }

    public cigars: ICigar[] = [];

    constructor(
        public nav: NavController,
        public navParams: NavParams
    ) {
        this.nav = nav;

        this.cigars.push({
            id: 0,
            brand: "CAO",
            name: "Brazilia"
        } as ICigar);

        this.cigars.push({
            id: 1,
            brand: "CAO",
            name: "Flathead"
        } as ICigar);

        this.cigars.push({
            id: 2,
            brand: "CAO",
            name: "Italia"
        } as ICigar);

        this.cigars.push({
            id: 3,
            brand: "CAO",
            name: "Something"
        } as ICigar);

        this.cigars.push({
            id: 4,
            brand: "CAO",
            name: "Else"
        } as ICigar);
    }

    public goToRatingDetails(cigar) {
        this.nav.push(RatingDetails, {
            cigar: cigar
        });
    }

    public goToCreateNewCigar() {
        this.nav.push(CreateNewCigar);
    }
}