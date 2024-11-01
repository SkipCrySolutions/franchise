import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { ProductComponent } from './product/product.component';
import { ProductService } from './product.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppLoaderComponent } from '../loader/loader.component';
import { SwitchComponent } from '../components/switch/switch.component';
import { ProductsFilterComponent } from './filter/products-filter.component';
import { Product } from './product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: 'products.component.html',
  imports: [
    CommonModule,
    ButtonModule,
    DataViewModule,
    ProductComponent,
    FormsModule,
    AppLoaderComponent,
    SwitchComponent,
    ProductsFilterComponent,
  ],
})
export class ProductsComponent {
  @Input()
  public products: any = [];

  public copyProducts = [];

  public layout: 'grid' | 'list' = 'list';

  searchQuery: string = '';

  public selectedTab = 'all';

  public loading = true;

  public inputFilter = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.getProducts();
    this.route.params.subscribe((params) => {
      console.log('Route params:', params);
      if (params['filter']) {
        this.routerHandler(params);
      } else {
        this.getProducts();
      }
    });
  }

  public performSearch(): void {
    console.log(this.searchQuery);
    if (this.searchQuery.length >= 2) {
      // Perform search logic here, e.g., filtering products based on searchQuery
      this.products = this.copyProducts.filter((product: any) => {
        // console.log('product => ', product);
        const searchIncluded = product.SearchKey.toLowerCase().includes(
          this.searchQuery.toLowerCase()
        );
        console.log('searchIncluded => ', searchIncluded);
        if (searchIncluded) return product;
      });
      console.log('products +> ', this.products);
    }
  }

  public clearSearch() {
    console.log('before products => ', this.products);
    this.searchQuery = '';
    this.products = this.copyProducts;
    console.log('products after clear filter => ', this.products);
  }

  public addProduct() {
    this.router.navigate(['product', 'form', 'new', 'CHNPER1']);
  }

  public selectTab(tab: string) {
    this.selectedTab = tab;
    if (tab === 'franchise') {
      this.products = this.copyProducts.filter(
        (product: any) => product.Franchise
      );
      console.log('franchise products => ', this.products);
    } else {
      this.products = this.copyProducts;
    }
  }

  private getProducts(value?: boolean): void {
    this.productService.getProducts(value).subscribe(
      (resp: any) => {
        this.products = resp;
        this.copyProducts = this.products;
        this.loading = false;
        console.log('products => ', this.products);
      },
      () => {
        this.loading = true;
      }
    );
  }

  public onChange(value: boolean) {
    console.log('value => ', value);
    this.getProducts(value);
  }

  private routerHandler(params: Params): void {
    // filter all
    // filter age
    // filter category
    // filter price
    // filter search
    console.log('params => ', params, params['filter']);
    if (params['filter'] === 'all') {
      this.getProducts();
    } else if (
      params['filter'] === 'preschool' ||
      params['filter'] === 'playschool' ||
      params['filter'] === 'primaryschool'
    ) {
      this.inputFilter = params['filter'];
      this.productService
        .applyProductFilter({ age: [params['filter']] })
        .subscribe((products: Product[]) => {
          this.products = products;
          this.loading = false;
        });
    } else if (
      !!this.productService
        .getCategories()
        .find((category) => category.code === params['filter'])
    ) {
      this.inputFilter = params['filter'];
      this.productService
        .applyProductFilter({ category: [params['filter']] })
        .subscribe((products: Product[]) => {
          this.products = products;
          this.loading = false;
        });
    } else if (
      params['filter'] === 'copper' ||
      params['filter'] === 'silver' ||
      params['filter'] === 'gold' ||
      params['filter'] === 'platinum' ||
      params['filter'] === 'platinumbig'
    ) {
      this.inputFilter = params['filter'];
      let input = '';
      if (params['filter'] === 'copper') {
        input = '0-100';
      } else if (params['filter'] === 'silver') {
        input = '100-200';
      } else if (params['filter'] === 'gold') {
        input = '200-300';
      } else if (params['filter'] === 'platinum') {
        input = '300-400';
      } else if (params['filter'] === 'platinumbig') {
        input = '400';
      }
      console.log('input => ', input);
      this.productService
        .applyProductFilter({ price: [input] })
        .subscribe((products: Product[]) => {
          this.products = products;
          this.loading = false;
        });
    } else {
      this.productService
        .applyProductFilter({ searchKey: [params['filter']] })
        .subscribe((products: Product[]) => {
          this.products = products;
          this.loading = false;
        });
    }
  }
}
