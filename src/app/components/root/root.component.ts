import { Router, NavigationStart, Event, ActivatedRoute } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { showSidebar } from '../../helpers/animations/animations';
import { ShareDataService } from 'src/app/services';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  animations: [showSidebar]
})

export class RootComponent implements OnInit {

  public windowSize: number = window.screen.width;
  public sidebarOpened = false;

  public showLoadingScreen: Observable<boolean>;

  public pageTitle: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private shareData: ShareDataService) {

    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) this.sidebarOpened = false;

      this.activatedRoute.children[0].data
        .subscribe(
          res => {
          this.pageTitle = res.title;
        });
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
