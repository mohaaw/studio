
'use client';

import { useState, useCallback } from 'react';
import { useToast } from './use-toast';

// A simple in-memory cache
const cache = new Map<string, any>();

type AIAction<T, R> = (input: T) => Promise<R>;

export function useOptimizedAI<T, R>() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const callAI = useCallback(async (
    action: AIAction<T, R>,
    input: T,
    cacheKey: string
  ): Promise<R | null> => {
    if (cache.has(cacheKey)) {
      toast({ title: 'Cache Hit', description: 'Returning cached AI response.' });
      return cache.get(cacheKey);
    }

    setLoading(true);
    try {
      const result = await action(input);
      if (result) {
        cache.set(cacheKey, result);
      }
      return result;
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'AI Operation Failed',
        description: error.message || 'An unexpected error occurred.',
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return { loading, callAI };
}
