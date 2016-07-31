import {IPage} from "./pageBase";

export class NavController {
    public static $inject = ["$log", "$state", "$ionicHistory", "$ionicViewSwitcher"];

    public constructor(
        private _logService: ng.ILogService,
        public state: ng.ui.IStateService,
        public history: ionic.navigation.IonicHistoryService,
        private _ionicViewSwitcher: any
    ) {
    }

    public push(page: IPage, params?: any, options?: ionic.navigation.IonicHistoryNextViewOptions) {
        if (options) {
            this.history.nextViewOptions(options);
        }

        this.state.go(page.__stateName, params);
    }

    public pop(params?: any, options?: ionic.navigation.IonicHistoryNextViewOptions) {
        const lastView = this.history.backView();

        if (!lastView) {
            this._logService.warn("Could not pop state - no last view found.");
            return;
        }

        if (options) {
            this.history.nextViewOptions(options);
        }

        this._ionicViewSwitcher.nextDirection("back");

        this.state.go(lastView.stateName, params)
            .then((callback) => {
                (this.history as any).removeBackView();
            });
    }

    public popMany(backCount?: number) {
        if (backCount && backCount > 0) {
            backCount = backCount * -1;
            this._logService.warn(`NavController popMany was called with a positive number. Inverting value to ${backCount}.`);
        }
        this.history.goBack(backCount);
    }
}