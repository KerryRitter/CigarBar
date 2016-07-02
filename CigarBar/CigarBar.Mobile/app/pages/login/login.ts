import { Page, NavController, NavParams, Alert } from "ionic-angular";
import { OpenIdAuthService } from "../../services/openIdAuthService";
import { Register } from "../register/register";

@Page({
    templateUrl: "build/pages/login/login.html"
})
export class Login {
    public static get parameters() {
        return [[NavController], [NavParams], [OpenIdAuthService]];
    }

    constructor(
        public nav: NavController,
        public navParams: NavParams,
        private _authService: OpenIdAuthService
    ) {
        this.nav = nav;
    }

    public ngOnInit() {
    }

    public login(username: string, password: string) {
        this._authService.getNewToken(username, password)
            .then(token => {
                this.nav.present(Alert.create({
                    title: "It worked!",
                    buttons: ["OK"]
                }));
            })
            .catch(token => {
                this.nav.present(Alert.create({
                    title: "Error",
                    subTitle: token.json().error_description,
                    buttons: ["OK"]
                }));
            });
    }

    public goToRegister() {
        this.nav.push(Register);
    }
}