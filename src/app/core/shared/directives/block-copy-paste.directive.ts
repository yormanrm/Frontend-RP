import { Directive, HostListener } from '@angular/core';
import Swal from 'sweetalert2';

@Directive({
  selector: '[appBlockCopyPaste]'
})
export class BlockCopyPasteDirective {
  constructor() { }

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
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
      title: 'El Ctrl+V No Esta Permitido'
    })
    e.preventDefault();
  }

  /*@HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    alert("No Permitido");
    e.preventDefault();
  }

  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    alert("No Permitido");
    e.preventDefault();
  }*/
}