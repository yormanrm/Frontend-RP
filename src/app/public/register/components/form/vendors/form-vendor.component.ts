import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-formvendor',
    templateUrl: './form-vendor.component.html',
    styleUrls: ['./form-vendor.component.scss']
})

export class FormvendorComponent implements OnInit {

    vendorForm = new FormGroup({
        names: new FormControl('',[ Validators.required ]),
        paternal: new FormControl('',[ Validators.required ]),
        maternal: new FormControl('',[ Validators.required ]),
        email: new FormControl('',[ Validators.required ]),
        passwd: new FormControl('',[ Validators.required ]),
    });

    constructor() { }

    ngOnInit(): void  { }

    registerConfirmationV(){
        console.log('data binding');
    }
}