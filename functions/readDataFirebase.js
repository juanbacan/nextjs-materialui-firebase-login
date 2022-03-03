import firebase from "../firebase";
import { collection, getDocs } from "firebase/firestore";



const readDataFirebase = async (collectionName) => {

    const resultado = [];

    try {
        const querySnapshot = await getDocs(collection(firebase.db, collectionName));
        querySnapshot.forEach(doc => resultado.push(
            {
                ...doc.data(),
                "id": doc.id,
            }
        ));
        return resultado;
    } catch (error) {
        return [];
    }
}
 
export default readDataFirebase;

