import firebase from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const updateDataFirebase = async (collectionName, id, data) => {
    try {
        const documentRef = doc(firebase.db, collectionName, id);
        await updateDoc(documentRef, data);
        return true;

    } catch (e) {
      console.error("Error adding document: ", e);
      return false;
    }
}

export default updateDataFirebase;
