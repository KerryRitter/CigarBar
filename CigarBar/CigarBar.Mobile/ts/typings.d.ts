/// <reference path="../typings/index.d.ts" />
/// <reference path="../ionic-typescript/typings.d.ts" />
/// <reference path="../angular-openiddict/typings.d.ts" />
/// <reference path="../node_modules/moment/moment.d.ts" />

interface ICigar { 
    id: number;
    brand: string;
    name: string;
}

interface IRating {
    id: number;
    value: number;
    details: string;
    lastModifiedAt: Date;
    cigar: ICigar;
}