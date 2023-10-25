import React, { useState } from 'react'
import {storage, db} from "../ConfigFirebase/Config"

const AñadirJuegos = () => {

    const [nombreJuegos, setNombreJuegos] = useState("");
    const [precioJuegos, setPrecioJuegos] = useState(0);
    const [caratulaJuego, setCaratulaJuego] = useState (null);
    const [error, setError] = useState ("");

    const tipos = ["image/png", "image/jpeg"]


    // Caratulas de los Juegos //

    const caratulaJuegoHandler = (e) =>{
        let archivoSeleccionado = e.target.files[0];
        if(archivoSeleccionado && tipos.includes(archivoSeleccionado.type)){
            setCaratulaJuego(archivoSeleccionado);
            setError("");
        }
        else{
            setCaratulaJuego(null);
            setError("Por Favor ingrese una imagen valida tipo PNG o JPEG")
        }
    }

    // Añadir Juegos desde un Formulario //

    const agregarJuego = (e) => {
        e.preventDefault();
        const uploadCaratulaJuegos = storage.ref(`caratulas-juegos/${caratulaJuego.name}`).put(caratulaJuego);
        uploadCaratulaJuegos.on("state_changed", snapshot=>{
            const progress = (snapshot.bytesTransfered/snapshot.totalBytes) * 100;
            console.log(progress);
        },err=>{
            setError(err.message);
        },()=>{
            storage.ref("caratulas-juegos").child(caratulaJuego.name).getDownloadURL().then(url=>{
                db.collection("Juegos").add({
                    NombreJuego: nombreJuegos,
                    PrecioJuego: Number(precioJuegos),
                    CaratulaJuego: url
                }).then(()=>{
                    setNombreJuegos("");
                    setPrecioJuegos(0);
                    setCaratulaJuego("");
                    document.getElementById("file").value = "";
                }).catch(err=>setError(err.message));
            })
        })
    
    }



  return (
    <div className='container'>
        <br />
        <h2> Añadir Juegos</h2>
        <hr />
        <form autoComplete="off" className='form-group' onSubmit={agregarJuego}>

            <label htmlFor="Nombre-del-Juego">Nombre del Juego</label>
            <br />
            <input type="text" className='form-control' required onChange={(e)=>setNombreJuegos(e.target.value)} value={nombreJuegos}/>
            <br />
            <label htmlFor="Precio-del-Juego">Precio del Juego</label>
            <br />
            <input type="number" className='form-control' required onChange={(e)=>setPrecioJuegos(e.target.value)} value={precioJuegos}/>
            <br />
            <label htmlFor="Juegos-img">Caratula del Juego</label>
            <br />
            <input type="file" className='form-control' onChange={caratulaJuegoHandler} id='file' />
            <br />
            <button className='btn btn-success btn-md miBoton'>Agregar</button>
            
        </form>
        
        {error&&<span>{error}</span>}
     
    </div>
  )
}

export default AñadirJuegos
