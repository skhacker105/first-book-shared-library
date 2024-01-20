export interface IDBFilter {
    index: string;
    filter<T>(x: T): boolean;
}