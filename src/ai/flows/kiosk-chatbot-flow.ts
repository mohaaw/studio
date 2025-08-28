
'use server';
/**
 * @fileOverview A chatbot for the customer-facing kiosk.
 *
 * - kioskChat - A function that responds to customer queries.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CONTEXT = `
You are a friendly and helpful AI assistant for CoreSync, a second-hand electronics store.
Your role is to answer customer questions at the self-service kiosk.

About CoreSync:
- We sell used electronics like phones, laptops, wearables, and accessories.
- We also offer repair services. Customers can check their repair status with a ticket number on the kiosk.
- We offer a trade-in program for customers to sell their old devices.
- Our products are graded by condition (A-Grade, B-Grade, etc.).
- We offer a standard 90-day warranty on all "For Sale" items.
- We cannot check live inventory for specific models through this chat. Please advise the customer to browse the product catalog on the kiosk or ask a staff member for help.
- Be polite, concise, and helpful.
`;

export async function kioskChat(query: string): Promise<string> {
  const result = await kioskChatFlow(query);
  return result;
}

const prompt = ai.definePrompt({
  name: 'kioskChatPrompt',
  system: CONTEXT,
  input: {schema: z.string()},
  output: {schema: z.string()},
  prompt: `A customer has a question: "{{input}}"`,
});

const kioskChatFlow = ai.defineFlow(
  {
    name: 'kioskChatFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (query) => {
    const {output} = await prompt(query);
    return output!;
  }
);
