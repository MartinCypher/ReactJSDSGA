import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../Images/Digital Skull Games Argentina2.png"
import { Icon } from 'react-icons-kit'
import { cart } from 'react-icons-kit/entypo/cart'
import { useNavigate } from 'react-router-dom'
import { auth } from '../ConfigFirebase/Config'

const NavBar = ({user}) => {
  
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
          <span><Link to="cartproducts" className='navlinks'><Icon icon={cart}/></Link></span>
          <span><button className='logout-btn' onClick={logout}>Desconectarse</button></span>
        </div>}

    </div>
  )
}

export default NavBar
