import { Pipe, PipeTransform } from '@angular/core';
import { Servics } from 'src/app/core/shared/models/service.model';
import * as _ from 'underscore';
@Pipe({
    name: 'servicesbusinessbyDate'
})

export class ServicesbusinessbyDatePipe implements PipeTransform {
    transform(services: Servics[]): Servics[] {
      const outproducts = _.sortBy(services, function(service){ return service.registration_date; }).reverse();
      return outproducts.slice(0,12);
    }
}