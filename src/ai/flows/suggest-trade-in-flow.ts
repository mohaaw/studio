
'use server';
/**
 * @fileOverview An AI flow to suggest a trade-in value for a used electronic item.
 *
 * - suggestTradeInValue - A function that suggests a value based on item details.
 * - SuggestTradeInValueInput - The input type for the suggestTradeInValue function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTradeInValueInputSchema = z.object({
  name: z.string().describe('The name of the item.'),
  category: z.string().describe('The category the item belongs to.'),
  condition: z.string().describe('The condition of the item (e.g., A-Grade, B-Grade).'),
  specs: z.string().describe('The detailed specifications of the item.'),
});
export type SuggestTradeInValueInput = z.infer<typeof SuggestTradeInValueInputSchema>;

export async function suggestTradeInValue(input: SuggestTradeInValueInput): Promise<number> {
    const result = await suggestTradeInValueFlow(input);
    return result;
}

const prompt = ai.definePrompt({
  name: 'suggestTradeInValuePrompt',
  input: {schema: SuggestTradeInValueInputSchema},
  output: {schema: z.number()},
  prompt: `You are a purchasing expert for a second-hand electronics shop.
Your task is to suggest a fair trade-in value for an item a customer is selling to the shop.

The value should be based on the item's potential resale value, minus a healthy profit margin for the shop (typically 40-60%).
The trade-in value should be lower than what the shop would sell it for.
Consider the item's category, condition, and specifications.
Base your suggestion on current market trends for used electronics.

Return only the suggested numerical price, without any currency symbols or text.

Item Details:
- Name: {{{name}}}
- Category: {{{category}}}
- Condition: {{{condition}}}
- Specifications: {{{specs}}}

Suggested Trade-in Value:`,
});

const suggestTradeInValueFlow = ai.defineFlow(
  {
    name: 'suggestTradeInValueFlow',
    inputSchema: SuggestTradeInValueInputSchema,
    outputSchema: z.number(),
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
