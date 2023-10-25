import React, { useState } from 'react'
import {auth, db} from "../ConfigFirebase/Config"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Registrarse = (props) => {

    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate ();

    // console.log(props);/////
    const SingUp = (e) =>{
        e.preventDefault();
        auth.createUserWithEmailAndPassword (email,contraseña).then((cred)=>{
            db.collection ("UsuariosRegistradosData ").doc(cred.user.uid).set({
                Usuario: usuario,
                Email: email,
                Contraseña: contraseña,
            }).then(()=>{
                setUsuario("");
                setEmail("");
                setContraseña("");
                setError("");
                navigate("/login");
            }).catch(err=> setError(err.message));
        }).catch(err=>setError(err.message))  
    }


  return (
    <div className='container'>
        <br />
        <h2>Registrarse</h2>
        <hr />
        <form autoComplete='off' className='form-group' onSubmit={SingUp}>
            <label htmlFor="Usuario"> Usuario</label>
            <br />
            <input type="text" className='form-control' required onChange={(e)=>setUsuario(e.target.value)} value={usuario} />
            <br />
            <label htmlFor="Email">Email</label>
            <br />
            <input type="email" className='form-control' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <br />
            <label htmlFor="Contraseña">Contraseña</label>
            <br />
            <input type="password" className='form-control' required onChange={(e)=>setContraseña(e.target.value)} value={contraseña} />
            <br />
            <button type='submit' className='btn btn-success btn-md miBoton'>Registrarse</button>
        </form>
        {error && <div className='error-msg'>{error}</div>}
        <br />
        <span>Ya te registraste? 
            <Link to="/login">Inicia sesion </Link>
        </span>

      
    </div>
  )
}

export default Registrarse
