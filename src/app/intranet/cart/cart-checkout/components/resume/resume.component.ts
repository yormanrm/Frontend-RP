import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { cartItemCustomer } from 'src/app/core/shared/models/cart-item-customer.model';
import { cartItemVendor } from 'src/app/core/shared/models/cart-item-vendor.model';
import { CartService } from 'src/app/core/shared/services/cart/cart.service';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

/*declare var paypal: any;*/

@Component({
  selector: 'cart-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;

  cartVendor: cartItemVendor | any;
  cartCustomer: cartItemCustomer | any;
  totalpay: string = '';
  totalPaypal: number | any;
  name: string | any;
  paternal: string | any;
  maternal: string | any;
  email: string | any;
  phone1: string | any;
  phone2: string | any;
  address: string | any;
  roleLogged: string | any;
  orderVendorForm: FormGroup | any;
  orderCustomerForm: FormGroup | any;

  constructor(
    private cookietoken: CookiesTokenService,
    private cartService: CartService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loadCartItems();
    this.initConfig();
    this.roleLogged = this.cookietoken.getUser().role;
    /*
      sb-ew9qg12492308@personal.example.com
      {rN?P5f8
    */
  }

  loadCartItems() {
    if (this.cookietoken.isLogged()) {
      if (this.cookietoken.getUser().vend != null) {
        this.cartService.getCartVendor().subscribe((cartItems) => {
          this.cartVendor = cartItems;
          let Total = 0;
          this.cartVendor.map((a: any) => {
            Total += parseInt(a.total);
          });
          this.totalPaypal = Total;
          this.totalpay = Total.toString().replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ','
          );
        });
      }
      if (this.cookietoken.getUser().cust != null) {
        this.cartService.getCartCustomer().subscribe((cartItems) => {
          this.cartCustomer = cartItems;
          let Total = 0;
          this.cartCustomer.map((a: any) => {
            Total += parseInt(a.total);
          });
          this.totalPaypal = Total;
          this.totalpay = Total.toString().replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ','
          );
        });
      }
    }
  }

  initUserInfo(data: any) {
    this.name = data.name;
    this.paternal = data.paternal;
    this.maternal = data.maternal;
    this.email = data.email;
    this.phone1 = data.phone1;
    this.phone2 = data.phone2;
    this.address = data.address;
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'MXN',
      clientId: environment.clientidpaypal,
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'MXN',
                value: this.totalPaypal,
              }
            }
          ]
        },
      onApprove: (data, actions) => {
        actions.order.capture().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
          var orderValue = (<HTMLInputElement>document.getElementById('paypal-orderid')).value;
          var transaction = details.purchase_units[0].payments.captures[0];
          if(this.cookietoken.getUser().vend != null){
            this.orderVendorForm = this.fb.group({
              vendor_id: this.cookietoken.getUser().vend,
              order_id: orderValue,
              status: transaction.status,
              payorder: transaction.id,
              total: this.totalPaypal
            });
            console.log(this.orderVendorForm.value)
            this.cartService.updateOrderVendor(this.orderVendorForm.value).subscribe(result =>{
              if(!result['update']){
                  Swal.fire({
                      title: 'Error En La Compra',
                      icon:'error'
                  })
              }
              else{
                  Swal.fire({
                      title: 'Compra Realizada!',
                      icon:'success'
                  }).then(() => {
                    let confirmButton : HTMLElement = document.getElementById('btn-step') as HTMLElement;
                    confirmButton.click();
                  });
              }
            })
          }
          if(this.cookietoken.getUser().cust != null){
            this.orderCustomerForm = this.fb.group({
              cust_id: this.cookietoken.getUser().cust,
              order_id: orderValue,
              status: transaction.status,
              payorder: transaction.id,
              total: this.totalPaypal
            });
            console.log(this.orderCustomerForm.value)
            this.cartService.updateOrderCustomer(this.orderCustomerForm.value).subscribe(result =>{
              if(!result['update']){
                  Swal.fire({
                      title: 'Error En La Compra',
                      icon:'error'
                  })
              }
              else{
                  Swal.fire({
                      title: 'Compra Realizada!',
                      icon:'success'
                  }).then(() => {
                    let confirmButton : HTMLElement = document.getElementById('btn-step') as HTMLElement;
                    confirmButton.click();
                  });
              }
            })
          }
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}

