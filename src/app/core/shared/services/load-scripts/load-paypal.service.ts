import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LoadPaypalService {

  constructor() { }

  loadPaypalAPI(){
    let script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=AWfoEDtODPUpbAqq7HH9NEyQCaKNTwcgEqg-jSNoL361Rc_aqXf8J8S5y0PZ4JkZkzSDP1yWZG33e6Wu&currency=MXN";
    let head = document.getElementsByTagName("head")[0];
    head.appendChild(script);
  }

  loadPaypalView(){
    let script = document.createElement("script");
    script.src = "../../../../../assets/js/paypal/paypal.js";
    let body = document.getElementsByTagName("body")[0];
    body.appendChild(script);
  }

}
