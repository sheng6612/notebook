"use client"

import React, { useState } from 'react';
import Link from "next/link";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import EditCard from './jourral_edit';
import AddCard from './journal_add';

interface CardData {
    id: number;
    title: string;
    description: string;
    Calendar: string; 
  }


export default function Journal(){

    const [cards, setCards] = useState<CardData[]>([
        { id: 1,Calendar:'114/4/3',title: 'Card Name', description: 'Description 1' },
      ]);
    const [editingCardId, setEditingCardId] = useState<number | null>(null);

    const handleSave = (id: number, newTitle: string, newDescription: string) => {
        setCards(cards.map(card => 
        card.id === id ? { ...card, title: newTitle, description: newDescription } : card
        ));
        setEditingCardId(null);
    };
    
  const handleAddCard = (title: string, description: string) => {
    const newCard = {
      id: Date.now(),
      title,
      description,
      Calendar
    };
    setCards([...cards, newCard]);
  };

    return (
        <div className="p-4 h-screen w-full bg-gradient-to-b from-slate-200 to-slate-500">
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
                    <div className="flex justify-between mb-2">
                        <div className="text-3xl fnot-bold">日記</div>
                        <div className="flex px-4 space-x-4"> 
                            <AddCard onSave={handleAddCard} />
                            <Link href="/">
                            <Button variant="outline" className="text-2xl font-bold"> 返回</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-row"> 
                        <div className={editingCardId === card.id ? 'opacity-25' : ''}>
                        <Card className='relative'>
                            <CardHeader>
                                <CardTitle className='text-xl font-bold'>{card.title}</CardTitle>
                                <CardDescription>{card.Calendar}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {card.description}
                            </CardContent>
                            
                            </Card>

                        </div>
                    </div>
                </div>
            ))}
        </div>    
    )
}

//TODO:加入時間選擇器 排版 右鍵選單
//FIXME:Addcard 
