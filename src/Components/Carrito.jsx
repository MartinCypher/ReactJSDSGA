import React, { useContext, useEffect } from 'react'
import { CarritoContext } from '../Context/CarritoContext'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { auth } from '../ConfigFirebase/Config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons'

const Carrito = ({user}) => {

    const {carritoDeCompra, dispatch, precioTotal, cantidadTotal} = useContext(CarritoContext);

    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(!user) {
                navigate("/login")
            }
        })
    })


  return (
    <>
    <NavBar user={user} />
    <>
        {carritoDeCompra.length !== 0 && <h1>Carrito</h1>}
        <div className='cart-container'>
            {
                carritoDeCompra.length === 0 && <>
                    <div>no hay items en tu carrito (actualiza la pagina) o no has loggeado</div>
                    <div><Link to="/">Regresa a Home</Link></div>
                </>
            }
            {carritoDeCompra && carritoDeCompra.map(cart => (
                <div className='cart-card' key={cart.JuegoID}>

                    <div className='cart-img'>
                        <img src={cart.CaratulaJuego} alt="not found" />
                    </div>

                    <div className='cart-name'>{cart.NombreJuego}</div>

                    <div className='cart-price-orignal'>$ {cart.PrecioJuego}.00</div>

                    <div className='inc' onClick={() => dispatch({ type: 'INC', id: cart.JuegoID, cart })}>
                        <FontAwesomeIcon icon={faPlus} size="lg"/>
                    </div>

                    <div className='quantity'>{cart.cantidad}</div>

                    <div className='dec' onClick={() => dispatch({ type: 'DEC', id: cart.JuegoID, cart })}>
                        <FontAwesomeIcon icon={faMinus} size="lg"/>
                    </div>

                    <div className='cart-price'>
                        $ {cart.PrecioTotalDelJuego}
                    </div>

                    <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.JuegoID, cart })}>
                        <FontAwesomeIcon icon={faTrash} size="lg"/>
                    </button>
                </div>
            ))
            }
            {carritoDeCompra.length > 0 && <div className='cart-summary'>
                <div className='cart-summary-heading'>
                    Resumen de la Compra
                </div>
                <div className='cart-summary-price'>
                    <span>Precio Total</span>
                    <span>{precioTotal}</span>
                </div>
                <div className='cart-summary-price'>
                    <span>Cantidad</span>
                    <span>{cantidadTotal}</span>
                </div>
                <Link to='/finalizarcompra' className='cashout-link'>
                    <button className='btn btn-success btn-md' style={{ marginTop: 5 + 'px' }}>
                        Terminar Compra
                </button>
                </Link>
            </div>}
        </div>
    </>
</>
  )
}

export default Carrito
