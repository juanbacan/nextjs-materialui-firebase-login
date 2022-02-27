import React, { useReducer } from 'react';
import UsuarioReducer from './reducer';
import firebase, { FirebaseContext } from './index';
import { USUARIO, ADMIN, READY, PREMIUM, CERRAR_SESION } from '../types';

const FirebaseState = props => {

    const initialState = {
        usuario : null,
        admin: false,
        ready: false,
        premium: false,
        firebase : firebase,
    }

    const [ state, dispatch ] = useReducer(UsuarioReducer, initialState);

    // 
    const authUsuario = usuario => {
        dispatch({
            type: USUARIO,
            payload: usuario,
        });
    }

    const setAdminUsuario = admin => {      // true: si el usuario si es admin
        dispatch({
            type: ADMIN,
            payload: admin,
        })
    }

    const setPremiumUser = premium => {      // true: si el usuario si es admin
        dispatch({
            type: PREMIUM,
            payload: premium,
        })
    }

    const setReadyState = ready => {
        dispatch({
            type: READY,
            payload: ready
        })
    }

    const cerrarSesionState = () => {
        dispatch({
            type: CERRAR_SESION,
        })
    }

    return(
        <FirebaseContext.Provider
            value={{
                usuario: state.usuario,
                admin: state.admin,
                ready: state.ready,
                premium: state.premium,
                firebase: state.firebase,
                authUsuario,            // Autentifica al usuario
                setAdminUsuario,        // Configura si el usuario es un administrador
                setPremiumUser,         // Configura si el usuario tiene una cuenta premium
                setReadyState,          // Configura el estado de si ya encontro al usuario
                cerrarSesionState
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    );
}

export default FirebaseState;