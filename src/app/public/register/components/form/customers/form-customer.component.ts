import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-formcustomer',
    templateUrl: './form-customer.component.html',
    styleUrls: ['./form-customer.component.scss']
})

export class FormcustomerComponent implements OnInit {

    customerForm = new FormGroup({
        names: new FormControl('',[ Validators.required ]),
        paternal: new FormControl('',[ Validators.required ]),
        maternal: new FormControl('',[ Validators.required ]),
        email: new FormControl('',[ Validators.required ]),
        passwd: new FormControl('',[ Validators.required ]),
    });

    constructor() { }

    ngOnInit(): void  { }

    registerConfirmationC(){
        console.log('data binding');
    }
}