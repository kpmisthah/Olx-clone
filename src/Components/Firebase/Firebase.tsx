
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore,collection,getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { Product } from "../Context/Item";

const firebaseConfig = {
  apiKey: "AIzaSyAvFIbZAlPFd0dchkYFbdTxx6hLaT3qdMI",
  authDomain: "olx-clone-be372.firebaseapp.com",
  projectId: "olx-clone-be372",
  storageBucket: "olx-clone-be372.firebasestorage.app",
  messagingSenderId: "180586207938",
  appId: "1:180586207938:web:911d1ab766e4974b88f95b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const storage = getStorage()
const fireStore = getFirestore()
const fetchFromFIreStore = async()=>{
    try {
        const productCollection = collection(fireStore,'products')
        const productSnapshot = await getDocs(productCollection)
        const productList = productSnapshot.docs.map(doc=>({
            id:doc.id,
            ...doc.data() as Omit<Product,'id'>
        }))
        console.log('Feteched products from Firestore',productList);
        return productList
        
    } catch (error) {
        console.error('Error fetching products from firestore:',error)
         return[]
    }
}
export{
    auth,
    provider,
    storage,
    fireStore,
    fetchFromFIreStore
}