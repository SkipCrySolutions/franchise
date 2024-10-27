import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public isMobileScreen = signal(false);

  constructor() {}
}
