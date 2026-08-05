import { Component, inject } from '@angular/core';
import { ProductService } from '@products/services/product-service';
import { ProductCard } from '@store-front/components/product-card/product-card';
import { rxResource } from '@angular/core/rxjs-interop';
import { Pagination } from '@shared/components/pagination/pagination';
import { PaginationService } from '@shared/components/pagination/pagination-service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.html',
})
export class HomePage {

  private productService = inject(ProductService);
  public paginationService = inject(PaginationService);

  productsResource = rxResource({
    params: () => ({page: this.paginationService.currentPage() - 1}),
    stream: ({params}) => {
      return this.productService.getProducts({
        offset: params.page * 9
      });
    }
  });


}
