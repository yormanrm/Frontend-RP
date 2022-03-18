import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/core/shared/models/product.model';
import * as _ from 'underscore';
@Pipe({
    name: 'byName'
})

export class byNamePipe implements PipeTransform {
    transform(products: Product[]): Product[] {
      const outproducts = _.sortBy(products, function(product){ return product.product_name.toLowerCase(); });
      return outproducts.slice(0,7);
    }
}