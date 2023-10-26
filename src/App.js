import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import AñadirJuegos from './Components/AñadirJuegos';
import JuesgosContextProvider  from './Context/JuegosContext';
import Registrarse from './Components/Registrarse';
import IniciarSesion from './Components/IniciarSesion';
import { auth, db } from './ConfigFirebase/Config';
import { CarritoContextProvider } from './Context/CarritoContext';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        db.collection('UsuariosRegistradosData')
          .doc(user.uid)
          .get()
          .then(snapshot => {
            debugger
            setUser({
              Usuario: snapshot.data().Usuario,
            });
          })
          .catch(error => {
            console.error('Error getting document:', error);
          });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); 
  }, []); 

  return (
    <div>
      <JuesgosContextProvider>
        <CarritoContextProvider>
          <Router>
            <Routes>
              <Route path='AñadirProductos' element={<AñadirJuegos />} />
              <Route
                exact
                path='/'
                element={<Home user={user} />}
              />
              <Route path='/signup' element={<Registrarse />} />
              <Route path='/login' element={<IniciarSesion />} />
            </Routes>
          </Router>
        </CarritoContextProvider>
      </JuesgosContextProvider>
    </div>
  );
};

export default App;