import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services';
import { ROUTES } from './sidebar-routes.config';
import { collapse } from 'src/app/helpers/animations/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [collapse]
})
export class SidebarComponent implements OnInit {
  public menuItems: object;
  public userData: any;

  constructor(private authService: AuthService) { this.menuItems = ROUTES; }

  ngOnInit() {
    this.userData = this.authService.getUserData();
    this.userData.name = this.userData.name ? this.userData.name.split(' ', 1) : '';

  }

  public logout() {
    this.authService.logout();
  }

}
