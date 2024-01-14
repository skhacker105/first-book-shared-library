import { Observable, from } from "rxjs";
import { DBService } from "./db.service";

const NEWID = (size: number = 16) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

export class BaseModel<T> {
    public keyColumn = 'id';
    public __v = 0;
    public name: string | undefined;
    public storeName: string;
    public createdBy: string | undefined;
    public createdOn: Date = new Date();
    public modificationHistory: { modifiedBy: string, modifiedOn: Date }[] = [];

    constructor(private dBService: DBService, storeName: string, obj: any) {
        this.storeName = storeName;
        if (obj['__v']) this.createdBy = obj['__v'];
        if (obj['name']) this.name = obj['name'];
        if (obj['createdBy']) this.createdBy = obj['createdBy'];
        if (obj['createdOn']) this.createdOn = obj['createdOn'];
        if (obj['modificationHistory']) this.modificationHistory = obj['modificationHistory'];
    }

    public save(sanytizedLoad: any = null): Observable<T> {
        const { storeName, ...payload }: any = { ...(sanytizedLoad ? sanytizedLoad : this) };
        if (!payload[this.keyColumn]) {
            payload[this.keyColumn] = NEWID();
            return from(this.dBService.add(this.storeName, payload));
        } else {
            return from(this.dBService.update(this.storeName, payload));
        }
    }

    public delete(): Observable<T> {
        const { storeName, ...payload }: any = { ...this };
        return from(this.dBService.delete(this.storeName, payload));
    }
}


export class SelectableBaseModel<T> extends BaseModel<T> {
    public isSelected = false;

    constructor(entityService: DBService, storeName: string, obj: any) {
        super(entityService, storeName, obj);
    }

    public override save(sanytizedLoad: any = null): Observable<T> {
        const { isSelected, ...payload }: any = { ...(sanytizedLoad ? sanytizedLoad : this) };
        return super.save(payload);
    }
}
