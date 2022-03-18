import { Pipe, PipeTransform } from '@angular/core';
import { Servics } from 'src/app/core/shared/models/service.model';
import * as _ from 'underscore';
@Pipe({
  name: 'servicsorderBy',
})
export class ServicsorderByPipe implements PipeTransform {
  transform( services: Servics[], page: number = 0, order: string = '', category: string = '', search: string = ''): Servics[] {
    if(!services)
    return services
    if(search.length === null){
      //si tiene category entonces regresalos en el orden que se seleccione
      if (category.length != 0) {
        if (order == 'abc') {
          const filterservices = services.filter((service) => service.category.includes(category));
          const outservices = _.sortBy(filterservices, function(filterservice){ return filterservice.service_name.toLowerCase(); });
          return outservices.slice(page, page+9);
        }

        if (order == 'zyx') {
          const filterservices = services.filter((service) => service.category.includes(category));
          const outservices = _.sortBy(filterservices, function(filterservice){ return filterservice.service_name.toLowerCase(); }).reverse();
          return outservices.slice(page, page+9);
        }

        if (order == 'recent') {
          const filterservices = services.filter((service) => service.category.includes(category));
          const outservices = _.sortBy(filterservices, function(filterservice){ return filterservice.registration_date; }).reverse();
          return outservices.slice(page, page+9);
        }

        if (order == 'menorpr') {
          const filterservices = services.filter((service) => service.category.includes(category));
          filterservices.sort((a, b) => {
            let x = parseInt(a.minprice);
            let y = parseInt(b.minprice);
            if (x < y) {
              return -1;
            } else {
              return 1;
            }
          });
          return filterservices.slice(page, page + 9);
        }

        if (order == 'mayorpr') {
          const filterservices = services.filter((service) => service.category.includes(category));
          filterservices.sort((a, b) => {
            let x = parseInt(a.maxprice);
            let y = parseInt(b.maxprice);
            if (x > y) {
              return -1;
            } else {
              return 1;
            }
          });
          return filterservices.slice(page, page + 9);
        }
        //si no tiene order entonces regresalos en orden alfabetico por defecto
        const filterservices = services.filter((outprod) => outprod.category.includes(category));
        return filterservices.slice(page, page + 9);
      }

      //si no tiene category entonces regresalos en el orden que se seleccionado
      if (category.length === 0) {
        if (order == 'abc') {
          const outservices = _.sortBy(services, function (service) { return service.service_name.toLowerCase(); });
          return outservices.slice(page, page + 9);
        }

        if (order == 'zyx') {
          const outservices = _.sortBy(services, function (service) { return service.service_name.toLowerCase(); }).reverse();
          return outservices.slice(page, page + 9);
        }

        if (order == 'recent') {
          const outservices = _.sortBy(services, function (service) { return service.registration_date; }).reverse();
          return outservices.slice(page, page + 9);
        }

        if (order == 'menorpr') {
          services.sort((a, b) => {
            let x = parseInt(a.minprice);
            let y = parseInt(b.minprice);
            if (x < y) {
              return -1;
            } else {
              return 1;
            }
          });
          return services.slice(page, page + 9);
        }

        if (order == 'mayorpr') {
          services.sort((a, b) => {
            let x = parseInt(a.maxprice);
            let y = parseInt(b.maxprice);
            if (x > y) {
              return -1;
            } else {
              return 1;
            }
          });
          return services.slice(page, page + 9);
        }
        //si no tiene order entonces regresalos en orden alfabetico por defecto
        const outservices = _.sortBy(services, function (service) { return service.service_name.toLowerCase(); });
        return outservices.slice(page, page + 9);
      }
    }

    if(search.length  != null){
      //si tiene category entonces regresalos en el orden que se seleccione
      if (category.length != 0) {
        if (order == 'abc') {
          const filterservices = services.filter((service) => service.category.includes(category));
          const searchservices = filterservices.filter((filterservice) => filterservice.service_name.toLowerCase().includes(search));
          const outservices = _.sortBy(searchservices, function(searchservice){ return searchservice.service_name.toLowerCase(); });
          return outservices.slice(page, page + 9);
        }

        if (order == 'zyx') {
          const filterservices = services.filter((service) => service.category.includes(category));
          const searchservices = filterservices.filter((filterservice) => filterservice.service_name.toLowerCase().includes(search));
          const outservices = _.sortBy(searchservices, function(searchservice){ return searchservice.service_name.toLowerCase(); }).reverse();
          return outservices.slice(page, page + 9);
        }

        if (order == 'recent') {
          const filterservices = services.filter((service) => service.category.includes(category));
          const searchservices = filterservices.filter((filterservice) => filterservice.service_name.toLowerCase().includes(search));
          const outservices = _.sortBy(searchservices, function(searchservice){ return searchservice.registration_date; }).reverse();
          return outservices.slice(page, page + 9);
        }

        if (order == 'menorpr') {
          const filterservices = services.filter((service) => service.category.includes(category));
          const searchservices = filterservices.filter((filterservice) => filterservice.service_name.toLowerCase().includes(search));
          searchservices.sort((a, b) => {
            let x = parseInt(a.minprice);
            let y = parseInt(b.minprice);
            if (x < y) {
              return -1;
            } else {
              return 1;
            }
          });
          return searchservices.slice(page, page + 9);
        }

        if (order == 'mayorpr') {
          const filterservices = services.filter((service) => service.category.includes(category));
          const searchservices = filterservices.filter((filterservice) => filterservice.service_name.toLowerCase().includes(search));
          searchservices.sort((a, b) => {
            let x = parseInt(a.maxprice);
            let y = parseInt(b.maxprice);
            if (x > y) {
              return -1;
            } else {
              return 1;
            }
          });
          return searchservices.slice(page, page + 9);
        }
        //si no tiene order entonces regresalos en orden alfabetico por defecto
        const searchservices = services.filter((service) => service.service_name.toLowerCase().includes(search));
        const filterservices = searchservices.filter((searchservice) => searchservice.category.includes(category));
        return filterservices.slice(page, page + 9);
        ;
      }

      //si no tiene category entonces regresalos en el orden que se seleccionado
      if (category.length === 0) {
        if (order == 'abc') {
          const searchservices = services.filter((service) => service.service_name.toLowerCase().includes(search));
          const outservices = _.sortBy(searchservices, function (searchservice) { return searchservice.service_name.toLowerCase(); });
          return outservices.slice(page, page + 9);
        }

        if (order == 'zyx') {
          const searchservices = services.filter((service) => service.service_name.toLowerCase().includes(search));
          const outservices = _.sortBy(searchservices, function (searchservice) { return searchservice.service_name.toLowerCase(); }).reverse();
          return outservices.slice(page, page + 9);
        }

        if (order == 'recent') {
          const searchservices = services.filter((service) => service.service_name.toLowerCase().includes(search));
          const outservices = _.sortBy(searchservices, function (searchservice) { return searchservice.registration_date; }).reverse();
          return outservices.slice(page, page + 9);
        }

        if (order == 'menorpr') {
          const searchservices = services.filter((service) => service.service_name.toLowerCase().includes(search));
          searchservices.sort((a, b) => {
            let x = parseInt(a.minprice);
            let y = parseInt(b.minprice);
            if (x < y) {
              return -1;
            } else {
              return 1;
            }
          });
          return searchservices.slice(page, page + 9);
        }

        if (order == 'mayorpr') {
          const searchservices = services.filter((service) => service.service_name.toLowerCase().includes(search));
          searchservices.sort((a, b) => {
            let x = parseInt(a.maxprice);
            let y = parseInt(b.maxprice);
            if (x > y) {
              return -1;
            } else {
              return 1;
            }
          });
          return searchservices.slice(page, page + 9);
        }
        //si no tiene order entonces regresalos en orden alfabetico por defecto
        const searchservices = services.filter((service) => service.service_name.toLowerCase().includes(search));
        const outservices = _.sortBy(searchservices, function (searchservice) { return searchservice.service_name.toLowerCase(); });
        return outservices.slice(page, page + 9);
      }
    }

    //si no tiene order ni category ni search entonces regresalos en orden alfabetico por defecto
    const outservices = _.sortBy(services, function (service) { return service.service_name.toLowerCase(); });
    return outservices.slice(page, page + 9);

  }
}
