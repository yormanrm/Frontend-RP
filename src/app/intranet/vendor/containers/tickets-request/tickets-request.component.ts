import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/core/shared/models/ticket.model';
import { ServicsService } from 'src/app/core/shared/services/servics/servics.service';

@Component({
    selector: 'app-ticketrequest',
    templateUrl: './tickets-request.component.html',
    styleUrls: ['./tickets-request.component.scss']
})

export class TicketsrequestComponent implements OnInit {
    constructor(private servicsServices: ServicsService) { }

    ticketsVendor : Ticket | any;
    ticketsCustomer : Ticket | any;

    ngOnInit() { 
        this.loadTicketsCustomer();
        this.loadTicketsVendor();
    }

    loadTicketsCustomer(){
        this.servicsServices.getTicketsCustomerRequest().subscribe( tickets => { this.ticketsCustomer = tickets })
    }
    loadTicketsVendor(){
        this.servicsServices.getTicketsVendorRequest().subscribe( tickets => { this.ticketsVendor = tickets })
    }
}