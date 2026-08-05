import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@products/services/product-service';
import { Pagination } from '@shared/components/pagination/pagination';
import { ProductCard } from '@store-front/components/product-card/product-card';
import { map } from 'rxjs';
import { PaginationService } from '../../../shared/components/pagination/pagination-service';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard, Pagination],
  templateUrl: './gender-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class GenderPage {

  private activatedRoute = inject(ActivatedRoute);
  private productService = inject(ProductService);
  public paginationService = inject(PaginationService);

  gender = toSignal(this.activatedRoute.params.pipe(
    map(({gender}) => gender)
  ))

  productsResource = rxResource({
    params: () => ({
      gender: this.gender(),
      page: this.paginationService.currentPage() - 1
    }),
    stream: ({params}) => {
      return this.productService.getProducts({
        gender: params.gender,
        offset: params.page * 9
      })
    }
  });
}
