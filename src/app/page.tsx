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
                    <div>
                        <label className="text-2xl">{new Date().toLocaleDateString('zh-TW', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//g, '/')}</label>
                    </div>
                    <div className="">
                        <Link href="/hook/login">
                            <Button variant="outline" className="text-2xl">登入</Button>
                        </Link>                            
                    </div>
                    <div>
                        <Link href="/hook/card">
                            <Button variant="outline" className="text-2xl font-bold">白板</Button>
                        </Link>
                    </div>
                    <div>
                        <Link href="/hook/journal">
                        <Button variant="outline" className="text-2xl font-bold">日記</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <Homeindex/>
            </div>
            <div className=" flex justify-center   underline decoration-sky-500 ">
                <Link href="/Information_column/update" className="text-2xl ">Updata</Link>
                <Link href="/Information_column/news" className="text-2xl ml-2">News</Link>
            </div>
        </div>
    </div>
  )
}//TODO:button 設計 彈窗提醒 
//FIXME:  重新設計