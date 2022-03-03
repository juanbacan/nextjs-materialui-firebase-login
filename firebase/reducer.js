import { PUNTOS } from '../types';

const ReducerFirebase = (state, action) => {
    switch(action.type) {
        case PUNTOS:
            return {
                ...state,
                puntos: action.payload,
            }  


        default:
            return state;
    }
}

export default ReducerFirebase;