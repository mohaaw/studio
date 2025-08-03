
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
  platform: z.enum(['default', 'ebay', 'facebook']).optional().describe('The target platform for the listing.'),
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
  prompt: `You are an expert e-commerce copywriter for a second-hand electronics shop.
Your task is to write a compelling, SEO-friendly, and trustworthy product listing.

Item Details:
- Name: {{{name}}}
- Category: {{{category}}}
- Specifications & Notes: {{{specs}}}

{{#if (eq platform "ebay")}}
Generate an eBay listing with a clear title (max 80 chars), a detailed description using bullet points for specs, and a paragraph about our store's commitment to quality and our 90-day warranty.
{{else if (eq platform "facebook")}}
Generate a friendly and concise Facebook Marketplace listing. Start with a catchy question. Mention the condition and key features. End with "DM to purchase!"
{{else}}
Generate a standard product description for our website. It should be 1-2 paragraphs long, highlighting key benefits. The tone should be enthusiastic and trustworthy.
{{/if}}

Generate the product listing now.`,
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
