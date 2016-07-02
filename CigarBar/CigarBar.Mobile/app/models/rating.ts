import {ICigar} from "./cigar";

export interface IRating {
    value: number;
    details: string;
    lastModifiedAt: Date;
    cigar: ICigar;
}