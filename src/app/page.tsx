//import Hometitle from "@/components/home/tilt";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Homeindex from "./hook/home/page";

export default function HomePage(){
  return(
    <div className="p-4 h-screen w-full bg-gradient-to-b from-slate-200 to-slate-500">
       <div className="">
            <div className="text-2xl text-gray-600 flex justify-between border-b-4  mb-4">
                <div className="font-bold text-blak text-3xl">notebook</div>
                <div className="flex space-x-4 text-2xl font-bold">
                    <div className="">
                        <Link href="/hook/login">
                            <Button variant="outline" className="text-2xl">登入</Button>
                        </Link>                            
                    </div>
                    <div>
                        <Link href="/hook/card">
                            <Button variant="outline" className="text-2xl font-bold">備忘錄</Button>
                        </Link>
                    </div>
                    <div>
                        <Link href="/hook/journal">
                        <Button variant="outline" className="text-2xl font-bold">日記</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="">
                <Homeindex/>
            </div>
        </div>
    </div>
  )
}//TODO：新增sidebar 主畫面設計 
//FIXME: card into div