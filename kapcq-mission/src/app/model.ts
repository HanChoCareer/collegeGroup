export class Attendance {
    public team: string;
    public total: number;
    public service: number;
    public meeting: number;

    public constructor(init?:Partial<Attendance>) {
        Object.assign(this, init);
    }
}