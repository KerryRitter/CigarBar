import { Injectable, Component } from "@angular/core";
import {Page, Storage, LocalStorage} from "ionic-angular";
import { Http, Response, Headers } from "@angular/http";
import { AppSettings } from "../app";

// ReSharper disable InconsistentNaming
export interface IOpenIdToken {
    access_token: string;
    scope: string;
    refresh_token: string;
    expires_in: number;
    expires_at: number;

    error: string;
    error_description: string;
}

export interface ICreateAccountResponse {
    Succeeded: boolean;
    Errors: [ICreateAccountResponseError];
}

interface ICreateAccountResponseError {
    Code: string;
    Description: string;
}

// ReSharper restore InconsistentNaming

@Injectable()
export class OpenIdAuthService {
    private _storage: Storage;

    constructor(
        private _http: Http) {
        this._storage = new Storage(LocalStorage);
    }

    public saveToken(token: IOpenIdToken) {
        token.expires_at = (new Date()).getTime() + token.expires_in;
        this._storage.set("token", JSON.stringify(token));
    }

    public getSavedToken(): Promise<IOpenIdToken> {
        console.log("getSavedToken()");

        return new Promise<IOpenIdToken>((resolve, reject) => {
            this._storage.get("token")
                .then(tokenString => {
                    console.log(`tokenString: ${tokenString}`);

                    var token = JSON.parse(tokenString) as IOpenIdToken;
                    console.log(`token:`, token);

                    if (this.isTokenExpired(token)) {
                        console.log(`Token is expired, getting refresh token:`, token);
                        this.getRefreshedToken(token)
                            .then(newToken => {
                                resolve(newToken);
                            });
                    } else {
                        console.log(`Token is not expired, returning token:`, token);
                        resolve(token);
                    }
                })
                .catch(reason => {
                    reject(reason);
                });
        });
    }

    public getNewToken(email: string, password: string): Promise<IOpenIdToken> {
        console.log(`getNewToken('${email}', '${password}')`);
        return this._http.post(
                AppSettings.getAppUrl("connect/token"),
                this.urlEncodeValues({
                    "grant_type": "password",
                    "username": email,
                    "password": password,
                    "scope": "offline_access profile email"
                }),
                { headers: this.getHeaders(null) })
            .toPromise()
            .then(response => response.json() as IOpenIdToken)
            .then(token => {
                console.log("getNewToken() got a token.");
                if (!token.error) {
                    console.log("getNewToken() is saving the token.");
                    this.saveToken(token);
                }
                return token;
            });
    }

    public createNewAccount(email: string, password: string): Promise<ICreateAccountResponse> {
        console.log(`getNewToken('${email}', '${password}')`);
        return this._http.post(
                AppSettings.getAppUrl("api/account"),
                JSON.stringify({ email: email, password: password }),
                { headers: this.getHeaders("application/json") })
            .toPromise()
            .then(response => response.json() as ICreateAccountResponse)
            .catch(response => response.json());
    }

    private getRefreshedToken(token: IOpenIdToken): Promise<IOpenIdToken> {
        console.log(`getRefreshedToken()`, token);

        return this._http.post(
            AppSettings.getAppUrl("connect/token"),
            this.urlEncodeValues({
                "grant_type": "refresh_token",
                "scope": "offline_access profile email",
                "refresh_token": token.refresh_token
            }),
            { headers: this.getHeaders(null) })
            .toPromise()
            .then(response => response.json() as IOpenIdToken)
            .then(token => {
                console.log("getRefreshedToken() got a token.");
                if (!token.error) {
                    console.log("getRefreshedToken() is saving the token.");
                    this.saveToken(token);
                }
                return token;
            });
    }

    private isTokenExpired(token: IOpenIdToken): boolean {
        return (new Date()).getTime() > token.expires_at;
    }

    private getHeaders(contentType: string): Headers {
        var headers = new Headers();
        headers.append("Content-Type", contentType ? contentType : "application/x-www-form-urlencoded");
        return headers;
    }

    private urlEncodeValues(data: any) {
        var str = "";
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                str += `${key}=${data[key]}&`;
            }
        }
        return str;
    }
}