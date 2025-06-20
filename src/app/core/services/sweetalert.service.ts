import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() { }
  showAlert(message:string , icon: 'success' | 'error' | 'warning' ){
    Swal.fire({
      icon:icon,
      title:message,
      position:'top',
      timer:3000,
      showConfirmButton:false,
      timerProgressBar:true,
      toast:true,
      background:'#003b62d8',
      color:'#ffffff',
      showClass: { popup: 'animate__animated animate__zoomIn' },
      hideClass: { popup: 'animate__animated animate__zoomOut' },
    })
  }

confirm(): Promise<boolean> {
  return Swal.fire({
    title: "Are you sure?",
    text: "The product will be removed from the cart!",
    icon: "warning",
    background:"#003b62d8",
    color:"#fff",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    return result.isConfirmed;
  });
}
}
