import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare var paypal: {
    Buttons: (arg0: {
        style: { shape: string; color: string; layout: string; label: string; }; createSubscription: (data: any, actions: {
            subscription: {
                create: (arg0: {
                    /* Creates the subscription */
                    plan_id: string;
                }) => any;
            };
        }) => any; onApprove: (data: { subscriptionID: any; }, actions: any) => void;
    }) => { (): any; new(): any; render: { (arg0: string): void; new(): any; }; };
}

@Component({
    selector: 'app-suscription',
    templateUrl: './suscription.component.html',
    styleUrls: ['./suscription.component.scss']
})
export class SuscriptionComponent implements OnInit {
    /*@ViewChild('paypal',{static:true}) paypalElement : ElementRef | undefined;*/
    constructor() { }

    ngOnInit() { 
        /*paypal.Buttons({
            style: {
                shape: 'rect',
                color: 'gold',
                layout: 'vertical',
                label: 'subscribe'
            },
            createSubscription: function(data: any, actions: {
                    subscription: {
                        create: (arg0: {
                            plan_id: string;
                        }) => any;
                    };
                }) {
              return actions.subscription.create({
                plan_id: 'P-2CP58777X60503724MIO2ECQ'
              });
            },
            onApprove: function(data: { subscriptionID: any; }, actions: any) {
              alert(data.subscriptionID); 
            }
        }).render(this.paypalElement?.nativeElement); */
}
}