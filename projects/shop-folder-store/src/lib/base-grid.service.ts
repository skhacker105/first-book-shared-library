import { BehaviorSubject } from 'rxjs';
import { DBService } from './db.service';
import { BaseModel, SelectableBaseModel } from './entity.model';
import { IDBFilter } from './db-filter.interface';
import { IDBPaging, PagingUtil } from './db-pagination.interface';

export class BaseGridService<T> {

  public reachedEndOfAllPages = false;
  public selectedFilter: IDBFilter | undefined;

  private lstData = new BehaviorSubject<SelectableBaseModel<T>[]>([]);
  private paging: IDBPaging | undefined;

  constructor(private dBService: DBService, public storeName: string, private defaultFilter?: IDBFilter, private defaultPaging?: IDBPaging) {
    this.resetFilterAndPaging();
  }

  resetFilterAndPaging() {
    this.setFilter();
    this.setPaging();
    this.populateAllFromDB();
  }

  setFilter() {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
    this.selectedFilter = this.defaultFilter ? this.defaultFilter : {
      index: 'createdOn',
      filter: IDBKeyRange.bound(start, end, false, false)
    };
  }

  setPaging() {
    this.paging = this.defaultPaging ? this.defaultPaging : {
      pageNumber: 0,
      pageSize: 10
    }
  }

  populateAllFromDB(append = false) {
    this.dBService.getAll(this.storeName, this.selectedFilter, this.paging)
      .then(res => {
        if (!append) this.lstData.next(res);
        else {
          this.lstData.value.push(res);
        }
      })
      .catch(err => console.log('Error while loading data previous data. ', err));
  }

  addNew(obj: BaseModel<T>) {
    obj.save()
      .subscribe({
        next: (res) => this.populateAllFromDB(),
        error: err => console.log('Error while saving data: ', err)
      });
  }

  delete(obj: BaseModel<T>) {
    obj.delete()
      .subscribe({
        next: (res) => this.populateAllFromDB(),
        error: err => console.log('Error while saving data: ', err)
      });
  }

  loadNextPage() {
    if (this.reachedEndOfAllPages || !this.paging) return;

    let [start, end] = PagingUtil.getRange(this.paging);
    if (this.lstData.value.length < end) {
      this.reachedEndOfAllPages = true;
      return;
    }

    this.paging.pageNumber = this.paging.pageNumber + 1;
    this.populateAllFromDB(true);

  }
}
