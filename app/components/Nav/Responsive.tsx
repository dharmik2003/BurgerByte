'use client'
import React, { useState } from 'react'
import Navbar from './Navbar'
import MobileNav from './MobileNav'

const Responsive = () => {
    const [shownavnbar, setshownavnbar]=useState(false)
    const openhandler=()=>setshownavnbar(true)
    const closehandler=()=>setshownavnbar(false)
  return (
    <div>
          <Navbar openNav={openhandler}/>
        <MobileNav showNav={shownavnbar} closeNav={closehandler}/>
    </div>
  )
}

export default Responsive