import React from 'react'
import ModuleCard from './ModuleCard'
import '../../styles/components/UI/CardsContainer.css'


const modules = [
  {
  title: 'Users',
  subheading: 'See all Users'
  },
  {
    title: 'Employees',
    subheading: 'See all Employees'
  },
  {
    title: 'Customers',
    subheading: 'See all Customers'
  },
  {
    title: 'Games',
    subheading: 'See all Games'
  },
  {
    title: 'Sales',
    subheading: 'See all Sales'
  },
]

function CardsContainer({props}) {
  return (
    <div className='cards-container'>
        {modules.map(module => (
          <ModuleCard title={module.title} subheading={module.subheading} props={props} key={module.title}/>
        ))}
    </div>
  )
}

export default CardsContainer