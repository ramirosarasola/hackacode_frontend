import Swal from "sweetalert2";

//!  Alert Toast

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

//! Alert swalWithBootstrapButtons for confirmations

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

//* Personalized Alerts

//  icon : success || error || warning || info || question
//  desc : String del mensaje para el usuario

const Alert = (icon, desc) => Toast.fire({
  icon: icon,
  title: desc
})

const ConfirmAlert = async (title, info, confirmText, cancelText) => {
  const result = await swalWithBootstrapButtons.fire({
    title: title,
    text: info,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true
  });
  if (result.isConfirmed) {
    swalWithBootstrapButtons.fire(
      'Confirmed!',
      'The action has been executed.',
      'success'
    );
    return true;
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    swalWithBootstrapButtons.fire(
      'Cancelled',
      'The action has been cancelled.',
      'error'
    );
    return false;
  }
};

export { Alert, ConfirmAlert }