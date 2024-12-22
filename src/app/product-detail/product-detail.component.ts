import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product: any = {}; // Initialize product to an empty object
  images: string[] = [];  // Array to hold images

  constructor(
    public dialogRef: MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    this.productService.getProduct(this.data.productId).subscribe((data) => {
      if (data) {
        this.product = data;
        this.images = this.product.image ? [this.product.image] : [];
      } else {
        console.error('Product not found');
        this.product = { title: 'Product not found', description: 'The requested product could not be found.' };
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
