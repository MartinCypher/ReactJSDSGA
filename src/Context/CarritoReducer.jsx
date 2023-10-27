import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const CarritoReducer = (state, action) =>{
    const {carritoDeCompra, precioTotal, cantidadTotal} = state;

    let juego;
    let index;
    let precioActualizado;
    let cantidadActualizada;

    switch(action.type){
        case "Añadir_al_carrito":
        const check = carritoDeCompra.find(juego=> juego.JuegoID === action.id);
        if(check){
            toast.info('Este producto ya esta en tu carrito', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
            return state;
        }
        else{
            juego = action.juego;
            juego["cantidad"] = 1;
            juego["PrecioTotalDelJuego"] = juego.PrecioJuego * juego.cantidad;
            cantidadActualizada = cantidadTotal +1;
            precioActualizado = precioTotal + juego.PrecioJuego;
            return {
                carritoDeCompra: [juego, ...carritoDeCompra], precioTotal: precioActualizado, cantidadTotal: cantidadActualizada
            }
        }
        
        case "INC":
        juego=action.cart;
        juego.cantidad = ++juego.cantidad;
        juego.PrecioTotalDelJuego = juego.cantidad * juego.PrecioJuego;
        precioActualizado = precioTotal + juego.PrecioJuego;
        cantidadActualizada = cantidadTotal + 1; 
        index = carritoDeCompra.findIndex(cart => cart.JuegoID === action.id);
        carritoDeCompra[index] = juego;
        return{
            carritoDeCompra: [...carritoDeCompra], precioTotal: precioActualizado, cantidadTotal: cantidadActualizada
        }

        case "DEC":
        juego = action.cart;
        if(juego.cantidad >1){
            juego.cantidad = juego.cantidad -1;
            juego.PrecioTotalDelJuego = juego.cantidad * juego.PrecioJuego;
            precioActualizado = precioTotal - juego.PrecioJuego;
            cantidadActualizada = cantidadTotal - 1;
            index = carritoDeCompra.findIndex(cart => cart.JuegoID === action.id);
            carritoDeCompra[index] = juego;
            return{
                carritoDeCompra: [...carritoDeCompra], precioTotal: precioActualizado, cantidadTotal: cantidadActualizada
            }  
        }
        else{
            return state;
        }
        case "DELETE":

        const filtrar = carritoDeCompra.filter(juego => juego.JuegoID !== action.id);
        juego = action.cart;
        cantidadActualizada = cantidadTotal - juego.cantidad;
        precioActualizado = precioTotal - juego.cantidad * juego.PrecioJuego;
        return{
            carritoDeCompra: [...filtrar], precioTotal: precioActualizado, cantidadTotal: cantidadActualizada
        }

        case "EMPTY":
            return{
                carritoDeCompra: [], precioTotal: 0, cantidadTotal:0
            }

        default:break;
    }
}