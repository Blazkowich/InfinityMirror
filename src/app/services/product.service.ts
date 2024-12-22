import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, switchMap, map } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsByLanguage } from '../models/prodictsByLanguage.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = '../../assets/products.json';
  private currentLang = new BehaviorSubject<string>('en');

  constructor(private http: HttpClient) { }

  setLanguage(lang: string) {
    this.currentLang.next(lang);
  }

  getProducts(): Observable<Product[]> {
    return this.currentLang.asObservable().pipe(
      switchMap((lang) =>
        this.http.get<ProductsByLanguage>(this.productsUrl).pipe(
          map((products) => {
            return products[lang] || [];
          })
        )
      )
    );
  }

  getProduct(productId: string): Observable<Product | undefined> {
    return this.getProducts().pipe(
      map((products) => {
        const product = products.find((product) => product.id === productId);
        return product;
      })
    );
  }
}
