import React from 'react'
import '../../styles/components/UI/ModuleCard.css'
import { Link } from 'react-router-dom'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useSelector } from 'react-redux';

function ModuleCard({ title, subheading, icon: IconComponent, url, dataUrl, userRole, employeeType }) {
  const { user } = useSelector(state => state.auth);
  const { employees } = useSelector((state) => state.employees);

  const employee_type = employees.find(
    (employee) => employee.user === user.data?._id
  )?.type;

  const user_role = user.data?.role;
  
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
      {
        (user_role === userRole || employee_type === employeeType) &&
        <div className="card-footer">
            <Link to={url} className='link'>New {title.toLowerCase()} <AddCircleIcon/></Link>
        </div>
      }
    </div>
  )
}

export default ModuleCard