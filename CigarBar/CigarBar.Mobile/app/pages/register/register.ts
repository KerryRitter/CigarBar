import { Page, NavController, NavParams, Alert } from "ionic-angular";
import { OpenIdAuthService } from "../../services/openIdAuthService";
import { Login } from "../login/login";

@Page({
    templateUrl: "build/pages/register/register.html"
})
export class Register {
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

    public register(username: string, password: string, confirmPassword: string) {
        if (password !== confirmPassword) {
            this.nav.present(Alert.create({
                title: "Passwords do not match",
                buttons: ["OK"]
            }));
        }
        this._authService.createNewAccount(username, password)
            .then(response => {
                if (response.Succeeded) {
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
                } else {
                    this.nav.present(Alert.create({
                        title: "Registration Error",
                        subTitle: response.Errors[0].Description,
                        buttons: ["OK"]
                    }));
                }
            });
    }

    public goToLogin() {
        this.nav.push(Login);
    }
}