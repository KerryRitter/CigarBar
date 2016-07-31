export class OpenIddictHttpService implements openIddict.IOpenIddictHttpService {
    public static $inject = ["$http", "$window", "$q", "openIddictConfig"];
    
    public constructor(
        private _httpService: ng.IHttpService,
        private _windowService: ng.IWindowService,
        private _qService: ng.IQService,
        private _config: openIddict.IOpenIddictConfig 
    ) {
    }

    public register(email: string, password: string): any {
        return this._qService((resolve: ng.IQResolveReject<openIddict.IAuthenticateResponse>, reject: ng.IQResolveReject<any>) => {
            return this._httpService<openIddict.IOpenIdToken>({
                method: "POST", 
                url: this._config.registerUrl, 
                data: { 
                    email: email, 
                    password: password, 
                }
            })
            .success((data: any, status: number, headers: ng.IHttpHeadersGetter, config: ng.IRequestConfig) => {
                if (data.succeeded) {
                    resolve({
                        success: true,
                        messages: null
                    } as openIddict.IAuthenticateResponse);
                } else {
                    var message = "There was an error during registration";
                    try {
                        message = data.errors[0].description;
                    } catch (ex) {
                        console.log(ex);
                    }
                    reject({
                        success: false,
                        messages: [message]
                    } as openIddict.IAuthenticateResponse);
                }
            }).error((data: any, status: number, headers: ng.IHttpHeadersGetter, config: ng.IRequestConfig) => {
                reject({
                    success: false,
                    messages: ["There was a server error during registration"]
                } as openIddict.IAuthenticateResponse);
            });
        });
    }

    public login(email: string, password: string): any {
        return this._qService((resolve: ng.IQResolveReject<openIddict.IAuthenticateResponse>, reject: ng.IQResolveReject<any>) => {
            return this._httpService<openIddict.IOpenIdToken>({
                method: "POST", 
                url: this._config.tokenUrl,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: { 
                    username: email, 
                    password: password, 
                    grant_type: "password",
                    scope: "profile email"
                }, 
                transformRequest: this.transformToQueryString
            })
            .success((data: openIddict.IOpenIdToken, status: number, headers: ng.IHttpHeadersGetter, config: ng.IRequestConfig) => {
                if (data.error) {
                    resolve({
                        success: false,
                        messages: [data.error_description]
                    } as openIddict.IAuthenticateResponse);
                } else {
                    this._windowService.localStorage.setItem("token", JSON.stringify(data));
                    resolve({
                        success: true,
                        messages: null
                    } as openIddict.IAuthenticateResponse);
                }
            }).error((data: any, status: number, headers: ng.IHttpHeadersGetter, config: ng.IRequestConfig) => {
                reject(data);
            });
        });
    }

    public get<T>(url: string, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return this._httpService.get<T>(url, this.addTokenHeader(config));
    }

    public delete<T>(url: string, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return this._httpService.delete<T>(url, this.addTokenHeader(config));
    }

    public head<T>(url: string, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return this._httpService.head<T>(url, this.addTokenHeader(config));
    }

    public jsonp<T>(url: string, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return this._httpService.jsonp<T>(url, this.addTokenHeader(config));
    }

    public post<T>(url: string, data: any, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return this._httpService.post<T>(url, data, this.addTokenHeader(config));
    }

    public put<T>(url: string, data: any, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return this._httpService.put<T>(url, data, this.addTokenHeader(config));
    }

    public patch<T>(url: string, data: any, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return this._httpService.patch<T>(url, data, this.addTokenHeader(config));
    }

    public get token(): string {
        const tokenPayloadJson = this._windowService.localStorage.getItem("token");

        if (!tokenPayloadJson) {
            return null;
        }

        try {
            const token = JSON.parse(tokenPayloadJson) as openIddict.IOpenIdToken;
            return token && token.access_token ? token.access_token : null;
        } catch (ex) {
            return null;
        }
    }

    public clearToken() {
        this._windowService.localStorage.removeItem("token");
    }

    private addTokenHeader(config?: ng.IRequestShortcutConfig): ng.IRequestShortcutConfig {
        if (!config) {
            config = {};
        }

        if (!config.headers) {
            config.headers = {};
        }

        config.headers["Authorization"] = `Bearer ${this.token}`;
        
        return config;
    }

    private transformToQueryString(obj: any): string {
        var str = [];
        for (var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
    }
}