import firebase from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const readDocumentFirebase = async (collectionName, field, id) => {

    const resultado = [];

    try {
        const documentRef = collection(firebase.db, collectionName);
        const q = query(documentRef, where(field, "==", id));
        
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(doc => resultado.push({
            ...doc.data(),
            id: doc.id
        }));

        return resultado;
        
    } catch (error) {
        console.log(error);
        return [];
    }
}
 
export default readDocumentFirebase;
