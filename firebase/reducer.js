import {
    USUARIO, ADMIN, READY, PREMIUM, CERRAR_SESION
} from '../types';

const ReducerFirebase = (state, action) => {
    switch(action.type) {

        case USUARIO:
            return {
                ...state,
                usuario: action.payload,
            }
        case ADMIN:
            return {
                ...state,
                admin: action.payload,
            }  
        case READY:
            return {
                ...state,
                ready: action.payload,
            }   
        case PREMIUM:
            return {
                ...state,
                premium: action.payload,
            }   

        case CERRAR_SESION:
            return {
                ...state,
                usuario: null,
                admin: false,
                ready: false,
                premium: false,
            }  

        default:
            return state;
    }
}

export default ReducerFirebase;