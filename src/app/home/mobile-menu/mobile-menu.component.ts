import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  templateUrl: 'mobile-menu.component.html',
  imports: [RouterModule],
})
export class MobileMenuComponent {
  public showDrawer = false;

  constructor(private router: Router) {}

  public openOrders() {
    this.router.navigate(['orders']);
  }

  public openProducts() {
    this.router.navigate(['products', 'all']);
  }
}
