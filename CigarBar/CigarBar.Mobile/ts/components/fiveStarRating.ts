import { IonicApplication, Component } from "../app";

@Component(IonicApplication, "fiveStarRating", {
    template: `
        <i ng-class="$ctrl.starClass(1)" ng-click="$ctrl.setRating(1)"></i>
        <i ng-class="$ctrl.starClass(2)" ng-click="$ctrl.setRating(2)"></i>
        <i ng-class="$ctrl.starClass(3)" ng-click="$ctrl.setRating(3)"></i>
        <i ng-class="$ctrl.starClass(4)" ng-click="$ctrl.setRating(4)"></i>
        <i ng-class="$ctrl.starClass(5)" ng-click="$ctrl.setRating(5)"></i>
    `,
    bindings: {
        rating: "=",
        readonly: "="
    }
})
export class FiveStarRating {
    public rating: number;
    public readonly: boolean;
    public size: string;

    public starClass(star: number) {
        return {
            "ion-ios-star": star <= this.rating,
            "ion-ios-star-outline": star > this.rating,
        };
    }

    public setRating(newRating: number) {
        if (this.readonly) {
            return;
        }
        this.rating = newRating;
    }
}