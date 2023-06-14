import Swal from "sweetalert2";

//  Alerta Toast

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1800,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

//  icon : success || error || warning || info || question
//  desc : String del mensaje para el usuario

const Alert = (icon, desc) => Toast.fire({
  icon: icon,
  title: desc
})

export { Alert }