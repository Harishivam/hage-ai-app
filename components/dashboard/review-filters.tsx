'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

interface ReviewFiltersProps {
  onFilterChange: (filters: ReviewFilters) => void;
}

export interface ReviewFilters {
  search: string;
  sentiment: string;
  status: string;
}

export function ReviewFilters({ onFilterChange }: ReviewFiltersProps) {
  const handleReset = () => {
    onFilterChange({ search: '', sentiment: 'all', status: 'all' });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search reviews..."
          className="pl-8"
          onChange={(e) => onFilterChange({ search: e.target.value, sentiment: 'all', status: 'all' })}
        />
      </div>
      <Select onValueChange={(value) => onFilterChange({ search: '', sentiment: value, status: 'all' })}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sentiment" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sentiments</SelectItem>
          <SelectItem value="positive">Positive</SelectItem>
          <SelectItem value="negative">Negative</SelectItem>
          <SelectItem value="neutral">Neutral</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => onFilterChange({ search: '', sentiment: 'all', status: value })}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="genuine">Like</SelectItem>
          <SelectItem value="fake">Reply</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" size="icon" onClick={handleReset}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}