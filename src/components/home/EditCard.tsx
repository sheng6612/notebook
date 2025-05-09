import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface EditCardProps {
  initialTitle: string;
  initialDescription: string;
  onSave: (title: string, description: string) => void;
  onCancel: () => void;
}

const EditCard: React.FC<EditCardProps> = ({
  initialTitle,
  initialDescription,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleSave = () => {
    if (title.trim() && description.trim()) {
      onSave(title, description);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="space-y-4">
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
