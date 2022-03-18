import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/core/shared/models/product.model';
import * as _ from 'underscore';
@Pipe({
    name: 'productsbusinessbyDate'
})

export class ProductsbusinessbyDatePipe implements PipeTransform {
    transform(products: Product[]): Product[] {
      const outproducts = _.sortBy(products, function(product){ return product.registration_date; }).reverse();
      return outproducts.slice(0,12);
    }
}