import { collection, getDocs } from "firebase/firestore";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { fireStore } from "../Firebase/Firebase";

export interface Product {
    id:string
    title: string;
    category: string;
    price: number;
    description: string;
    userId: string;
    userName: string;
    createdAt: string;
    imageUrl:string
} 
interface itemContextType{
    items:Product[]|null,
    setItems:((items:Product[]|null)=>void)
} 
const context = createContext<itemContextType|null>(null)
export const itemContext = ()=>useContext(context)

interface Providerprops{
    children:ReactNode
}
const ItemContextProvider = (({children}:Providerprops)=>{
    const[items,setItems] = useState<Product[]|null>(null);
    useEffect(()=>{
        const fetchItemsFromFIrestore = async ()=>{
            try {
                const productCollection = collection(fireStore,'products')
                const productSnapshot = await getDocs(productCollection)
                const productList = productSnapshot.docs.map(doc=>({
                    id:doc.id,
                    ...doc.data() as Omit<Product,'id'>
                }))
                setItems(productList)
            } catch (error) {
                
            }
        }
        fetchItemsFromFIrestore()
    },[])
    return(
        <>
        <context.Provider value={{items,setItems}}>
            {children}
        </context.Provider>
        </>
    )
})
export default ItemContextProvider