import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { AppSettings } from "../app";
import { ICigar } from "../models/cigar";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

@Injectable()
export class CigarService {
    constructor(private _http: Http) {
        
    }

    public findAll(search: string): Observable<ICigar> {
        return this._http
            .get(AppSettings.getAppUrl(`api/cigars?search=${search}`))
            .map(res => {
                return res.json() as ICigar;
            });
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
}