import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class SwitchComponent {
    @Output() isOnChange = new EventEmitter<boolean>();
  isOn: boolean = false;

  toggleOn() {
    this.isOn = !this.isOn;
    this.isOnChange.emit(this.isOn);
  }
}
