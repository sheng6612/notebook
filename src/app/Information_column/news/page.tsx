import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function News(){
    return(
        <div className="p-4 h-full w-full bg-gradient-to-b from-slate-200 to-slate-500">
            <div className="text-4xl font-mono"> 
                <h1 >NEWs</h1>
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                        
                    </CardHeader>
                </Card>
            </div>
        </div>
    )

}//TODO:card