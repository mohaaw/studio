
'use server';
/**
 * @fileOverview An AI flow to suggest a sale price for a used electronic item.
 *
 * - suggestPrice - A function that suggests a price based on item details.
 * - SuggestPriceInput - The input type for the suggestPrice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPriceInputSchema = z.object({
  name: z.string().describe('The name of the item.'),
  category: z.string().describe('The category the item belongs to.'),
  condition: z.string().describe('The condition of the item (e.g., A-Grade, B-Grade).'),
  specs: z.string().describe('The detailed specifications of the item.'),
  purchasePrice: z.number().optional().describe('The price the shop bought the item for.'),
});
export type SuggestPriceInput = z.infer<typeof SuggestPriceInputSchema>;

export async function suggestPrice(input: SuggestPriceInput): Promise<number> {
    const result = await suggestPriceFlow(input);
    return result;
}

const prompt = ai.definePrompt({
  name: 'suggestPricePrompt',
  input: {schema: SuggestPriceInputSchema},
  output: {schema: z.number()},
  prompt: `You are a pricing expert for a second-hand electronics shop.
Your task is to suggest a competitive and profitable resale price for an item.

Consider the item's category, condition, and specifications.
If a purchase price is provided, ensure the suggested sale price provides a reasonable profit margin (typically 20-40%).
Base your suggestion on current market trends for used electronics.

Return only the suggested numerical price, without any currency symbols or text.

Item Details:
- Name: {{{name}}}
- Category: {{{category}}}
- Condition: {{{condition}}}
- Specifications: {{{specs}}}
{{#if purchasePrice}}- Purchase Price: {{{purchasePrice}}}{{/if}}

Suggested Sale Price:`,
});

const suggestPriceFlow = ai.defineFlow(
  {
    name: 'suggestPriceFlow',
    inputSchema: SuggestPriceInputSchema,
    outputSchema: z.number(),
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
