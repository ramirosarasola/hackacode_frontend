import React from 'react'
import '../../styles/components/UI/ModuleCard.css'
import { Link } from 'react-router-dom'
import AddCircleIcon from '@mui/icons-material/AddCircle';


function ModuleCard({ title, subheading, icon: IconComponent, url, dataUrl }) {
  return (
    <div className='card-container'>
      <Link to={dataUrl}>
        <div className="card-content">
          <div className="card-heading">
              <h2>{title}</h2>
              <IconComponent className='icon'/>
          </div>
          <p className='subheading'>{subheading}</p>
        </div>
      </Link>
        <div className="card-footer">
          <Link to={url} className='link'>New {title.toLowerCase()} <AddCircleIcon/></Link>
        </div>
    </div>
  )
}

export default ModuleCard