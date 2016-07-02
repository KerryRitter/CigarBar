import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import { Observable } from "rxjs/Observable";
import { AppSettings } from "../app";
import { OpenIdAuthService, IOpenIdToken, IOpenIdToken as OpenIdToken } from "./openIdAuthService";

@Injectable()
export class OpenIdHttp {
    constructor(
        private _http: Http,
        private _openIdAuthService: OpenIdAuthService) {
    }

    public get<T>(url: string): Promise<T> {
        return new Promise((resolve, reject) => {
            this.getHeadersWithAuth()
                .then((headers: Headers) => {
                    var data = this._http
                        .get(url, { headers: headers })
                        .map(res => res.json());

                    resolve(data as Observable<T>);
                })
                .catch(reason => {
                    reject(reason);
                });
        });
    }

    public post(url: string, data: any) {
        return new Promise((resolve, reject) => {
            this.getHeadersWithAuth()
                .then((headers: Headers) => {
                    this._http.post(url, JSON.stringify(data), { headers: headers })
                    .toPromise()
                    .then(data => {
                        resolve(data);
                    })
                    .catch(reason => {
                        reject(reason);
                    });

                })
                .catch(reason => {
                    reject(reason);
                });
        });
    }

    public put(url: string, data: any) {
        return new Promise((resolve, reject) => {
            this.getHeadersWithAuth()
                .then((headers: Headers) => {
                    this._http.put(url, JSON.stringify(data), { headers: headers })
                        .toPromise()
                        .then(data => {
                            resolve(data);
                        })
                        .catch(reason => {
                            reject(reason);
                        });

                })
                .catch(reason => {
                    reject(reason);
                });
        });
    }

    public delete(url: string) {
        return new Promise((resolve, reject) => {
            this.getHeadersWithAuth()
                .then((headers: Headers) => {
                    this._http.delete(url, { headers: headers })
                        .toPromise()
                        .then(data => {
                            resolve(data);
                        })
                        .catch(reason => {
                            reject(reason);
                        });

                })
                .catch(reason => {
                    reject(reason);
                });
        });
    }

    private getHeadersWithAuth(): Promise<Headers> {
        var headers = new Headers();

        return new Promise((resolve, reject) => {
            this._openIdAuthService.getSavedToken()
                .then((token: IOpenIdToken) => {
                    if (token && token.access_token !== "") {
                        headers.append("Authorization", "Bearer " + token);
                    }
                    resolve(headers);
                })
                .catch(reason => {
                    reject(reason);
                });
        });
    }
}