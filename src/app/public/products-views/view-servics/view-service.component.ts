import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Servics } from 'src/app/core/shared/models/service.model';
import { LoadScriptsService } from 'src/app/core/shared/services/load-scripts/load-scripts.service';
import { ServicsService } from 'src/app/core/shared/services/servics/servics.service';
import { createticketComponent } from './createTicket/createTicket.component';

@Component({
    selector: 'app-viewservice',
    templateUrl: './view-service.component.html',
    styleUrls:['./view-service.component.scss']

})

export class ViewserviceComponent implements OnInit {

    images = '';
    //imgURL = '/assets/noimage.png';
    multipleImages = [];
    imagenes: any = [];
    serviceID:string | any;
    currentService: Servics | any;

    constructor(private route:ActivatedRoute, private loadScript:LoadScriptsService, private servicsService: ServicsService) { 
        loadScript.loadS(["changeimg/change"]);
    }

    ngOnInit() { 
        this.serviceID = this.route.snapshot.paramMap.get('id');
        this.servicsService.getService(this.serviceID).subscribe(res => {
            this.currentService = res[0]
            const reader = new FileReader();
            reader.onload = (this.imagenes);
        })
    }


}
