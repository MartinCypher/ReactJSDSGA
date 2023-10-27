import React, {useEffect, useState, useContext} from 'react'
import { auth, db } from '../ConfigFirebase/Config'
import { CarritoContext } from '../Context/CarritoContext'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom'

const FinalizarCompra = (props) => {

    const navigate = useNavigate();

    const {cantidadTotal, precioTotal, dispatch} = useContext(CarritoContext);

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");
    const [direccion, setDireccion] = useState("");
    const [mensajeExito, setMensajeExito] = useState("");
    const [error, setError] = useState ("");

    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                db.collection("UsuariosRegistradosData ").doc(user.uid).onSnapshot(snapshot=>{
                    setNombre(snapshot.data().Usuario);
                    setEmail(snapshot.data().Email);
                })
            }
            else{
                navigate("/login");
            }
        })
    })

    const cashoutSubmit = (e) =>{
        e.preventDefault();
        auth.onAuthStateChanged(user=>{
            if(user){
                const date = new Date();
                const time = date.getTime();
                db.collection("Informacion del comprador" + user.uid).doc("_" + time).set({
                    NombreDelComprador: nombre,
                    EmailDelComprador: email,
                    CelularDelComprador: celular,
                    DireccionDelComprador: direccion,
                    PagoDelComprador: precioTotal,
                    CantidadDelComprador: cantidadTotal,
                }).then(()=>{
                    setCelular("");
                    setDireccion("");
                    dispatch({type: "EMPTY"})
                    setMensajeExito("Su pedido se ha realizado con éxito. Gracias por visitarnos. Serás redirigido a la página de inicio después de 5 segundos.")
                    setTimeout(()=>{
                        navigate("/")
                    },5000)

                }).catch(err=> setError(err.message))
            }
        })
    }






    return (
        <>
            <NavBar user={props.user} />
            <div className='container'>
                <br />
                <h2>Detalles de la Compra</h2>
                <br />
                {mensajeExito && <div className='success-msg'>{mensajeExito}</div>}
                <form autoComplete="off" className='form-group' onSubmit={cashoutSubmit}>
                    <label htmlFor="name">Nombre</label>
                    <input type="text" className='form-control' required
                        value={nombre} disabled />
                    <br />
                    <label htmlFor="email">Email</label>
                    <input type="email" className='form-control' required
                        value={email} disabled />
                    <br />
                    <label htmlFor="Celular">Numero de Celular</label>
                    <input type="number" className='form-control' required
                        onChange={(e) => setCelular(e.target.value)} value={celular} placeholder='Ejemplo +5493885123456' />
                    <br />
                    <label htmlFor="Direccion de Entrega">Direccion de Entrega</label>
                    <input type="text" className='form-control' required
                        onChange={(e) => setDireccion(e.target.value)} value={direccion} />
                    <br />
                    <label htmlFor="Precio a Pagar">Precio a Pagar</label>
                    <input type="number" className='form-control' required
                        value={precioTotal} disabled />
                    <br />
                    <label htmlFor="Total No of Products">Cantidad Total de Juegos</label>
                    <input type="number" className='form-control' required
                        value={cantidadTotal} disabled />
                    <br />
                    <button type="submit" className='btn btn-success btn-md mybtn'>Comprar</button>
                </form>
                {error && <span className='error-msg'>{error}</span>}
            </div>
        </>
    )
}

export default FinalizarCompra
