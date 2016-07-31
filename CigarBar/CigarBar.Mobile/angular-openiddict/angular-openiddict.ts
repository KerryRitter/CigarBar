import {OpenIddictHttpService} from "./service";

const AngularOpenIddict = angular.module("openIddict", []);

AngularOpenIddict.value("openIddictConfig", {} as openIddict.IOpenIddictConfig);
AngularOpenIddict.service("openIddictHttpService", OpenIddictHttpService);