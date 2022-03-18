import { Pipe, PipeTransform } from '@angular/core';
import { Servics } from '../models/service.model';

@Pipe({
    name: 'paginateservices'
})

export class PaginateServicesPipe implements PipeTransform {
    transform(services: Servics[], page: number = 0): Servics[] {
        if(!services){
            return services
        }
        return services.slice(page, page+5);
    }
}