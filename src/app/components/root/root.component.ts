import { Router, NavigationStart, NavigationEnd, NavigationError, Event } from '@angular/router';
import { Component, OnInit, HostListener, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { showSidebar, collapse } from '../../helpers/animations/animations';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  animations: [showSidebar]
})

export class RootComponent implements OnInit {

  public windowSize: number = window.screen.width;
  public sidebarOpened = false;
  public navIsFixed;

  public showLoadingScreen: Observable<boolean>;

  constructor(private router: Router, private shareData: ShareDataService) {

    router.events.subscribe((event: Event) => {

      if (event instanceof NavigationStart) this.sidebarOpened = false;

    });

  }


  ngOnInit() {

    this.showLoadingScreen = this.shareData.loadingScreenEvent;
  }

  public openSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
  }

  @HostListener('window:resize', ['$event'])
  onresize() {
    this.windowSize = window.innerWidth;

    if (this.windowSize > 768) {
      this.sidebarOpened = true;
    } else if (this.windowSize <= 768) {
      this.sidebarOpened = false;
    }

  }





}
