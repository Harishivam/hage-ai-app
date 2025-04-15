'use client';

import { FileAnalysis } from '@/lib/types/review';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FileSelectorProps {
  files: FileAnalysis[];
  currentFileId: string | null;
  onFileSelect: (fileId: string) => void;
}

export function FileSelector({ files, currentFileId, onFileSelect }: FileSelectorProps) {
  if (files.length === 0) {
    return null;
  }

  return (
    <Select
      value={currentFileId || undefined}
      onValueChange={onFileSelect}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select file" />
      </SelectTrigger>
      <SelectContent>
        {files.map((file) => (
          <SelectItem key={file.id} value={file.id}>
            {file.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}