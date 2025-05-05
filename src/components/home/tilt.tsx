import { Button } from "../ui/button";
import Link from "next/link";
 
export default function Hometitle() {
    return (
        <div className="p-4">
            <div className="text-2xl text-gray-600 flex justify-between border-b-4 border-gray-500 mb-2">
                <p className="font-bold text-black">notebook</p>
                <div className="flex space-x-4 text-2xl font-bold">
                    <div className="">
                        <Link href="/login/page">
                            <Button variant="outline" className="text-2xl">登入</Button>
                        </Link>                            
                    </div>
                    <div>button 2</div>
                    <div>button 3</div>
                </div>
            </div>
            <div className="flex h-svh">
                <div className="w-1/4 p-4 border-r-2">
                    <div>sidebr</div>
                </div>
                <div className="w-3/4 p-4 border-r-2">
                <label className="flex-grow p-4 border-b-2 border-gray-300">新增日記</label>
                    <div className="flex justify-between">
                    <textarea
                    className="flex-grow p-2 border border-gray-300 resize text-left"
                    placeholder="Enter text"
                    rows={4}/>
                    </div>
                <Button className="flex " variant="secondary">確認</Button>
                </div>
            </div>
        </div>
    );
}//TODO：新增sidebar 
//FIXME: fix link