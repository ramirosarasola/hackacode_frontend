import React from 'react'
import RollerCoaster from '../../assets/images/gif-roller-coaster.gif'
import '../../styles/components/UI/Loader.css'

function Loader() {
  return (
    <div className='loader'>
        <img  src={RollerCoaster} alt="Loading..." />
        <h4>LOADING...</h4>
    </div>
  )
}

export default Loader