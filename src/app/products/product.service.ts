import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {
    this.http.get(`/api/productQty`).subscribe();
  }

  public getProducts(value?: boolean): Observable<any> {
    const storeId = 'CHNPER1';
    const parentStoreId = 'CHNPER1';
    const isAvailable = !!value;
    const url = `/api/products?store=${storeId}&parentStore=${parentStoreId}&isAvailable=${isAvailable}`;
    return this.http.get(url);
  }

  public getProductsByAge(ageType: string): Observable<any> {
    const url = `/api/products/byAge?ageType=${ageType}`;
    return this.http.get(url);
  }

  public getProductByCode(
    productId: string,
    storeId: string,
    productCode: string
  ): Observable<any> {
    console.log('product => ', productId);
    const url = `/api/products/get/store/${storeId}/${productId}/${productCode}`;
    return this.http.get(url);
  }

  public addOrEditProduct(product: any, edit?: boolean) {
    const editorAddKey = edit ? 'edit/' + product._id : 'add';
    const url = `/api/products/${editorAddKey}`;
    console.log('url => ', url);
    return edit ? this.http.put(url, product) : this.http.post(url, product);
  }
}
