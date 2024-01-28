import { Collection } from "dexie";

export type FilterFunction<T> = (collection: Collection<T, number>) => Collection<T, number>;