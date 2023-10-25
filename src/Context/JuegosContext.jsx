import React, {createContext} from "react";
import {db} from "../ConfigFirebase/Config";

export const JuesgosContext = createContext();

export class JuesgosContextProvider extends React.Component{
    
    state={
        products:[]
    }
    componentDidMount(){
        const prevProductos = this.state.products;
        db.collection("Juegos").onSnapshot(snapshot=>{
            let changes = snapshot.docChanges();
            changes.forEach(change=>{
                if(change.type==="added"){
                    prevProductos.push({
                        JuegoID: change.doc.id,
                        NombreJuego: change.doc.data().NombreJuego,
                        PrecioJuego: change.doc.data().PrecioJuego,
                        CaratulaJuego: change.doc.data().CaratulaJuego,

                    })
                }
                this.setState({
                    products: prevProductos
                })

            })
        })
    }

    render(){
        return(
            <JuesgosContext.Provider value={{products:[...this.state.products]}}>
                {this.props.children}
            </JuesgosContext.Provider>
        )    
    }
}