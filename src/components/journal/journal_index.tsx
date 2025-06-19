"use client"

import React, { useState } from 'react';
import { format } from 'date-fns';
import Link from "next/link";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Calendar as CalendarIcon } from "lucide-react"

import EditCard from './jourral_edit';
import AddCard from './journal_add';

interface CardData {
    id: number;
    title: string;
    description: string;
    Calendar_date:string;
  }


export default function Journal(){

    const [cards, setCards] = useState<CardData[]>([
        { id: 1,Calendar_date:'114/4/3',title: 'Card Name', description: 'Description 1' },
      ]);
    const [editingCardId, setEditingCardId] = useState<number | null>(null);
    const [calendar_date, setCalendar_date] = useState<Date | undefined>(undefined);

    const handleSave = (id: number, newTitle: string, newDescription: string,newCalendar_date:string) => {
        setCards(cards.map(card => 
        card.id === id ? { ...card, title: newTitle, description: newDescription,Calendar_date:newCalendar_date } : card
        ));
        setEditingCardId(null);
    };
    
  const handleAddCard = (title: string, description: string, calendar_date: string) => {
    const newCard = {
      id: Date.now(),
      title,
      description,
      Calendar_date: calendar_date
    };
    setCards([...cards, newCard]);
  };
    return (
        <div className="p-4 h-screen w-full bg-gradient-to-b from-slate-200 to-slate-500">
            <div className="flex justify-between mb-2">
                        <div className="text-3xl font-bold">日記</div>
                        <div className="flex px-4 space-x-4"> 
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !calendar_date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {calendar_date ? format(calendar_date, "yyyy/MM/dd") : <span >Pick a date</span>}

                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={calendar_date}
                        onSelect={setCalendar_date}
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
                            <AddCard onSave={handleAddCard} />
                            <Link href="/">
                            <Button variant="outline" className="text-2xl font-bold"> 返回</Button>
                            </Link>

                        </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {cards.map(card => (
                <div key={card.id}>
                    {editingCardId === card.id && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <EditCard
                        initialTitle={card.title}
                        initialDescription={card.description}
                        initiaCalendar_date={card.Calendar_date}
                        onSave={(title, description,Calendar_date) => handleSave(card.id, title, description,Calendar_date)}
                        onCancel={() => setEditingCardId(null)}
                        />
                    </div>
                    )}
                    
                    <div className="flex flex-row"> 
                        <div className={editingCardId === card.id ? 'opacity-25' : ''}>
                        <ContextMenu>
                            <ContextMenuTrigger>
                                <Card className='relative'>
                                    <CardHeader>
                                        <CardTitle className='text-xl font-bold'>{card.title}</CardTitle>
                                        <CardDescription>{card.Calendar_date}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {card.description}
                                    </CardContent>
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
                    </div>
                </div>
            ))}
            </div>
        </div>    
    )
}

//TODO:加入時間選擇器 排版 右鍵選單

