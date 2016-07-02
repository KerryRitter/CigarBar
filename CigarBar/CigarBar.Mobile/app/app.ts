import {App, Platform} from "ionic-angular";
import {StatusBar} from "ionic-native";
import {Login} from "./pages/login/login";
import {RatingService} from "./services/ratingService";
import {CigarService} from "./services/cigarService";
import {OpenIdAuthService} from "./services/openIdAuthService";
import {OpenIdHttp} from "./services/openIdHttp";

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {},
  providers: [RatingService, CigarService, OpenIdAuthService, OpenIdHttp],
})
export class MyApp {
  public rootPage: any = Login;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleDefault(); 
    });
  }
}

export class AppSettings {
    public static getAppUrl(path: string): string {
        return `http://localhost:52342/${path}`;
    }
}