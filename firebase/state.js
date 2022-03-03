import React, { useReducer } from 'react';
import UsuarioReducer from './reducer';
import { FirebaseContext } from './index';
import { PUNTOS } from '../types';

const FirebaseState = props => {

    const initialState = {
        puntos: 1500,
    }

    const [ state, dispatch ] = useReducer(UsuarioReducer, initialState);

    // 
    const actualizarPuntos = puntos => {
        dispatch({
            type: PUNTOS,
            payload: puntos,
        });
    }



    return(
        <FirebaseContext.Provider
            value={{
                puntos: state.puntos,
                actualizarPuntos,            // Autentifica al usuario
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    );
}

export default FirebaseState;