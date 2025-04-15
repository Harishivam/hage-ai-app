'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CSVUpload } from './csv-upload';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  review: z.string().min(10, 'Review must be at least 10 characters'),
  source: z.string().url('Please enter a valid URL').optional(),
});

interface ReviewFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  onCsvUpload: (file: File) => Promise<void>;
  isAnalyzing?: boolean;
}

export function ReviewForm({ onSubmit, onCsvUpload, isAnalyzing }: ReviewFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      review: '',
      source: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Social Media Link (Optional)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://www.example.com/post/123"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review Text</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter the review text to analyze..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <Button type="submit" className="flex-1" disabled={isAnalyzing}>
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Review'
            )}
          </Button>
          <CSVUpload onUpload={onCsvUpload} isAnalyzing={isAnalyzing} />
        </div>
      </form>
    </Form>
  );
}