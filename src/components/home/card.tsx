"use client"

import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

// Modal Component
function Modal({ isOpen, onClose, onSave }) {
    const [inputValue, setInputValue] = useState('');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-xl mb-2">Add New Card</h2>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="border p-2 mb-4 w-full"
                    placeholder="Enter card title"
                />
                <div className="flex justify-end">
                    <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
                    <button onClick={() => { onSave(inputValue); setInputValue(''); }} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
                </div>
            </div>
        </div>
    );
}

export default function Homecard() {
    const [cards, setCards] = useState([
        { title: 'Card1', description: 'Card Description', content: 'Card Content', footer: 'Card Footer' },
        { title: 'Card2', description: 'Card Description', content: 'Card Content', footer: 'Card Footer' }
    ]);
    const [isModalOpen, setModalOpen] = useState(false);

    const addCard = (title) => {
        setCards([...cards, { title, description: 'New Card Description', content: 'New Card Content', footer: 'New Card Footer' }]);
        setModalOpen(false);
    };

    const removeCard = (index) => {
        setCards(cards.filter((_, i) => i !== index));
    };

    return (
        <div className="p-4">
            <button onClick={() => setModalOpen(true)} className="mb-4 px-4 py-2 bg-green-500 text-white rounded">Add Card</button>
            <div className="flex space-x-4 justify-between">
                {cards.map((card, index) => (
                    <Card key={index} className="relative">
                        <CardHeader>
                            <CardTitle>{card.title}</CardTitle>
                            <CardDescription>{card.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>{card.content}</p>
                        </CardContent>
                        <CardFooter>
                            <p>{card.footer}</p>
                        </CardFooter>
                        <button onClick={() => removeCard(index)} className="absolute top-0 right-0 mt-2 mr-2 px-2 py-1 bg-red-500 text-white rounded">Remove</button>
                    </Card>
                ))}
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onSave={addCard} />
        </div>
    );
}//TODO:編輯按鈕
  //FIXME:remove button 