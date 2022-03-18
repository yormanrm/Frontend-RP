import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/app/core/shared/models/ticket.model';
import { ServicsService } from 'src/app/core/shared/services/servics/servics.service';


interface Category {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-modalticketvendor',
    templateUrl: './modal-ticketvendor.component.html',
    styleUrls: ['./modal-ticketvendor.component.scss']
})


export class ViewTicketRequestVendorComponent implements OnInit {
    
    constructor(private route: ActivatedRoute, private servicsService: ServicsService) { }

    ticketID: string | any;
    ticket: Ticket | any;

    ngOnInit() {    
        this.ticketID = this.route.snapshot.paramMap.get('id');
        this.servicsService.getTicketsVendorInfo(this.ticketID).subscribe(res => this.ticket = res[0]);
    }

}