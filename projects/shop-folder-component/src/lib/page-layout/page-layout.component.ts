import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { FilterLayoutComponent } from '../filter-layout/filter-layout.component';
import { DBService, IFolder } from 'shop-folder-core';
import { Observable, map, take } from 'rxjs';

@Component({
  selector: 'lib-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatSidenavModule, MatRippleModule, MatListModule, MatBottomSheetModule]
})
export class PageLayoutComponent implements OnInit {
  @Input() title = '';
  @Input() backURL = '';
  @Input() hideSearch = false;
  @Input() hideDrawer = false;
  @Input() hideFilter = true;

  fetchFolder$: Observable<any> | undefined;

  constructor(private router: Router, private _bottomSheet: MatBottomSheet, public dbService: DBService) { }

  ngOnInit(): void {
    this.fetchFolder$ = this.dbService.allFolders.pipe(map((_: any) => _._value));
    this.fetchFolder$.pipe(take(1)).subscribe({
      next: res => console.log({ res }),
      error: err => console.log({ err })
    });
  }

  goBack() {
    if (this.backURL) {
      this.router.navigateByUrl(this.backURL);
    }
  }

  openFilterPanel() {
    this._bottomSheet.open(FilterLayoutComponent);
  }
}
