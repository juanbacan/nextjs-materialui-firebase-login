import firebase from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const addDataFirebase = async (collectionName, data) => {
    try {
        await addDoc(collection(firebase.db, collectionName), data);
        return true;
    } catch (e) {
      console.error("Error adding document: ", e);
      return false;
    }
}

export default addDataFirebase;
