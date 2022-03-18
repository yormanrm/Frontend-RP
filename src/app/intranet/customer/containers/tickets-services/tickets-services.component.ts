import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/core/shared/models/ticket.model';
import { ServicsService } from 'src/app/core/shared/services/servics/servics.service';

@Component({
    selector: 'app-ticketservice',
    templateUrl: './tickets-services.component.html',
    styleUrls: ['./tickets-services.component.scss']
})

export class TicketsserviceComponent implements OnInit {

    constructor(private servicsServices: ServicsService) { }

    tickets : Ticket | any;

    ngOnInit() { 
        this.loadTickets()
    }

    loadTickets(){
        this.servicsServices.getTicketsCustomer().subscribe( tickets => { this.tickets = tickets })
    }
}