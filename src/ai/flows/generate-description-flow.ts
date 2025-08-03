
'use server';
/**
 * @fileOverview An AI flow to generate product descriptions.
 *
 * - generateDescription - A function that creates a product description from item details.
 * - GenerateDescriptionInput - The input type for the generateDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDescriptionInputSchema = z.object({
  name: z.string().describe('The name of the item.'),
  category: z.string().describe('The category the item belongs to.'),
  specs: z.string().describe('The detailed specifications of the item.'),
});
export type GenerateDescriptionInput = z.infer<typeof GenerateDescriptionInputSchema>;

export async function generateDescription(input: GenerateDescriptionInput): Promise<string> {
    const result = await generateDescriptionFlow(input);
    return result;
}

const prompt = ai.definePrompt({
  name: 'generateDescriptionPrompt',
  input: {schema: GenerateDescriptionInputSchema},
  output: {schema: z.string()},
  prompt: `You are a marketing expert for a second-hand electronics shop.
Your task is to write a compelling, concise, and friendly product description for an item.

The description should be 1-2 paragraphs long and highlight the key features and benefits for a potential customer.
Do not just list the specs. Instead, translate them into tangible benefits.
Be enthusiastic and trustworthy.

Item Details:
- Name: {{{name}}}
- Category: {{{category}}}
- Specifications: {{{specs}}}

Generate the product description now.`,
});

const generateDescriptionFlow = ai.defineFlow(
  {
    name: 'generateDescriptionFlow',
    inputSchema: GenerateDescriptionInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
