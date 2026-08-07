import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ProductTable } from '../../components/product-table/product-table';
import { ProductService } from '@products/services/product-service';
import { PaginationService } from '@shared/components/pagination/pagination-service';
import { Pagination } from '@shared/components/pagination/pagination';
import { rxResource } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTable, Pagination, RouterLink],
  templateUrl: './products-admin-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ProductsAdminPage {

  private productService = inject(ProductService);
  public paginationService = inject(PaginationService);

  productsPerPage = signal(10);

  productsResource = rxResource({
    params: () => ({
      page: this.paginationService.currentPage() - 1,
      limit: this.productsPerPage()
    }),
    stream: ({params}) => {
      return this.productService.getProducts({
        offset: params.page * 9,
        limit: params.limit
      })
    }
  })

  changeProductsPerPage(value: string): void {
    this.productsPerPage.set(parseInt(value));
    this.productsResource.reload();
  }
}
