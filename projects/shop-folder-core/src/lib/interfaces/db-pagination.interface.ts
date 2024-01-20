export interface IDBPaging {
    pageSize: number;
    pageNumber: number;
}

export class PagingUtil {
    public static getRange(paging: IDBPaging): [number, number] {
        const start = paging.pageNumber * paging.pageSize
        const end = start + paging.pageSize;
        return [start, end];
    }
}