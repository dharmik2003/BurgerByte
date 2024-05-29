'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import Resetpassword from '@/app/components/Auth/Resetpassword'


const page = () => {

    const paramsObject = useSearchParams()
    const otp: any = paramsObject.get('otp');
    const email: any = paramsObject.get('email');
    console.log("paramsemail,paramsotp", email, otp)

    return (
        <div>
            <Resetpassword otp={otp} email={email} />
        </div>
    )
}

export default page