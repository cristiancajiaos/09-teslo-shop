import { Component, inject } from '@angular/core';
import { ProductService } from '@products/services/product-service';
import { ProductCard } from '@store-front/components/product-card/product-card';
// import { ProductCard } from '../../components/product-card/product-card';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard],
  templateUrl: './home-page.html',
})
export class HomePage {

  private productService = inject(ProductService);

  productsResource = rxResource({
    /*
    params: () => ({})
    */
    stream: () => {
      return this.productService.getProducts({});
    }
  });


}
