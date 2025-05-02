"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Login() {
    return (
    <div className="h-screen w-full bg-gradient-to-b from-slate-200 to-slate-500  flex justify-center items-center">
        <div className="text-3xl font-bold">Login</div>
        <Link href={"/home/tilt"}  >
          <Button variant="secondary" />
        </Link>
      </div>
    )
    
}