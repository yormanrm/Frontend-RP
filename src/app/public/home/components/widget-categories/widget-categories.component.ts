import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-widgetcategories',
    templateUrl: './widget-categories.component.html',
    styleUrls: ['widget-categories.component.scss']
})

export class WidgetcategoriesComponent implements OnInit {
    category: string = 'Automotriz y Refacciones';

    constructor() { }

    ngOnInit() { }
}