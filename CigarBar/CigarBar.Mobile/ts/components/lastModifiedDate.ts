import { IonicApplication, Component } from "../app";

@Component(IonicApplication, "lastModifiedDate", {
    template: `
        <span>{{$ctrl.prefix ? $ctrl.prefix : ''}} {{$ctrl.lastModifiedDisplay}}</span>
    `,
    bindings: {
        date: "=",
        prefix: "=",
        fullDatePrefix: "=",
        fullDateOnly: "="
    }
})
export class LastModifiedDate {
    public date: Date;
    public prefix: string;
    public fullDatePrefix: string;
    public fullDateOnly: boolean;

    public get lastModifiedDisplay(): string {
        const lastModifiedMoment = (window as any).moment(this.date);
        const wasWithinAWeek = lastModifiedMoment <= (window as any).moment().subtract(7, "days");
        
        if (this.fullDateOnly || wasWithinAWeek) {
            return `${this.fullDatePrefix ? this.fullDatePrefix : ""} ${lastModifiedMoment.format("MMMM Do YYYY, h:mm a")}`;
        }

        return lastModifiedMoment.fromNow();
    }
}