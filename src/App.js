import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import AñadirJuegos from './Components/AñadirJuegos';
import { JuesgosContextProvider } from './Context/JuegosContext';
import Registrarse from './Components/Registrarse';
import IniciarSesion from './Components/IniciarSesion';
import { auth,db } from './ConfigFirebase/Config';

export class App extends Component {

  state={
    user: null
  }

  componentDidMount(){
    auth.onAuthStateChanged(user=>{
      if(user){
        /*Prof aca busque todos los posibles resultados para corregir este error no encuentra mis docs firebase nose que hacer */
        db.collection("UsuariosRegistradosData").doc(user.uid).get().then(snapshot =>{
          this.setState({
            Usuario: snapshot.data().Usuario
          })
        })
      }
      else{
        this.setState({
          user:null
        })
      }
    })
  }



  render() {
    return (
      <div>
        <JuesgosContextProvider>
          <BrowserRouter>
          <Routes>
            <Route path='AñadirProductos' Component={AñadirJuegos}/>
            <Route exact path='/' Component={()=><Home user={this.state.user}></Home>}/>
            <Route path='/singup' Component={Registrarse}/>
            <Route path='/login' Component={IniciarSesion}/>
          </Routes>
          </BrowserRouter>
        </JuesgosContextProvider>
        
      </div>
    )
  }
}

export default App
