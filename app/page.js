"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [items, setItems] = useState([
    { name: "Coffee", price: 5.0 },
    { name: "Movie", price: 24.5 },
    { name: "candy", price: 6.0 },
    { name: "Dinner", price: 45.5 },
    { name: "Trek", price: 90.0 },
  ]);
  const [total, setTotal] = useState(0)
  
  return (
    <main className={styles.main}>
      <h1 className="text-4xl p-4">Expence Tracker</h1>
      <div className="bg-slate-800 p-4 rounded-lg">
        <form className="grid grid-cols-6 items-center text-black">
          <input
            className="col-span-3 p-3 border"
            type="text"
            placeholder="Enter Item"
          />
          <input
            className="col-span-2 p-3 border mx-3"
            type="number"
            placeholder="Enter amount"
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
              <button className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16">
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
