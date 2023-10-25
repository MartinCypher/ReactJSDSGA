import React, {useState} from 'react'
import { auth } from '../ConfigFirebase/Config';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const IniciarSesion = (props) => {

  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = (e)=>{
    e.preventDefault();
    auth.signInWithEmailAndPassword(email,contraseña).then(() =>{
      setEmail("");
      setContraseña("");
      setError("");
      navigate("/");
    }).catch (err => setError(err.message))
  }


  return (

      <div className='container'>
            <br />
            <h2>Iniciar Sesion</h2>
            <br />
            <form autoComplete="off" className='form-group' onSubmit={login}>
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control' required
                    onChange={(e) => setEmail(e.target.value)} value={email} />
                <br />
                <label htmlFor="contraseña">Contraseña</label>
                <input type="password" className='form-control' required
                    onChange={(e) => setContraseña(e.target.value)} value={contraseña} />
                <br />
                <button type="submit" className='btn btn-success btn-md miBoton'>Ingresar</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
            <br/>
            <span>No tienes una cuenta? 
                <Link to="/singup"> Reguistrate aqui</Link>
            </span>
        </div>
  )
}

export default IniciarSesion
