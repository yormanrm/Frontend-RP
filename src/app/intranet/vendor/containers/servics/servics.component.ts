import { Component, OnInit } from '@angular/core';
import { Servics } from 'src/app/core/shared/models/service.model';
import { ServicsService } from 'src/app/core/shared/services/servics/servics.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-servics',
    templateUrl: './servics.component.html',
    styleUrls: ['./servics.component.scss']
})

export class ServicsComponent implements OnInit {
    constructor(private servicsService: ServicsService) { }
    services: Servics | any;
    page: number = 0;
    iamgenes: any =[];
    ngOnInit() {
        this.loadServices()
    }

    loadServices(){
        this.servicsService.getAllServicesOfVendor().subscribe(services =>{
        this.services = services;
        const reader = new FileReader();
        reader.onload =(this.services);
    })
    }

    nextPage(){
        if(this.services != null){
            this.page += 5; 
        }
    }
    
    prevPage(){
        if(this.page > 0){
            this.page -=5;
        }
    }
    
    initPage(){
        this.page = 0; 
    }

    deleteService(service_id : string){
        this.servicsService.deleteService(service_id).subscribe(result =>{
            if(!result['delete']){
                Swal.fire({
                    title: 'Error Intenta De Nuevo',
                    icon:'error'
                })
            }
            else{
                Swal.fire({
                    title: 'Servicio Eliminado',
                    icon:'success'
                }).then(() => {
                    this.reloadPage();
                });
            }
        });
    }

    reloadPage(){
        window.location.reload();
    }

}