import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookiesTokenService } from '../cookies-token/cookiestoken.service';


@Injectable({providedIn: 'root'})
export class ServicsService {

    constructor(private http: HttpClient, private cookietoken:CookiesTokenService) { }
    url = 'http://localhost:3000';
    insertService(service:any): Observable<any>{ 
        return this.http.post(`http://localhost/Backend_RP/api php/routes-servics/insertServics.php`,JSON.stringify(service));
    }
    getAllServices(): Observable<any>{ 
        return this.http.get(`http://localhost/Backend_RP/api php/routes-servics/getServicsGeneral.php`);
    }
    getAllServicesOfVendor(): Observable<any>{ 
        const vendor_id = this.cookietoken.getUser().vend;
        return this.http.get(`http://localhost/Backend_RP/api php/routes-servics/getServicsVendor.php?id=`+ vendor_id);
    }
    getAllServicesOfBusiness(vendor_id: string): Observable<any>{ 
        return this.http.get(`http://localhost/Backend_RP/api php/routes-servics/getServicsVendor.php?id=`+ vendor_id);
    }
    getService(service_id:string): Observable<any>{ 
        return this.http.get(`http://localhost/Backend_RP/api php/routes-servics/getServicsGeneral.php?id=`+ service_id);
    }
    updateService(service:any): Observable<any>{
        return this.http.put(`http://localhost/Backend_RP/api php/routes-servics/updateServics.php`, JSON.stringify(service));
    }
    deleteService(service_id:string): Observable<any>{ 
        return this.http.delete(`http://localhost/Backend_RP/api php/routes-servics/delete.php?id=`+service_id);
    }


    createTicketCustomer(ticket:any): Observable<any>{ 
        return this.http.post(`http://localhost/Backend_RP/api php/routes-ticketsCustomer/createTicketCustomer.php`,JSON.stringify(ticket));
    }
    createTicketVendor(ticket:any): Observable<any>{ 
        return this.http.post(`http://localhost/Backend_RP/api php/routes-ticketsVendor/createTicketVendor.php`,JSON.stringify(ticket));
    }


    getTicketsCustomer(): Observable<any>{ 
        const cust_id = this.cookietoken.getUser().cust;
        return this.http.get(`http://localhost/Backend_RP/api php/routes-ticketsCustomer/getTicketsCustomer.php?id=`+ cust_id);
    }
    getTicketCustomer(ticket_id:string): Observable<any>{ 
        return this.http.get(`http://localhost/Backend_RP/api php/routes-ticketsCustomer/getTicketInfo.php?id=`+ ticket_id);
    }


    getTicketsVendor(): Observable<any>{ 
        const vendor_id = this.cookietoken.getUser().vend;
        return this.http.get(`http://localhost/Backend_RP/api php/routes-ticketsVendor/getTicketsVendor.php?id=`+ vendor_id);
    }
    getTicketVendor(ticket_id:string): Observable<any>{ 
        return this.http.get(`http://localhost/Backend_RP/api php/routes-ticketsVendor/getTicketInfo.php?id=`+ ticket_id);
    }
    getTicketsCustomerRequest(): Observable<any>{ 
        const vendor_id = this.cookietoken.getUser().vend;
        return this.http.get(`http://localhost/Backend_RP/api php/routes-ticketsVendor/getTicketsCustomerRequest.php?id=`+ vendor_id);
    }
    getTicketsVendorRequest(): Observable<any>{ 
        const vendor_id = this.cookietoken.getUser().vend;
        return this.http.get(`http://localhost/Backend_RP/api php/routes-ticketsVendor/getTicketsVendorRequest.php?id=`+ vendor_id);
    }
    getTicketsCustomerInfo(ticket_id:string): Observable<any>{ 
        return this.http.get(`http://localhost/Backend_RP/api php/routes-ticketsVendor/getTicketCustomerInfo.php?id=`+ ticket_id);
    }
    getTicketsVendorInfo(ticket_id:string): Observable<any>{ 
        return this.http.get(`http://localhost/Backend_RP/api php/routes-ticketsVendor/getTicketVendorInfo.php?id=`+ ticket_id);
    }


    getUltimo(vendor_id:string):Observable<any>{
        return this.http.get(this.url +'/servicioimagen/'+vendor_id);
    }
}