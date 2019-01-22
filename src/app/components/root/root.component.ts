import { Router, NavigationStart, Event, ActivatedRoute } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { showSidebar, fade } from '../../helpers/animations/animations';
import { ShareDataService } from 'src/app/services';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  animations: [showSidebar, fade]
})

export class RootComponent implements OnInit {

  public pageTitle: string;
  public showLoadingScreen: Observable<boolean>;
  public windowSize = window.screen.width;
  public sidebarOpened = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private shareData: ShareDataService) {

    this.router.events.subscribe((event: Event) => {
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

  @HostListener('window:resize', ['$event'])
  onresize() {
    this.windowSize = window.innerWidth;
    if (this.windowSize > 768) {
      this.sidebarOpened = true;
    } else if (this.windowSize <= 768) {
      this.sidebarOpened = false;
    }
  }

  public openSidebar(): void {
    this.sidebarOpened = !this.sidebarOpened;
  }





}
