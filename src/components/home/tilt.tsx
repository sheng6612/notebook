export default function Hometitle() {
    return (
        <div className="p-4">
            <div className="text-2xl text-gray-600 flex justify-between border-b-4 mb-2">
                <p className="font-bold text-black">notebook</p>
                <div className="flex space-x-4 text-2xl font-bold">
                    <div>button 1</div>
                    <div>button 2</div>
                    <div>button 3</div>
                </div>
            </div>
            <div className="flex h-svh">
                <div className="w-1/4 p-4 border-r-2">text</div>
                <div className="w-3/4 p-4 border-r-2">text</div>
            </div>
        </div>
    );
}