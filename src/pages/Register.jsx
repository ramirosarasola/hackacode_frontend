import React from 'react'
import '../styles/pages/Register.css'
import RegisterForm from '../components/Auth/RegisterForm'

const Register = () => {


  return (
    <div className='register__page'>
      <h1>Registra Usuario</h1>
      <RegisterForm/>
    </div>
  )
}

export default Register