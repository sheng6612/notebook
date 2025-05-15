

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Login() {
    return (
    <div className="h-screen w-full bg-gradient-to-b from-slate-200 to-slate-500  flex justify-center items-center">
      
      <Card className="w-full max-w-md ">
    <CardHeader>
      <CardTitle className="text-center text-2xl font-bold">Notebook</CardTitle>
      <CardDescription>Login</CardDescription>
    </CardHeader>
    <CardContent>
      <form>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="User_name">UserName</label>
            <Input id= "User_name"  placeholder="Is your Name"/>
          </div>
          <div>
            <label htmlFor="Password">Password</label>
            <Input id="Password" placeholder="Password"/>
          </div>
        </div>
      </form>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Link href="/">
        <Button variant="outline">return</Button>
      </Link>
      <Button>Lonig</Button> 
    </CardFooter>
  </Card>

    </div>
    )
    
}