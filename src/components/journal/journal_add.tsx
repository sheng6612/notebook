"use client"

import React, { useState } from 'react';

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 

interface AddCardProps {
  onSave: (title: string, description: string, calendar_date: string) => void;
}

const AddCard: React.FC<AddCardProps> = ({ onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const[calendar_date,setCalendar_date]=React.useState<Date>()
  

  const handleSave = () => {
    if (title.trim() && description.trim() && calendar_date){ 
      onSave(title, description, calendar_date.toISOString());
      setIsOpen(false);
      setTitle('');
      setDescription('');
      setCalendar_date(calendar_date);
    }
  };

  return (
    <>
      <div className='flex justify-start'>
      <button 
        onClick={() => setIsOpen(true)}
        className="  mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Add Journal
      </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Journal</h2>
            <div className="space-y-4">
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
                    {calendar_date ? format(calendar_date, "PPP") : <span>Pick a date</span>}
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
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full px-3 py-2 border rounded-md"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full px-3 py-2 border rounded-md"
                rows={4}
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCard;
//TODO:新增 時間選擇器
//FIXME:時間 刪除秒數