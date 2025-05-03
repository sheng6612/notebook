"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
//import { Button } from "@/components/ui/button"

export default function Login() {
    return (
    <div className="h-screen w-full bg-gradient-to-b from-slate-200 to-slate-500  flex justify-center items-center">
      <Card>
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription></CardDescription>
    </CardHeader>
    <CardContent>
      <p>Card Content</p>
    </CardContent>
    <CardFooter>
      <p>Card Footer</p>
    </CardFooter>
  </Card>

    </div>
    )
    
}//TODO:排版card;