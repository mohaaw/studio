
'use server';
/**
 * @fileOverview An AI flow to suggest personalized products for a customer.
 *
 * - suggestPersonalized - A function that suggests products based on purchase history.
 * - SuggestPersonalizedInput - The input type for the suggestPersonalized function.
 * - SuggestPersonalizedOutput - The return type for the suggestPersonalized function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPersonalizedInputSchema = z.object({
  customerName: z.string().describe('The name of the customer.'),
  purchaseHistory: z.array(z.string()).describe('A list of items the customer has previously purchased.'),
});
export type SuggestPersonalizedInput = z.infer<typeof SuggestPersonalizedInputSchema>;

const SuggestPersonalizedOutputSchema = z.object({
    suggestions: z.array(z.object({
        name: z.string().describe('The name of the suggested product.'),
        reasoning: z.string().describe('A brief explanation for why this product is recommended.'),
    })).describe('A list of personalized product suggestions.')
});
export type SuggestPersonalizedOutput = z.infer<typeof SuggestPersonalizedOutputSchema>;


export async function suggestPersonalized(input: SuggestPersonalizedInput): Promise<SuggestPersonalizedOutput> {
    const result = await suggestPersonalizedFlow(input);
    return result;
}

const prompt = ai.definePrompt({
  name: 'suggestPersonalizedPrompt',
  input: {schema: SuggestPersonalizedInputSchema},
  output: {schema: SuggestPersonalizedOutputSchema},
  prompt: `You are a helpful sales assistant at a second-hand electronics store.
A customer is at the checkout, and you need to provide them with personalized product suggestions based on their purchase history.

Analyze the customer's past purchases and suggest 3-4 relevant products they might be interested in.
Provide a short, compelling reason for each suggestion.

Customer Name: {{{customerName}}}

Purchase History:
{{#each purchaseHistory}}
- {{{this}}}
{{/each}}

Generate your suggestions in the required JSON format.`,
});

const suggestPersonalizedFlow = ai.defineFlow(
  {
    name: 'suggestPersonalizedFlow',
    inputSchema: SuggestPersonalizedInputSchema,
    outputSchema: SuggestPersonalizedOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
