import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, switchMap } from 'rxjs';

interface Product {
  name: string;
  image: string;
  story: string;
  title: string;
  description: string;
}

interface ProductsByLanguage {
  [key: string]: Product[];
}

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
      switchMap(lang => this.http.get<ProductsByLanguage>(this.productsUrl)),
      switchMap(products => {
        const lang = this.currentLang.value;
        return of(products[lang] || []);
      })
    );
  }
}
