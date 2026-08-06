import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductTable } from '../../components/product-table/product-table';
import { ProductService } from '@products/services/product-service';
import { PaginationService } from '@shared/components/pagination/pagination-service';
import { Pagination } from '@shared/components/pagination/pagination';
import { rxResource } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTable, Pagination],
  templateUrl: './products-admin-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ProductsAdminPage {

  private productService = inject(ProductService);
  public paginationService = inject(PaginationService);

  productsResource = rxResource({
    params: () => ({page: this.paginationService.currentPage() - 1}),
    stream: ({params}) => {
      return this.productService.getProducts({
        offset: params.page * 9
      })
    }
  })
}
