import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
    name: 'paginate'
})

export class PaginatePipe implements PipeTransform {
    transform(products: Product[], page: number = 0): Product[] {
        if(!products)
        return products
        
        return products.slice(page, page+5);
    }
}