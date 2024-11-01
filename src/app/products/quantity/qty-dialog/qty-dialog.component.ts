import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-quantity-dialog',
  templateUrl: './qty-dialog.component.html',
  standalone: true,
  imports: [FormsModule],
})
export class ProductQuantityDialogComponent {
  @Input() productQuantity: any; // Adjust the type according to your model
  @Output() close = new EventEmitter<void>();

  onSubmit(form: any) {
    // Handle form submission
    console.log('Form submitted:', this.productQuantity);
    this.close.emit();
  }
}
