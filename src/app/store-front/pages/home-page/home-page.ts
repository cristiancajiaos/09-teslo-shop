import { Component, inject } from '@angular/core';
import { ProductService } from '@products/services/product-service';
import { ProductCard } from '@store-front/components/product-card/product-card';
// import { ProductCard } from '../../components/product-card/product-card';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { Pagination } from '@shared/components/pagination/pagination';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.html',
})
export class HomePage {

  private activatedRoute = inject(ActivatedRoute);
  private productService = inject(ProductService);

  currentPage = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map(params => (params.get('page') ? +params.get('page')! : 1)),
      map(page => isNaN(page) ? 1 : page)
    ),
    {
      initialValue: 1
    }
  );

  productsResource = rxResource({
    params: () => ({page: this.currentPage() - 1}),
    stream: ({params}) => {
      return this.productService.getProducts({
        offset: params.page * 9
      });
    }
  });


}
