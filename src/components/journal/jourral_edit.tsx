import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 

interface EditCardProps {
  initialTitle: string;
  initialDescription: string;
  initiaCalendar_date:string;

  onSave: (title: string, description: string,Calendar_date:string) => void;
  onCancel: () => void;
}

const EditCard: React.FC<EditCardProps> = ({
  initialTitle,
  initialDescription,
  initiaCalendar_date,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [calendar_date, setCalendar_date] = useState<Date>(new Date(initiaCalendar_date));

const handleSave = () => {
  if (title.trim() && description.trim() && calendar_date) {
    const formattedDate = format(calendar_date, "yyyy/MM/dd"); // 沒有秒數與毫秒
    onSave(title, description, formattedDate);
   
    setTitle('');
    setDescription('');
    
  }
};


  return (
    <div className="bg-white rounded-lg shadow-md p-6">
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
                    {calendar_date ? format(calendar_date, "yyyy/MM/dd") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={calendar_date}
                    onSelect={(date) => {
                      if (date) {
                        setCalendar_date(date);
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="flex h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          rows={4}
        />
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default EditCard;
//FIXME:修復時間
