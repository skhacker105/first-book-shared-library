import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StyleService } from 'shop-folder-style';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'lib-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatSidenavModule]
})
export class PageLayoutComponent {
  @Input() title = ''

  constructor(public styleService: StyleService) { }
}
