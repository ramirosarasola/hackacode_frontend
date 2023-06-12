import React from 'react'
import ModuleCard from './ModuleCard'
import '../../styles/components/UI/CardsContainer.css'

function CardsContainer() {
  return (
    <div className='cards-container'>
        <div className="row">
            <ModuleCard/>
            <ModuleCard/>
        </div>
        <div className="row">
            <ModuleCard/>
            <ModuleCard/>
        </div>  
        <div className="row">
            <ModuleCard/>
            <ModuleCard/>
        </div>      
    </div>
  )
}

export default CardsContainer