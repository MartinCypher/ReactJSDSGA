import React, {useContext} from 'react'
import { JuesgosContext } from '../Context/JuegosContext'


const Juegos = () => {

  const {products} = useContext(JuesgosContext);
  console.log(products)



  return (
    <>

    {products.length !== 0 && <h1>Juegos</h1>}
    <div className='juegos-container'>
      {products.length === 0 && <div>cargando ... no hay productos para mostrar</div>}
      {products.map(juegos => (
        <div className='juegos-card' key={juegos.JuegoID}>
          <div className='juegos-img'>
            <img src={juegos.CaratulaJuego} alt="not found" />
          </div>
          <div className='juegos-nombre'>
            {juegos.NombreJuego}
          </div>
          <div className='juegos-precio'>
            $ {juegos.PrecioJuego}.00
          </div>
          <button className='añadircarrito-boton'>Añadir al Carrito</button>
        </div>

        
      ))}
    </div>







    </>
  )
}

export default Juegos
