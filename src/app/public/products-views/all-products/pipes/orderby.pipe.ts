import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/core/shared/models/product.model';
import * as _ from 'underscore';
import { filter } from 'underscore';
@Pipe({
  name: 'orderBy',
})
export class orderByPipe implements PipeTransform {
  transform( products: Product[], page: number = 0, order: string = '', category: string = '', search: string = ''): Product[] {
    if(!products)
    return products


    if(search.length === null){
      //si tiene category entonces regresalos en el orden que se seleccione
      if (category.length != 0) {
        if (order == 'abc') {
          const filterproducts = products.filter((product) => product.category.includes(category));
          const outproducts = _.sortBy(filterproducts, function(filterproduct){ return filterproduct.product_name.toLowerCase(); });
          return outproducts.slice(page, page+9);
        }

        if (order == 'zyx') {
          const filterproducts = products.filter((product) => product.category.includes(category));
          const outproducts = _.sortBy(filterproducts, function(filterproduct){ return filterproduct.product_name.toLowerCase(); }).reverse();
          return outproducts.slice(page, page+9);
        }

        if (order == 'recent') {
          const filterproducts = products.filter((product) => product.category.includes(category));
          const outproducts = _.sortBy(filterproducts, function(filterproduct){ return filterproduct.registration_date; }).reverse();
          return outproducts.slice(page, page+9);
        }

        if (order == 'menorpr') {
          const filterproducts = products.filter((product) => product.category.includes(category));
          filterproducts.sort((a, b) => {
            let x = parseInt(a.price);
            let y = parseInt(b.price);
            if (x < y) {
              return -1;
            } else {
              return 1;
            }
          });
          return filterproducts.slice(page, page + 9);
        }

        if (order == 'mayorpr') {
          const filterproducts = products.filter((product) => product.category.includes(category));
          filterproducts.sort((a, b) => {
            let x = parseInt(a.price);
            let y = parseInt(b.price);
            if (x > y) {
              return -1;
            } else {
              return 1;
            }
          });
          return filterproducts.slice(page, page + 9);
        }
        //si no tiene order entonces regresalos en orden alfabetico por defecto
        const filterproducts = products.filter((outprod) => outprod.category.includes(category));
        return filterproducts.slice(page, page + 9);
      }

      //si no tiene category entonces regresalos en el orden que se seleccionado
      if (category.length === 0) {
        if (order == 'abc') {
          const outproducts = _.sortBy(products, function (product) { return product.product_name.toLowerCase(); });
          return outproducts.slice(page, page + 9);
        }

        if (order == 'zyx') {
          const outproducts = _.sortBy(products, function (product) { return product.product_name.toLowerCase(); }).reverse();
          return outproducts.slice(page, page + 9);
        }

        if (order == 'recent') {
          const outproducts = _.sortBy(products, function (product) { return product.registration_date; }).reverse();
          return outproducts.slice(page, page + 9);
        }

        if (order == 'menorpr') {
          products.sort((a, b) => {
            let x = parseInt(a.price);
            let y = parseInt(b.price);
            if (x < y) {
              return -1;
            } else {
              return 1;
            }
          });
          return products.slice(page, page + 9);
        }

        if (order == 'mayorpr') {
          products.sort((a, b) => {
            let x = parseInt(a.price);
            let y = parseInt(b.price);
            if (x > y) {
              return -1;
            } else {
              return 1;
            }
          });
          return products.slice(page, page + 9);
        }
        //si no tiene order entonces regresalos en orden alfabetico por defecto
        const outproducts = _.sortBy(products, function (product) { return product.product_name.toLowerCase(); });
        return outproducts.slice(page, page + 9);
      }
    }

    if(search.length  != null){
      //si tiene category entonces regresalos en el orden que se seleccione
      if (category.length != 0) {
        if (order == 'abc') {
          const filterproducts = products.filter((product) => product.category.includes(category));
          const searchproducts = filterproducts.filter((filterproduct) => filterproduct.product_name.toLowerCase().includes(search));
          const outproducts = _.sortBy(searchproducts, function(searchproduct){ return searchproduct.product_name.toLowerCase(); });
          return outproducts.slice(page, page + 9);
        }

        if (order == 'zyx') {
          const filterproducts = products.filter((product) => product.category.includes(category));
          const searchproducts = filterproducts.filter((filterproduct) => filterproduct.product_name.toLowerCase().includes(search));
          const outproducts = _.sortBy(searchproducts, function(searchproduct){ return searchproduct.product_name.toLowerCase(); }).reverse();
          return outproducts.slice(page, page + 9);
        }

        if (order == 'recent') {
          const filterproducts = products.filter((product) => product.category.includes(category));
          const searchproducts = filterproducts.filter((filterproduct) => filterproduct.product_name.toLowerCase().includes(search));
          const outproducts = _.sortBy(searchproducts, function(searchproduct){ return searchproduct.registration_date; }).reverse();
          return outproducts.slice(page, page + 9);
        }

        if (order == 'menorpr') {
          const filterproducts = products.filter((product) => product.category.includes(category));
          const searchproducts = filterproducts.filter((filterproduct) => filterproduct.product_name.toLowerCase().includes(search));
          searchproducts.sort((a, b) => {
            let x = parseInt(a.price);
            let y = parseInt(b.price);
            if (x < y) {
              return -1;
            } else {
              return 1;
            }
          });
          return searchproducts.slice(page, page + 9);
        }

        if (order == 'mayorpr') {
          const filterproducts = products.filter((product) => product.category.includes(category));
          const searchproducts = filterproducts.filter((filterproduct) => filterproduct.product_name.toLowerCase().includes(search));
          searchproducts.sort((a, b) => {
            let x = parseInt(a.price);
            let y = parseInt(b.price);
            if (x > y) {
              return -1;
            } else {
              return 1;
            }
          });
          return searchproducts.slice(page, page + 9);
        }
        //si no tiene order entonces regresalos en orden alfabetico por defecto
        const searchproducts = products.filter((product) => product.product_name.toLowerCase().includes(search));
        const filterproducts = searchproducts.filter((searchproduct) => searchproduct.category.includes(category));
        return filterproducts.slice(page, page + 9);
        ;
      }

      //si no tiene category entonces regresalos en el orden que se seleccionado
      if (category.length === 0) {
        if (order == 'abc') {
          const searchproducts = products.filter((product) => product.product_name.toLowerCase().includes(search));
          const outproducts = _.sortBy(searchproducts, function (searchproduct) { return searchproduct.product_name.toLowerCase(); });
          return outproducts.slice(page, page + 9);
        }

        if (order == 'zyx') {
          const searchproducts = products.filter((product) => product.product_name.toLowerCase().includes(search));
          const outproducts = _.sortBy(searchproducts, function (searchproduct) { return searchproduct.product_name.toLowerCase(); }).reverse();
          return outproducts.slice(page, page + 9);
        }

        if (order == 'recent') {
          const searchproducts = products.filter((product) => product.product_name.toLowerCase().includes(search));
          const outproducts = _.sortBy(searchproducts, function (searchproduct) { return searchproduct.registration_date; }).reverse();
          return outproducts.slice(page, page + 9);
        }

        if (order == 'menorpr') {
          const searchproducts = products.filter((product) => product.product_name.toLowerCase().includes(search));
          searchproducts.sort((a, b) => {
            let x = parseInt(a.price);
            let y = parseInt(b.price);
            if (x < y) {
              return -1;
            } else {
              return 1;
            }
          });
          return searchproducts.slice(page, page + 9);
        }

        if (order == 'mayorpr') {
          const searchproducts = products.filter((product) => product.product_name.toLowerCase().includes(search));
          searchproducts.sort((a, b) => {
            let x = parseInt(a.price);
            let y = parseInt(b.price);
            if (x > y) {
              return -1;
            } else {
              return 1;
            }
          });
          return searchproducts.slice(page, page + 9);
        }
        //si no tiene order entonces regresalos en orden alfabetico por defecto
        const searchproducts = products.filter((product) => product.product_name.toLowerCase().includes(search));
        const outproducts = _.sortBy(searchproducts, function (searchproduct) { return searchproduct.product_name.toLowerCase(); });
        return outproducts.slice(page, page + 9);
      }
    }

    //si no tiene order ni category ni search entonces regresalos en orden alfabetico por defecto
    const outproducts = _.sortBy(products, function (product) { return product.product_name.toLowerCase(); });
    return outproducts.slice(page, page + 9);

  }
}
