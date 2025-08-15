import Link from "next/link";
import Errorpage_home from "./home/errorpage_home";
import { Button } from "../ui/button";

export default function Errorpage() {
    return (
        <div className="p-5 h-screen w-full bg-slate-700">
            <div className="flex justify-between mb-4">
                <div className="font-mono text-slate-900 text-3xl">administrator</div>
                <div className="flex space-x-4 text-2xl font-bold">
                    <Link href="/Information_column/update">
                        <Button variant="ghost" className="text-3xl font-mono">Updata</Button>
                    </Link>
                </div>
            </div>
            <div>
                <Errorpage_home />
            </div>
        </div>
    )
}