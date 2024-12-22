import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'main-page',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  products: any[] = [];


  constructor(
    private translate: TranslateService,
    public dialog: MatDialog,
    private productService: ProductService
  ) {
    this.translate.setDefaultLang('ge');
    this.translate.use('ge');
    this.productService.setLanguage('ge');
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.productService.setLanguage(lang);
    this.loadProducts();
  }

  openDialog(product: any): void {
    const dialogRef = this.dialog.open(ProductDetailComponent, {
      width: '600px',
      height: '400px',
      data: product,
    });

    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close();
    });
  }

}

