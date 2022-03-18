import { Component, OnInit } from '@angular/core';
import { LoadScriptsService } from 'src/app/core/shared/services/load-scripts/load-scripts.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    constructor(private loadS:LoadScriptsService) {
        loadS.loadS(["home/splidejs"]);
    }

    ngOnInit() {}
}