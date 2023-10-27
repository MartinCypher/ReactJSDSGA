import React, {createContext, useReducer} from "react";
import {CarritoReducer} from "./CarritoReducer"

export const CarritoContext = createContext();

export const CarritoContextProvider = (props) =>{

    const [cart, dispatch] = useReducer(CarritoReducer, {carritoDeCompra:[], precioTotal:0, cantidadTotal:0})

    

    return(
        <CarritoContext.Provider value={{...cart, dispatch}}>
            {props.children}
        </CarritoContext.Provider>
    )
}