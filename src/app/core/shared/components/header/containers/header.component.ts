import { Component, OnInit } from '@angular/core';
import { CookiesTokenService } from '../../../services/cookies-token/cookiestoken.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
    logged:boolean | any;
    constructor(private cookietoken:CookiesTokenService) { 
    }
    ngOnInit() {
        this.logged = this.cookietoken.isLogged();
    }
}