import { Component, OnInit } from '@angular/core';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';

@Component({
    selector: 'cart-complete',
    templateUrl: './complete.component.html',
    styleUrls: ['./complete.component.scss']
})

export class CompleteComponent implements OnInit {
    constructor(private cookietoken: CookiesTokenService) { }
    roleLogged: string | any;
    ngOnInit() {
        this.roleLogged = this.cookietoken.getUser().role;
    }

}