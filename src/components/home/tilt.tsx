import CardComponent from "../card/card";
import { Button } from "../ui/button";
import Link from "next/link";

 

export default function Hometitle() {
    return (
        <div className="p-4">
            <div className="text-2xl text-gray-600 flex justify-between border-b-4  mb-2">
                <div className="font-bold text-blak">notebook</div>
                <div className="flex space-x-4 text-2xl font-bold">
                    <div className="">
                        <Link href="/hook/login">
                            <Button variant="outline" className="text-2xl">登入</Button>
                        </Link>                            
                    </div>
                    <div>
                        <Link href="/card">
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
            <div className="flex h-svh">
               
                <div className="">
                <CardComponent/>
                </div>
            </div>
        </div>
    );
}//TODO：新增sidebar 主畫面 
//FIXME: card into div