import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@products/services/product-service';
import { ProductCard } from '@store-front/components/product-card/product-card';
import { map } from 'rxjs';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard],
  templateUrl: './gender-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class GenderPage {

  private activatedRoute = inject(ActivatedRoute);
  private productService = inject(ProductService);

  gender = toSignal(this.activatedRoute.params.pipe(
    map(({gender}) => gender)
  ))

  productsResource = rxResource({
    params: () => ({gender: this.gender()}),
    stream: ({params}) => {
      return this.productService.getProducts({gender: params.gender})
    }
  });
}
