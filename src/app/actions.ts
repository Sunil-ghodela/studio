'use server';

import { suggestTaskPriority, type SuggestTaskPriorityOutput } from '@/ai/flows/suggest-task-priority';
import { generateVisionImage, type GenerateVisionImageOutput } from '@/ai/flows/generate-vision-image';
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

export async function generateVisionImageAction(prompt: string): Promise<GenerateVisionImageOutput['imageUrl']> {
  if (!prompt) {
    throw new Error('A prompt is required to generate an image.');
  }
  try {
    const result = await generateVisionImage({ prompt });
    return result.imageUrl;
  } catch (error) {
    console.error('Error generating vision image:', error);
    throw new Error('Failed to generate image from AI.');
  }
}
