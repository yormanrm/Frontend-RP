import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Servics } from 'src/app/core/shared/models/service.model';
import { ServicsService } from 'src/app/core/shared/services/servics/servics.service';
import Swal from 'sweetalert2';

interface Category {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-editservics',
    templateUrl: './editservics.component.html',
    styleUrls: ['./editservics.component.scss']
})

export class EditservicsComponent implements OnInit {
    constructor(private servicsService: ServicsService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) { }
    currentService: Servics | any;
    serviceID: string | any;

    categories: Category[] = [
        {value: 'Arquitectura e Ingenieria', viewValue: 'Arquitectura e Ingeniería'},
        {value: 'Audiovisual', viewValue: 'Audiovisual'},
        {value: 'Comunicacion', viewValue: 'Comunicacion'},
        {value: 'Contabilidad', viewValue: 'Contabilidad'},
        {value: 'Distribucion', viewValue: 'Distribucion'},
        {value: 'Enseñanza', viewValue: 'Enseñanza'},
        {value: 'Energia', viewValue: 'Energia'},
        {value: 'Financiero', viewValue: 'Financiero'},
        {value: 'Informatica y Computacion', viewValue: 'Informatica y Computacion'},
        {value: 'Juridico', viewValue: 'Juridico'},
        {value: 'Logistico', viewValue: 'Logistico'},
        {value: 'Mantenimiento', viewValue: 'Mantenimiento'},
        {value: 'Postal y Mensajeria', viewValue: 'Postal y Mensajeria'},
        {value: 'Reparacion', viewValue: 'Reparacion'},
        {value: 'Turismo', viewValue: 'Turismo'},
        {value: 'Transporte', viewValue: 'Transporte'},
        {value: 'Social', viewValue: 'Social'},
        {value: 'Salud', viewValue: 'Salud'},
        {value: 'Otros', viewValue: 'Otros'},
    ];

    updateServiceForm : FormGroup | any;

    ngOnInit() { 
        this.serviceID = this.route.snapshot.paramMap.get('id');
        this.loadCurrentService();
        this.updateServiceForm = this.fb.group ({
            service_id: this.serviceID,
            service_name: ['', Validators.required ],
            description: ['', Validators.required ],
            minprice: ['', Validators.required ],
            maxprice: ['', Validators.required ],
            category: ['', Validators.required ],
        });
    }

    loadCurrentService(){
        this.servicsService.getService(this.serviceID).subscribe(res=>{
            this.currentService = res[0];
        });
    }

    updateService(){
        this.servicsService.updateService(this.updateServiceForm.value).subscribe(result =>{
            if(!result['update']){
                Swal.fire({
                    title: 'No Se Detecto Ningun Cambio',
                    icon:'error'
                })
            }
            else{
                Swal.fire({
                    title: 'Servicio Actualizado!',
                    icon:'success'
                }).then(() => {
                    this.router.navigate(['/account-vendor/servics']);
                });
            }
        });
    }

    reloadPage(){
        window.location.reload();
    }
}