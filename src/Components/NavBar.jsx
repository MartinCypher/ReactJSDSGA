import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from "../Images/Digital Skull Games Argentina2.png"
import { useNavigate } from 'react-router-dom'
import { auth } from '../ConfigFirebase/Config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { CarritoContext } from '../Context/CarritoContext'


const NavBar = ({user}) => {

  const {cantidad} = useContext(CarritoContext);
  
  const navigate = useNavigate();

  const logout = ()=>{
    auth.signOut().then(()=>{
      navigate("/login");
    })
  }

  return (
    <div className='navbox'>
        <div className='leftside'>
            <img src={logo} alt="" />
        </div>
        {/*si no tenemos ningun usuario */}
        {!user && <div className='rightside'>
            <Link to="singup" className="navlinks">Registrarse</Link>
            <Link to="login" className="navlinks">Iniciar Sesion</Link>

        </div>}
        {/* si tenemos un usuario logeado */}
        {user && <div className='rightside'>
          <span><Link to="/" className='navlinks'>{user}</Link></span>
          <span><Link to="/juegoscarrito" className='navlinks'><FontAwesomeIcon icon={faCartShopping}/></Link></span>
          <div className='relative'>
            <span className='no-of-products'>{cantidad}</span>
          </div>
          <span><button className='logout-btn' onClick={logout}>Desconectarse</button></span>
        </div>}

    </div>
  )
}

export default NavBar
