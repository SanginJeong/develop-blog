import React, {useEffect} from 'react'
import './NavMenu.style.css';
import { useNavigate } from 'react-router';
import { idToCategory } from '../../constant/idToCategory';
const NavMenu = ({isOpen}) => {
  const navigate = useNavigate();
  const menuList = Object.keys(idToCategory);

  useEffect(() => {
    const navMenu = document.querySelector('.nav-menu');
    if (isOpen) {
      navMenu.classList.add('open');
      navMenu.classList.remove('close');
    } else {
      navMenu.classList.add('close');
      navMenu.classList.remove('open');
    }
  }, [isOpen]);


  return (
    <div className={`nav-menu ${isOpen ? 'open' : ''}`}>
      <ul>
        {menuList.map((menu)=>(
          <li className='nav-menu-btn' onClick={()=>{navigate(`/contents/${menu}`)}}>{idToCategory[menu]}</li>
        ))}
      </ul>
    </div>
  )
}

export default NavMenu