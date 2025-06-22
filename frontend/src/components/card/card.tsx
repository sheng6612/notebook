'use client';
import { useState, useRef, useEffect } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import EditCard from './EditCard';
import AddCard from './AddCard';



interface CardData {
  id: number;
  title: string;
  description: string;
  x: number;
  y: number;
}

export default function IntegratedCardDrawingTool() {
  const [cards, setCards] = useState<CardData[]>([
    { id: 1, title: '備忘卡片', description: '可以拖動我', x: 100, y: 100 },
  ]);

 
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDrawMode, setIsDrawMode] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [isErasing, setIsErasing] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingCardId, setEditingCardId] = useState<number | null>(null);


  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
  }, [color, brushSize]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;

      ctx.putImageData(imageData, 0, 0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [color, brushSize]);

  const startDrawing = (e: React.MouseEvent) => {
    if (!isDrawMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !isDrawMode) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = isErasing ? '#00000000' : color;
    ctx.lineWidth = brushSize;
    ctx.globalCompositeOperation = isErasing ? 'destination-out' : 'source-over';

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const togglePanel = () => setIsPanelOpen(!isPanelOpen);

  const toggleDrawMode = () => {
    setIsDrawMode(!isDrawMode);
    if (!isDrawMode) setIsPanelOpen(true);
  };


  const handleSave = (id: number, newTitle: string, newDescription: string) => {
      setCards(cards.map(card => 
      card.id === id ? { ...card, title: newTitle, description: newDescription,} : card
      ));
      setEditingCardId(null);
  };

  const handleAddCard = (title: string, description: string) => {
  const container = containerRef.current;
  const offset = cards.length * 20; // 為了避免重疊
  const newCard = {
    id: Date.now(),
    title,
    description,
    x: (container ? container.offsetWidth / 2 : 200) - 100 + offset,
    y: (container ? container.offsetHeight / 2 : 150) - 50 + offset
  };
  setCards([...cards, newCard]);
};

  return (
    <div className="p-4 h-screen w-full bg-gradient-to-b from-slate-200 to-slate-500">
      <div className='flex justify-between mb-4'>
        <div className='text-3xl font-bold'>備忘錄</div>
        <div className='flex space-x-4 px-4'>
          <Link href="/">
            <Button className='text-md font-bold'>返回</Button>
          </Link>
          <Button onClick={toggleDrawMode} className={`text-md font-bold ${isDrawMode ? 'bg-blue-600 hover:bg-blue-700' : ''}`}>
            {isDrawMode ? '停止繪圖' : '開始繪圖'}
          </Button>
          <AddCard onSave={handleAddCard}/>
        </div>
      </div>
      
      <div ref={containerRef} className="relative w-full h-[calc(100vh-100px)]">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full ${isDrawMode ? 'z-0' : 'pointer-events-none z-0'"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
        
        {cards.map(card => (
          <div key={card.id}>
          
            {editingCardId === card.id && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <EditCard
                          initialTitle={card.title}
                          initialDescription={card.description}
                          onSave={(title, description) => handleSave(card.id, title, description)}
                          onCancel={() => setEditingCardId(null)}
                />
                    </div>
                    )}
            <ContextMenu>
              <ContextMenuTrigger>
                <Card
                  className={`absolute cursor-move z-10 select-none ${isDrawMode ? 'pointer-events-none' : ''}`}
                  style={{ left: `${card.x}px`, top: `${card.y}px` }}
                  onMouseDown={(e: React.MouseEvent) => {
                    if (isDrawMode) return;

                    const startX = e.clientX - card.x;
                    const startY = e.clientY - card.y;

                    const onMouseMove = (e: MouseEvent) => {
                      setCards(prevCards =>
                        prevCards.map(c =>
                          c.id === card.id
                            ? { ...c, x: e.clientX - startX, y: e.clientY - startY }
                            : c
                        )
                      );
                    };

                    const onMouseUp = () => {
                      document.removeEventListener('mousemove', onMouseMove);
                      document.removeEventListener('mouseup', onMouseUp);
                    };

                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('mouseup', onMouseUp);
                  }}
                >
                  <CardHeader>
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                </Card>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem onClick={() => setEditingCardId(card.id)}>編輯</ContextMenuItem>
                <ContextMenuItem onClick={() => setCards(cards.filter(c => c.id !== card.id))}>刪除</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
        ))}

        {isPanelOpen && isDrawMode && (
          <div className="absolute top-4 right-4 w-64 bg-white p-4 rounded-lg shadow-md z-20">
            <h2 className="text-xl font-bold mb-4">繪圖工具</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>顏色選擇</span>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-10 h-10 cursor-pointer" />
              </div>
              <div className="flex flex-col">
                <span>筆觸大小: {brushSize}</span>
                <input type="range" min={1} max={30} value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} className="w-full mt-1" />
              </div>
              <div className="flex justify-between items-center">
                <span>橡皮擦</span>
                <button
                  className={`px-3 py-1 rounded ${isErasing ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                  onClick={() => setIsErasing(!isErasing)}
                >
                  {isErasing ? '停用' : '啟用'}
                </button>
              </div>
              <div className="flex justify-between">
                <span>清除畫布</span>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={clearCanvas}>
                  清除
                </button>
              </div>
            </div>
          </div>
        )}

        {isDrawMode && !isPanelOpen && (
          <button className="absolute top-4 right-4 p-2 bg-white rounded-md shadow-md z-20 hover:bg-gray-100" onClick={togglePanel}>
            顯示工具
          </button>
        )}
      </div>
    </div>
  );
}
//TODO::加入時間選擇 必且有動畫
//FIXME:新增卡片 