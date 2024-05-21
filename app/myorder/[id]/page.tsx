'use client'
import OrderDetails from '@/app/components/Myorder/OrderDetails'
import { useParams } from 'next/navigation';
import React from 'react'

const page = () => {

    return (
        <div>
            <OrderDetails />
        </div>
    )
}

export default page