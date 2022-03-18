import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { ResumeComponent } from './components/resume/resume.component';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './cart-checkout.component.html',
    styleUrls: ['./cart-checkout.component.scss'],
})

export class CartcheckoutComponent implements OnInit {
    @ViewChild(ResumeComponent, { static: true })
    resume!: ResumeComponent;

    stepperOrientation: Observable<StepperOrientation>;

    constructor(breakpointObserver: BreakpointObserver) {
      this.stepperOrientation = breakpointObserver
        .observe('(min-width: 800px)')
        .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
    }

    @Input() userToResume: any;

    ngOnInit() { 

    }

    receivedUser(data:any){
        this.userToResume = data;
        this.resume.initUserInfo(this.userToResume);
    }


}