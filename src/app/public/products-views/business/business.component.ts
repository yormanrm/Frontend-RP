import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Business } from 'src/app/core/shared/models/business.model';
import { UsersService } from 'src/app/core/shared/services/users/users.service';

@Component({
    selector: 'app-business',
    templateUrl: './business.component.html',
    styleUrls: ['./business.component.scss', '../../../../assets/js/adminlte/dist/css/adminlte.min.css', '../../../../assets/js/adminlte/plugins/fontawesome-free/css/all.min.css'],
})

export class BusinessComponent implements OnInit {

    vendorID: string | any;
    totalProducts: string | any;
    totalServices: string | any;
    currentBusiness!: Business;

    constructor(private route: ActivatedRoute, private userService: UsersService) { }

    ngOnInit() { 
        this.vendorID = this.route.snapshot.paramMap.get('id');
        this.loadBusiness();
    }

    loadBusiness(){
        this.userService.getBusinessProfile(this.vendorID).subscribe(res => this.currentBusiness = res[0]);
    }

}