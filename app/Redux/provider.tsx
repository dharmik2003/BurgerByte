'use client'
import React from 'react'
import { Provider } from 'react-redux'
import store from './store'

const Reduxprovider = ({ children }:{children:React.ReactNode}) => {
  return (
   <Provider store={store}>

          {/* <Responsive /> */}
          {children}
          {/* <Footer /> */}
    
    </Provider>
  )
}

export default Reduxprovider