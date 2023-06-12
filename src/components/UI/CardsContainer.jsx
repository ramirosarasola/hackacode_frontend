import React from 'react'
import ModuleCard from './ModuleCard'
import '../../styles/components/UI/CardsContainer.css'
import { 
  Engineering as EngineeringIcon,
  EmojiPeople as EmojiPeopleIcon,
  Attractions as AttractionsIcon,
  Loyalty as LoyaltyIcon
} from  "@mui/icons-material";


const modules = [
  {
  title: 'Users',
  subheading: 'See all Users',
  icon: EmojiPeopleIcon
  },
  {
    title: 'Employees',
    subheading: 'See all Employees',
    icon: EngineeringIcon
  },
  {
    title: 'Customers',
    subheading: 'See all Customers',
    icon: EmojiPeopleIcon
  },
  {
    title: 'Games',
    subheading: 'See all Games',
    icon: AttractionsIcon
  },
  {
    title: 'Sales',
    subheading: 'See all Sales',
    icon: LoyaltyIcon
  },
]

function CardsContainer({props}) {
  return (
    <div className='cards-container'>
        {modules.map(module => (
          <ModuleCard title={module.title} subheading={module.subheading} icon={module.icon} props={props} key={module.title}/>
        ))}
    </div>
  )
}

export default CardsContainer