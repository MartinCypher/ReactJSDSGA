import React, { createContext, useEffect, useState } from "react";
import { db } from "../ConfigFirebase/Config";

export const JuesgosContext = createContext();

const JuesgosContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await db.collection("Juegos").get();

      const newProducts = snapshot.docs.map((doc) => ({
        JuegoID: doc.id,
        NombreJuego: doc.data().NombreJuego,
        PrecioJuego: doc.data().PrecioJuego,
        CaratulaJuego: doc.data().CaratulaJuego,
      }));

      setProducts(newProducts);
    };

    fetchData();
  }, []);

  return (
    <JuesgosContext.Provider value={{ products }}>
      {children}
    </JuesgosContext.Provider>
  );
};

export default JuesgosContextProvider;