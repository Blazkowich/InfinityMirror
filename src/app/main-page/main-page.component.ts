import { Component, Renderer2 } from '@angular/core';
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
  isBlackTheme: boolean = false;


  constructor(
    private translate: TranslateService,
    public dialog: MatDialog,
    private productService: ProductService,
    private renderer: Renderer2
  ) {
    this.translate.setDefaultLang('ge');
    this.translate.use('ge');
    this.productService.setLanguage('ge');
  }

  ngOnInit() {
    this.loadProducts();
    this.applyColorTheme();
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
      height: 'auto',
      data: {product, productId: product.id},
    });

    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close();
    });
  }

  changeColor() {
    this.isBlackTheme = !this.isBlackTheme;
    this.applyColorTheme();
  }

  applyColorTheme() {
    const theme = this.isBlackTheme ? 'black' : 'white';
    this.productService.setColor(theme);

    if (theme === 'black') {
      this.renderer.setStyle(document.body, 'background-color', 'black');
      this.renderer.setStyle(document.body, 'color', 'white');
    } else {
      this.renderer.setStyle(document.body, 'background-color', 'white');
      this.renderer.setStyle(document.body, 'color', 'black');
    }
  }
}

