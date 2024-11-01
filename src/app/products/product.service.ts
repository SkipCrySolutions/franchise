import { HttpClient, HttpParams } from '@angular/common/http';
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

  public applyProductFilter(filter: any): Observable<any> {
    const storeId = 'CHNPER1';
    const parentStoreId = 'CHNPER1';
    let params = new HttpParams();
    params = params.set('store', storeId);
    params = params.set('parentStore', parentStoreId);
    const url = `/api/products/filter?${params.toString()}`;
    console.log('filter ===>>>', filter);
    return this.http.post(url, filter);
  }

  public getCategories() {
    return [
      { name: 'Activity Sheets & Binders', code: 'activitySheets' },
      { name: 'Activity Toys', code: 'activityToys' },
      { name: 'Board Books', code: 'boardBooks' },
      { name: 'Cards & Boards', code: 'cardsBoards' },
      { name: 'Cars, Tracks & Trains', code: 'carsTracks' },
      { name: 'Jigsaw Puzzles', code: 'jigsawPuzzles' },
      { name: 'Junior Puzzles', code: 'juniorPuzzles' },
      { name: 'Legos & Blocks', code: 'legosBlocks' },
      { name: 'Magnetic Toys', code: 'magneticToys' },
      { name: 'Montessori Books', code: 'montessoriBooks' },
      { name: 'Montessori Toys', code: 'montessoriToys' },
      { name: 'Musical Books', code: 'musicalBooks' },
      { name: 'Musical Toys', code: 'musicalToys' },
      { name: 'Outdoor Toys', code: 'outdoorToys' },
      { name: 'Peg Boards', code: 'pegBoards' },
      { name: 'Pretend & Play toys', code: 'pretendToys' },
      { name: 'Pull Along Toys', code: 'pullToys' },
      { name: 'Push, Pull & Slide books', code: 'pushBooks' },
      { name: 'Sorting toys', code: 'sortingToys' },
      { name: 'Stacking toys', code: 'stackingToys' },
      { name: 'STEM Books', code: 'stemBooks' },
      { name: 'STEM toys', code: 'stemToys' },
      { name: 'Story Books', code: 'storyBooks' },
      { name: 'Think Books', code: 'thinkBooks' },
      { name: 'Touch & Feel Books', code: 'touchBooks' },
    ];
  }
}
