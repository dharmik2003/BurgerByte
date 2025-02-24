// import OrderDetails from "@/app/components/Myorder/OrderDetails";
// import Spinner from "@/app/components/Spinner/Spinner";
// import React, { Suspense } from "react";

// const page = () => {
//   return (
//     <Suspense
//       fallback={
//         <div className="w-full h-[610px] flex justify-center items-center">
//           <Spinner />
//         </div>
//       }
//     >
//       <OrderDetails />
//     </Suspense>
//   );
// };

// export default page;

import OrderDetails from "@/app/components/Myorder/OrderDetails";
import Spinner from "@/app/components/Spinner/Spinner";
import React, { Suspense } from "react";

// Generate static paths for all possible order IDs
export async function generateStaticParams() {
  try {
    // This is just a placeholder - you should replace this with actual order IDs
    // For example, you could read from a local file, database, or API
    const orderIds = Array.from({ length: 100 }, (_, i) => (i + 1).toString());
    
    return orderIds.map((id) => ({
      id: id,
    }));
  } catch (error) {
    // Fallback to a minimal set of IDs in case of error
    return [{ id: '1' }, { id: '2' }, { id: '3' }];
  }
}

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[610px] flex justify-center items-center">
          <Spinner />
        </div>
      }
    >
      <OrderDetails />
    </Suspense>
  );
};

export default Page;