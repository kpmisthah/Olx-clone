import { useEffect, useState } from "react"
import Navbar from "../../Components/Navbar/Navbar"
import Login from "../../Components/Modal/Login"
import Sell from "../../Components/Modal/Sell"
import Cards from "../../Components/Card/Cards"
import { itemContext } from "../../Components/Context/Item"
import { fetchFromFIreStore } from "../../Components/Firebase/Firebase"

export default function Home(){
    const[openModal,setModal] = useState(false)
    const[openModalSell,setModalSell] = useState(false)
    const toggleModal = ()=>setModal(!openModal)
    const toggleModalSell = () => setModalSell(!openModalSell)
    const itemsCtx = itemContext() //refer to constext values

    useEffect(()=>{
        const getItems = async ()=>{
            const datas = await fetchFromFIreStore();
            itemsCtx?.setItems(datas) //setItem function provided by the context
        }
        getItems()
    },[])
    useEffect(()=>{
        console.log('updated items',itemsCtx?.items);
        
    },[])
    return(
        <>
        {/* navbar nte koodeyum toggleModalsell pass cehyynm bcz avide aan sell button kadakkunne */}
         <Navbar toggleModal ={toggleModal} toggleModalSell={toggleModalSell}/>
         <Login toggleModal={toggleModal} status={openModal}/>
         {itemsCtx && (<Sell setItems={(itemsCtx)?.setItems} toggleModalSell = {toggleModalSell} status={openModalSell}/>)}
         <Cards items={itemsCtx?.items || []}/>
        </>
    )
}