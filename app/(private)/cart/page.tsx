'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import AddtoCart from '@/app/components/Cart/AddtoCart'

const Cart = () => {
  const path = usePathname()
  return (
    <div ><AddtoCart/></div>
  )
}

export default Cart