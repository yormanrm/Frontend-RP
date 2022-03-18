import { Directive, HostListener } from '@angular/core';
import Swal from 'sweetalert2';

@Directive({
  selector: '[appBlockWrite]'
})
export class BlockWriteDirective {
  constructor() { }


  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'error',
      title: 'Use El Contador Del Input'
    })
    e.preventDefault();
  }

}