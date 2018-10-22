import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { MediaMatcher } from '../../../../node_modules/@angular/cdk/layout';
import { MatSidenav } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @ViewChild(MatSidenav)
  sidebar: MatSidenav;
  public sidebarOpen: boolean;
  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: (e: MediaQueryList) => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = e => {
      this.setSidebarOpen(!e.matches);
      changeDetectorRef.detectChanges();
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.setSidebarOpen(!this.mobileQuery.matches);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  public toggleSidebar() {
    this.setSidebarOpen(!this.sidebarOpen);
  }

  private setSidebarOpen(param: boolean) {
    this.sidebarOpen = param;
    console.log(this.sidebarOpen);
    if (this.sidebarOpen) {
      this.sidebar.open();
    } else {
      this.sidebar.close();
    }
  }

}
