import React from 'react'
import '../../styles/components/UI/ModuleCard.css'


function ModuleCard({ title, subheading, icon: IconComponent }) {
  return (
    <div className='card-container'>
        <div className="card-heading">
            <h2>{title}</h2>
            <IconComponent className='icon'/>
        </div>
        <p className='subheading'>{subheading}</p>
    </div>
  )
}

export default ModuleCard