// 'use client'
// import React from 'react'
// import { useSearchParams } from 'next/navigation'
// import Resetpassword from '@/app/components/Auth/Resetpassword'


// const page = () => {

//     const paramsObject = useSearchParams()
//     const otp: any = paramsObject.get('otp');
//     const email: any = paramsObject.get('email');
//     console.log("paramsemail,paramsotp", email, otp)

//     return (
//         <div>
//             <Resetpassword otp={otp} email={email} />
//         </div>
//     )
// }

// export default page




import Resetpassword from '@/app/components/Auth/Resetpassword';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Page = () => {
    const paramsObject = useSearchParams();
    const params = new URLSearchParams(paramsObject[0]);
    const otp = params.get('otp');
    const email = params.get('email');

    // Convert otp to a number or use a default value if it's null
    const otpValue: number | null = otp ? parseInt(otp, 10) : null;
    // Provide a default email value if it's null
    const emailValue: string | null = email || null;

    console.log("params email, params otp", emailValue, otpValue);

    return (
        <div>
            <Resetpassword otp={otpValue} email={emailValue} />
        </div>
    );
};

export default Page;
