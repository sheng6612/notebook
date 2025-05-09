"use client"

import React, { useState } from 'react';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import EditCard from './EditCard';
import AddCard from './AddCard';

interface CardData {
  id: number;
  title: string;
  description: string;
}

const CardComponent = () => {
  const [cards, setCards] = useState<CardData[]>([
    { id: 1, title: 'Card 1', description: 'Description 1' },
    { id: 2, title: 'Card 2', description: 'Description 2' }
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

  const deleteCard = (id: number) => {
    setCards(cards.filter(card => card.id !== id));
  };

  return (
    <div className="p-4">
      <p className='text-3xl m'>備忘錄</p>
      <AddCard onSave={handleAddCard} />

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
            <div className={editingCardId === card.id ? 'opacity-25' : ''}>
              <Card className="relative">
                <CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end">
                  <div className="space-x-2">
                    <button
                      onClick={() => setEditingCardId(card.id)}
                      className="px-2 py-1 bg-blue-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCard(card.id);
                      }}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardComponent;
