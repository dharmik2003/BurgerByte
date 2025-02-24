"use client"

import { useState } from "react"
import { Pendding } from "@/app/components/Admin/Pendding"
import { Rejected } from "@/app/components/Admin/Rejected"
import { Accepted } from "@/app/components/Admin/Accepted"
import { DispatchOrders } from "@/app/components/Admin/DispatchOrders"

const Page = () => {
  const [activeDiv, setActiveDiv] = useState("Pending Orders")

  const buttons = ["Pending Orders", "Rejected Orders", "Accepted Orders", "Dispatch Orders"]

  const renderActiveComponent = () => {
    switch (activeDiv) {
      case "Pending Orders":
        return <Pendding />
      case "Rejected Orders":
        return <Rejected />
      case "Accepted Orders":
        return <Accepted />
      case "Dispatch Orders":
        return <DispatchOrders />
      default:
        return null
    }
  }

  return (
    <div className="w-full h-full bg-[#f4f1ea] p-6">
      <div className="flex gap-2 mt-2">
        {buttons.map((button) => (
          <button
            key={button}
            onClick={() => setActiveDiv(button)}
            className={`${
              activeDiv === button
                ? "bg-orange-600 text-white border border-orange-600"
                : "bg-white text-black border border-[#B0B0B0]"
            } px-3 lg:mr-2 py-1 rounded-md hover:bg-blue-950 text-sm lg:text-xl hover:text-white`}
          >
            {button}
          </button>
        ))}
      </div>

      <div className="flex w-full flex-col">{renderActiveComponent()}</div>
    </div>
  )
}

export default Page

