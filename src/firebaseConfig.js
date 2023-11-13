import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from
    "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from
    "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAUTq_82E-ihJsll1baRCdkvtxILSCV0ng",
    authDomain: "artigosppw.firebaseapp.com",
    projectId: "artigosppw",
    storageBucket: "artigosppw.appspot.com",
    messagingSenderId: "555737850637",
    appId: "1:555737850637:web:c9c07ffd6a717eb6380644"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
//export default firebaseApp;

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    signInWithGoogle,
    logout,
};
