import React from 'react'
import '../../styles/components/UI/ModuleCard.css'
import { Engineering as EngineeringIcon } from  "@mui/icons-material";

function ModuleCard() {
  return (
    <div className='card-container'>
        <div className="card-heading">
            <h2>EMPLOYEES</h2>
            <EngineeringIcon className='icon'/>
        </div>
        <p className='subheading'>See all employees</p>
    </div>
  )
}

export default ModuleCard