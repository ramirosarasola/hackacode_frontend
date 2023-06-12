import React from 'react'
import '../../styles/components/UI/ModuleCard.css'
import { Engineering as EngineeringIcon } from  "@mui/icons-material";

function ModuleCard({ title, subheading }) {
  return (
    <div className='card-container'>
        <div className="card-heading">
            <h2>{title}</h2>
            <EngineeringIcon className='icon'/>
        </div>
        <p className='subheading'>{subheading}</p>
    </div>
  )
}

export default ModuleCard