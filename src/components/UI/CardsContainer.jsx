import React from 'react'
import ModuleCard from './ModuleCard'
import '../../styles/components/UI/CardsContainer.css'
import BarChartIcon from "@mui/icons-material/BarChart";
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
  icon: EmojiPeopleIcon,
  url: '/employees/new',
  dataUrl: '/employees',
  userRole: 'admin',
  employeeType: 'manager'
  },
  {
    title: 'Employees',
    subheading: 'See all Employees',
    icon: EngineeringIcon,
    url: '/employees/new',
    dataUrl: '/employees',
    userRole: 'admin',
    employeeType: 'manager'
  },
  {
    title: 'Customers',
    subheading: 'See all Customers',
    icon: EmojiPeopleIcon,
    url: '/customers/new',
    dataUrl: '/customers/data',
    userRole: 'admin',
    employeeType: 'employee'
  },
  {
    title: 'Games',
    subheading: 'See all Games',
    icon: AttractionsIcon,
    url: '/games/new',
    dataUrl: '/games',
    userRole: 'admin',
    employeeType: 'employee'
  },
  {
    title: 'Sales',
    subheading: 'See all Sales',
    icon: LoyaltyIcon,
    url: '/sales/new',
    dataUrl: '/sales',
    userRole: 'admin',
    employeeType: 'employee'
  },
  {
    title: 'Park Statistics',
    subheading: 'See all Statistics',
    icon: BarChartIcon,
    url: '',
    dataUrl: '/statistics',
    userRole: '',
    employeeType: ''
  },
]

function CardsContainer({props}) {
  return (
    <div className='cards-container'>
        {modules.map(module => (
          <ModuleCard 
          title={module.title} 
          subheading={module.subheading} 
          icon={module.icon} 
          url={module.url} 
          props={props} 
          key={module.title} 
          dataUrl={module.dataUrl}
          userRole={module.userRole}
          employeeType={module.employeeType}
          />
        ))}
    </div>
  )
}

export default CardsContainer