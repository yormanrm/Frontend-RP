import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

    constructor() { }

    ngOnInit(){ }

    tabLoadTimes: Date[] = [];

    getTimeLoaded(index: number) {
        if (!this.tabLoadTimes[index]) {
            this.tabLoadTimes[index] = new Date();
        }
        return this.tabLoadTimes[index];
    }  

}