import { Http, Response } from "@angular/http";
import { AppSettings } from "../app";
import { IRating } from "../models/rating";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import "rxjs/Rx";

@Injectable()
export class RatingService {
    constructor(private _http: Http) {

    }

    public findAll(): Observable<[IRating]> {
        return this._http
            .get(AppSettings.getAppUrl("api/ratings"))
            .map(res => {
                return res.json() as [IRating];
            });
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
}