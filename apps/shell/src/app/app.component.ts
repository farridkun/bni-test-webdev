import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'bni-pretest-web-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shell';
  isDashboardActive = false;
  isProductsActive = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isDashboardActive = this.router.url === '/';
      }
      if (event instanceof NavigationEnd) {
        this.isProductsActive = this.router.url === '/products';
      }
    });
  }
}
