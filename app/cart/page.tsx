'use client'

import React from 'react'
import AddtoCart from '../components/Cart/AddtoCart'
import { usePathname } from 'next/navigation'

const Cart = () => {
  const path = usePathname()
  return (
    <div ><AddtoCart/></div>
  )
}

export default Cart