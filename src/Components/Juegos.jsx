import React, {useContext} from 'react'
import { JuesgosContext } from '../Context/JuegosContext'
import { CarritoContext } from '../Context/CarritoContext';


const Juegos = () => {

  const {products} = useContext(JuesgosContext);

  // const data = useContext (CarritoContext);

  const {dispatch} = useContext (CarritoContext) 
  
  


  return (
    <>

    {products.length !== 0 && <h1>Juegos</h1>}
    <div className='juegos-container'>
      {products.length === 0 && <div>cargando ... no hay productos para mostrar</div>}
      {products.map(juego => (
        <div className='juegos-card' key={juego.JuegoID}>
          <div className='juegos-img'>
            <img src={juego.CaratulaJuego} alt="not found" />
          </div>
          <div className='juegos-nombre'>
            {juego.NombreJuego}
          </div>
          <div className='juegos-precio'>
            $ {juego.PrecioJuego}.00
          </div>
          <button className='añadircarrito-boton' onClick={()=>{dispatch({type:"Añadir_al_carrito", id: juego.JuegoID, juego})}}>Añadir al Carrito</button>
        </div>

        
      ))}
    </div>







    </>
  )
}

export default Juegos
