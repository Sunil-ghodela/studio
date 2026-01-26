'use server';
/**
 * @fileOverview An AI flow to generate an image for a vision board.
 *
 * - generateVisionImage - A function that generates an image based on a prompt.
 * - GenerateVisionImageInput - The input type for the function.
 * - GenerateVisionImageOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateVisionImageInputSchema = z.object({
  prompt: z.string().describe('A text description of the image to generate.'),
});
export type GenerateVisionImageInput = z.infer<typeof GenerateVisionImageInputSchema>;

const GenerateVisionImageOutputSchema = z.object({
  imageUrl: z.string().describe("The generated image as a data URI."),
});
export type GenerateVisionImageOutput = z.infer<typeof GenerateVisionImageOutputSchema>;

export async function generateVisionImage(input: GenerateVisionImageInput): Promise<GenerateVisionImageOutput> {
  return generateVisionImageFlow(input);
}

const generateVisionImageFlow = ai.defineFlow(
  {
    name: 'generateVisionImageFlow',
    inputSchema: GenerateVisionImageInputSchema,
    outputSchema: GenerateVisionImageOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: `A vibrant, inspiring, and visually appealing image for a vision board. The image should represent the following concept: ${input.prompt}. Style: photorealistic, high-resolution, centered subject.`,
    });

    if (!media.url) {
      throw new Error('Image generation failed.');
    }

    return { imageUrl: media.url };
  }
);
