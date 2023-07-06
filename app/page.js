"use client"
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { useState, useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [items, setItems] = useState([
    {name:"Coffee", price:5.00},
    {name:"Movie", price:24.50},
    {name:"candy", price:6.00},
    {name:"Dinner", price:45.50},,
    {name:"Trek", price:90.00},
  ])
  
  return (
    <main className={styles.main}>
      <h1 className='text-4xl p-4'>Expence Tracker</h1>
      <div className='bg-slate-800 p-4 rounded-lg'>
        <form className='grid grid-cols-6 items-center text-black'>
          <input className='col-span-3 p-3 border' type="text" placeholder='Enter Item' />
          <input className='col-span-2 p-3 border mx-3' type="number"  placeholder="Enter amount" />
          <button className='bg-slate-950 text-white hover:bg-slate-900 p-3 text-xl' type='submit'>+</button>
        </form>
      </div>
    </main>
  )
}
