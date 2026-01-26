'use server';

import { suggestTaskPriority, type SuggestTaskPriorityOutput } from '@/ai/flows/suggest-task-priority';
import { z } from 'zod';

const prioritySchema = z.enum(['High', 'Medium', 'Low']);

export async function getPrioritySuggestion(taskDescription: string): Promise<SuggestTaskPriorityOutput['priority']> {
  if (!taskDescription) {
    throw new Error('Task description is required to suggest a priority.');
  }
  try {
    const result = await suggestTaskPriority({ taskDescription });
    const validatedPriority = prioritySchema.parse(result.priority);
    return validatedPriority;
  } catch (error) {
    console.error('Error suggesting task priority:', error);
    throw new Error('Failed to get priority suggestion from AI.');
  }
}
