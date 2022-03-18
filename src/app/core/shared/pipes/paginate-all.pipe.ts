import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
    name: 'paginateAll'
})

export class PaginateAllPipe implements PipeTransform {
    transform(products: Product[], page: number = 0): Product[] {
        return products.slice(page, page+9);
    }
}