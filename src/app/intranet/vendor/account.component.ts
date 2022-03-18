import { Component, OnInit } from '@angular/core';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit {
    constructor(private cookieService: CookiesTokenService) { }

    ngOnInit() { }

    logout() : void{
        this.cookieService.deleteCookie();
    }
}