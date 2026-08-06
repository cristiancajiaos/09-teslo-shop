import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '@products/interfaces/product.interface';
import { ProductCarousel } from '@store-front/components/product-carousel/product-carousel';

@Component({
  selector: 'product-details',
  imports: [ProductCarousel],
  templateUrl: './product-details.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ProductDetails {

  product = input.required<Product>();

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
}
