"use client"

import React, { useState } from 'react';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import EditCard from './EditCard';
import AddCard from './AddCard';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

interface CardData {
  id: number;
  title: string;
  description: string;
}

const CardComponent = () => {
  const [cards, setCards] = useState<CardData[]>([
    { id: 1, title: 'Card Name', description: 'Description 1' },
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
      description
    };
    setCards([...cards, newCard]);
  };

  return (
    <div className="p-4 h-screen w-full">
      <div className='flex justify-between'>
        <div className='text-3xl font-bold'>備忘錄</div>
        <div className='flex  px-4'><AddCard onSave={handleAddCard} /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <Card className="relative">
                  <CardHeader>
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                </Card>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem onClick={() => setEditingCardId(card.id)}>Edit</ContextMenuItem>
                    <ContextMenuItem onClick={() => setCards(cards.filter(c => c.id !== card.id))}>Delete</ContextMenuItem>
                    <ContextMenuItem>Move</ContextMenuItem>
                    <ContextMenuItem>Subscription</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardComponent;
//TODO:加入時間選擇 卡片排版 優化 