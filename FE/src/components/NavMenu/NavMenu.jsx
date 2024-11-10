import React from 'react'
import './NavMenu.style.css';
import menuList from './navMenuList';
import { useNavigate } from 'react-router';
const NavMenu = () => {
  const navigate = useNavigate();

  return (
    <div>
      <ul>
        {menuList.map((menu)=>(
          <li><button onClick={()=>{navigate(`/contents/${menu.id}`)}}>{menu.name}</button></li>
        ))}
      </ul>
    </div>
  )
}

export default NavMenu