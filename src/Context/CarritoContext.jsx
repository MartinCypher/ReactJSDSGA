import React, {createContext, useReducer} from "react";
import {CarritoReducer} from "./CarritoReducer"

export const CarritoContext = createContext();

export const CarritoContextProvider = (props) =>{

    const [cart, dispatch] = useReducer(CarritoReducer, {shoppingCart:[], precioTotal:0, cantidad:0})

    return(
        <CarritoContext.Provider value={""}>
            {props.children}
        </CarritoContext.Provider>
    )
}