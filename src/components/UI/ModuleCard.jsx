import React from 'react'
import '../../styles/components/UI/ModuleCard.css'
import { Link } from 'react-router-dom'
import AddCircleIcon from '@mui/icons-material/AddCircle';


function ModuleCard({ title, subheading, icon: IconComponent }) {
  return (
    <div className='card-container'>
        <div className="card-content">
          <div className="card-heading">
              <h2>{title}</h2>
              <IconComponent className='icon'/>
          </div>
          <p className='subheading'>{subheading}</p>
        </div>
        <div className="card-footer">
          <Link className='link'>New {title.toLowerCase()} <AddCircleIcon/></Link>
        </div>
    </div>
  )
}

export default ModuleCard