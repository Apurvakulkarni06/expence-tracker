"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { doc, collection, addDoc, getDocs, deleteDoc } from "firebase/firestore"; 
import { db } from "../utility/firebase";
import { async } from "@firebase/util";

const inter = Inter({ subsets: ["latin"] });
const initialNewState = {
  name:"",
  price:0
}
export default function Home() {
  
  const [items, setItems] = useState([
    // { name: "Coffee", price: 5.0 },
    // { name: "Movie", price: 24.5 },
    // { name: "candy", price: 6.0 },
    // { name: "Dinner", price: 45.5 },
    // { name: "Trek", price: 90.0 },
  ]);

  const [newItem, setNewItem] = useState(initialNewState)
  
  const [total, setTotal] = useState(0)
  const [error, setError] = useState('')
  
  const getTotal = () =>{
    const allPrice = items.map(item=> item.price).reduce((total, current) => total + parseInt(current), 0)
    setTotal(allPrice)
  }

  // Add item to firebase
  const addItem =  async(event) => {
    event.preventDefault();

    if (newItem.name !== "" && newItem.price !== "") {
      setItems([...items, newItem]);

      try {
        const data ={
          name:newItem.name.trim(),
          price:newItem.price
        }
        await addDoc(collection(db, "item"), data);

      } catch (err) {
        console.error("Error while adding item", err);
        setError(err);
      }

      setNewItem(initialNewState)
    }
  };


  // Read items from firebase
  const getItems = async() =>{
      try{
        const querySnapshot = await getDocs(collection(db, 'item'))
        const allItems=[]
        querySnapshot.forEach((doc) => {
          allItems.push({...doc.data(), id: doc.id})
        });
        setItems([...allItems])
        
      }catch(err){
        console.error("Error occurred while fetching items", err);
        setError(err)
      }
  }

  useEffect(()=>{
    getItems()
  }, [])

  useEffect(()=>{
    if(items.length > 0){
      getTotal()
    }
  }, [items])

  
  // Delete items from firebase

  const deleteItem = async(itemId) =>{
    try{
      await deleteDoc(doc(db, 'item', itemId))
      getItems()

    }catch(err){
      console.error("Error ocurred while deleting item", err);
      setError(err)
    }
  }
  
  return (
    <main className={styles.main}>
      <h1 className="text-4xl p-4">Expense Tracker</h1>
      <div className="bg-slate-800 p-4 rounded-lg">
        <form className="grid grid-cols-6 items-center text-black" onSubmit={(event)=>addItem(event)}>
          <input
            className="col-span-3 p-3 border"
            type="text"
            placeholder="Enter Item"
            value={newItem.name}
            onChange={(e)=> setNewItem({...newItem, name:e.target.value})}
          />
          <input
            className="col-span-2 p-3 border mx-3"
            type="number"
            placeholder="Enter amount"
            value={newItem.price}
            onChange={(e)=> setNewItem({...newItem, price:e.target.value})}
          />
          <button
            className="bg-slate-950 text-white hover:bg-slate-900 p-3 text-xl"
            type="submit"
          >
            +
          </button>
        </form>
        <ul>
          {items.map((item, index) => (
            <li
              className="my-4 w-full flex justify-between bg-slate-950 text-white"
              key={index}
            >
              <div className="p-4 w-full flex justify-between">
                <span className="capatilize">{item.name}</span>
                <span>${item.price}</span>
              </div>
              <button  onClick ={()=> deleteItem(item.id)} className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16">
                X
              </button>
            </li>
          ))}
        </ul>
        {
          items.length > 1 && (
            <div className="flex justify-between p-3 text-white">
              <span>Total</span>
              <span>${total}</span>
            </div>
          )
        }
      </div>
    </main>
  );
}
