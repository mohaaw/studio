
'use server';
/**
 * @fileOverview An AI flow to generate marketing content.
 *
 * - generateMarketingCopy - A function that creates marketing copy for a given topic.
 * - GenerateMarketingCopyInput - The input type for the generateMarketingCopy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMarketingCopyInputSchema = z.object({
  topic: z.string().describe('The topic for the marketing content. e.g., "new arrivals of laptops" or "a weekend sale on accessories".'),
  platform: z.enum(['social-media', 'email']).describe('The target platform for the content.'),
});
export type GenerateMarketingCopyInput = z.infer<typeof GenerateMarketingCopyInputSchema>;

export async function generateMarketingCopy(input: GenerateMarketingCopyInput): Promise<string> {
    const result = await generateMarketingCopyFlow(input);
    return result;
}

const prompt = ai.definePrompt({
  name: 'generateMarketingCopyPrompt',
  input: {schema: GenerateMarketingCopyInputSchema},
  output: {schema: z.string()},
  prompt: `You are a marketing specialist for a second-hand electronics shop called TechShop.
Your task is to write a compelling, concise, and friendly marketing message.
The tone should be enthusiastic and trustworthy.

The content should be for the "{{platform}}" platform.
The topic is: "{{topic}}".

Keep the message to 1-3 sentences.
{{#if (eq platform "social-media")}}Add relevant hashtags.{{/if}}
{{#if (eq platform "email")}}Start with a friendly greeting and end with a call to action.{{/if}}

Generate the marketing copy now.`,
});

const generateMarketingCopyFlow = ai.defineFlow(
  {
    name: 'generateMarketingCopyFlow',
    inputSchema: GenerateMarketingCopyInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
