import { Pipe, type PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrl;
const noImage = 'assets/images/no-image.jpg';
@Pipe({
  name: 'productImagePipe',
})
export class ProductImagePipe implements PipeTransform {
  transform(value: null | string | string[]): string {

    if (!value || value === null) {
      return noImage;
    }

    switch (typeof value) {
      case 'object': {
        return value!.length > 0 ? `${baseUrl}/files/product/${value![0]}` : `${noImage}`
      }

      case 'string': {
        return value.length > 0 ? `${baseUrl}/files/product/${value}` : `${noImage}`
      }
    }
  }
}
