import { ChangeDetectionStrategy, Component, input, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Product } from '@products/interfaces/product.interface';
import { ProductCarousel } from '@store-front/components/product-carousel/product-carousel';
import { FormUtils } from '@utils/form-utils';

@Component({
  selector: 'product-details',
  imports: [ProductCarousel, ReactiveFormsModule],
  templateUrl: './product-details.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ProductDetails implements OnInit {

  private fb = inject(FormBuilder);

  product = input.required<Product>();

  productForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    slug: ['', [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [[]],
    tags: [''],
    gender: ['men', [Validators.required, Validators.pattern(/men|women|kid|unisex/)]],
  });

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  ngOnInit(): void {
    this.setFormValue(this.product());
  }

  setFormValue(formLike: Partial<Product>) {
    // this.productForm.reset(this.product() as any);
    this.productForm.patchValue(formLike as any);
    this.productForm.patchValue({tags: formLike.tags?.join(',')})
  }

  onSubmit(): void {
    console.log(this.productForm.value);
  }
}
