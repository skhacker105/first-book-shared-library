import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { FilterLayoutComponent } from '../filter-layout/filter-layout.component';
import { DBService, FilterFunction, anyFilters } from 'shop-folder-core';
import { Observable, map, take } from 'rxjs';
import { ShopFolderLoggerService } from 'shop-folder-logger';

@Component({
  selector: 'lib-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatSidenavModule, MatRippleModule, MatListModule, MatBottomSheetModule, FilterLayoutComponent]
})
export class PageLayoutComponent implements OnInit {
  @Input() title = '';
  @Input() backURL = '';
  @Input() hideSearch = false;
  @Input() hideDrawer = false;
  @Input() hideFilter = true;
  @Input() filters: anyFilters[] | undefined
  @Output() onFilterUpdate = new EventEmitter<FilterFunction<any>[]>();


  fetchFolder$: Observable<any> | undefined;

  constructor(
    private router: Router,
    private _bottomSheet: MatBottomSheet,
    public dbService: DBService,
    private logger: ShopFolderLoggerService
  ) { }

  ngOnInit(): void {
    this.fetchFolder$ = this.dbService.allFolders.pipe(map((_: any) => _._value));
  }

  goBack() {
    if (this.backURL) {
      this.router.navigateByUrl(this.backURL);
    }
  }

  openFilterPanel() {
    if (this.filters) {
      const filterPanel = this._bottomSheet.open(FilterLayoutComponent, {
        data: this.filters
      });
      filterPanel.afterDismissed()
      .pipe(take(1))
      .subscribe({
        next: res => res ? this.onFilterUpdate.emit(res) : null
      });
    }
    else
      this.logger.logError('Cannot open filter panel as there are no filters to show.')
  }
}
