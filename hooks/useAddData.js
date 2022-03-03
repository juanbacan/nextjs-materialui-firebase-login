import firebase from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const useAddData = async () => {
    try {
        const docRef = await addDoc(collection(firebase.db, "users"), {
          first: "Ada",
          last: "Lovelace",
          born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
    console.error("Error adding document: ", e);
    }
}

export default useAddData;

