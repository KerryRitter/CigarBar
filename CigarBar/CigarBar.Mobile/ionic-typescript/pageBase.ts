export interface IPage {
    __stateName?: string;
}

export abstract class PageBase implements IPage {
    public constructor(
        private scope: ng.IScope
    ) {
        scope.$on("$ionicView.loaded", (event: ng.IAngularEvent, data: any) => {
            this.ionViewLoaded(event, data);
        });

        scope.$on("$ionicView.enter", (event: ng.IAngularEvent, data: any) => {
            this.ionViewDidEnter(event, data);
        });

        scope.$on("$ionicView.leave", (event: ng.IAngularEvent, data: any) => {
            this.ionViewDidLeave(event, data);
        });

        scope.$on("$ionicView.beforeEnter", (event: ng.IAngularEvent, data: any) => {
            this.ionViewWillEnter(event, data);
        });

        scope.$on("$ionicView.beforeLeave", (event: ng.IAngularEvent, data: any) => {
            this.ionViewWillLeave(event, data);
        });

        scope.$on("$ionicView.unloaded", (event: ng.IAngularEvent, data: any) => {
            this.ionViewDidUnload(event, data);
        });
    }

    public ionViewLoaded(event: ng.IAngularEvent, data: any) {
        return null;
    }

    public ionViewDidEnter(event: ng.IAngularEvent, data: any) {
        return null;
    }

    public ionViewDidLeave(event: ng.IAngularEvent, data: any) {
        return null;
    }

    public ionViewWillEnter(event: ng.IAngularEvent, data: any) {
        return null;
    }

    public ionViewWillLeave(event: ng.IAngularEvent, data: any) {
        return null;
    }

    public ionViewDidUnload(event: ng.IAngularEvent, data: any) {
        return null;
    }
}