import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [RouterModule, MobileMenuComponent],
})
export class HeaderComponent implements OnInit {
  constructor(public appService: AppService) {}

  public ngOnInit() {
    this.appService.isMobileScreen.update(() =>
      window.innerWidth < 768 ? true : false
    );
  }
}
