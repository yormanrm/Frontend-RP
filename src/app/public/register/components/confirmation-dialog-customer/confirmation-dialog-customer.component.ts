import { Component, Input, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/shared/services/users/users.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-confirmationdialog-customer',
    templateUrl: './confirmation-dialog-customer.component.html',
    styleUrls: ['./confirmation-dialog-customer.component.scss']
})

export class ConfirmationdialogcustomerComponent implements OnInit {
    @Input() customerChild:FormGroup | any;
    errorMessage = '';
    constructor(private userService:UsersService, private router: Router) { }

    ngOnInit() { }

    get names() { return this.customerChild.get('names').value; }

    registerCustomer(){
        this.userService.duplicateUser(this.customerChild.value.email).subscribe({
            next: data => {
                this.router.navigate([''])
                .then(() => {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 5000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    });
                    Toast.fire({
                        icon: 'warning',
                        title: 'Ya Existe Una Cuenta Con Este Correo, Por Favor Inicia Sesion'
                    });
                  let modalButton : HTMLElement = document.getElementById('modalButton') as HTMLElement;
                  modalButton.click();
                });
            },
            error: err => {
                this.userService.insertCustomer(this.customerChild.value).subscribe(result =>{
                    if(!result['insert']){
                        alert('Error, Vuelva A Intentarlo');
                    }
                    else{
                        console.log('data sended');
                        this.router.navigate([''])
                        .then(() => {
                            const Toast = Swal.mixin({
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 5000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                  toast.addEventListener('mouseenter', Swal.stopTimer)
                                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                            });
                            Toast.fire({
                                icon: 'success',
                                title: 'Registro Exitoso, Inicia Sesion'
                            });
                          let modalButton : HTMLElement = document.getElementById('modalButton') as HTMLElement;
                          modalButton.click();
                        });
                    }
                });
            }
        });
    }

    reloadPage(): void {
        window.location.reload();
    }
}