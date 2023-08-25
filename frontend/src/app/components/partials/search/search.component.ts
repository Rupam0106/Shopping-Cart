import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchTerm = '';
  searchResult: any;
  constructor(activatedRoute: ActivatedRoute, productService: ProductsService) {
    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) this.searchTerm = params['searchTerm'];
      productService
        .getAllProductBySearchTerm(params['searchTerm'])
        .subscribe((data: any) => {
          this.searchResult = data.products;
        });
    });
  }
}
