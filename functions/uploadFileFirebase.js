
import firebase from "../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
const uploadFileFirebase = async (nameFile, file) => {

    try {
        const storageRef = ref(firebase.storage, `/images/${nameFile}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);

    } catch (error) {
        return null;
    }
}
 
export default uploadFileFirebase;