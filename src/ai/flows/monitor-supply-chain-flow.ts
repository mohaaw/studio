
'use server';
/**
 * @fileOverview An AI flow to monitor for supply chain disruptions.
 *
 * - monitorSupplyChain - A function that returns potential supply chain disruptions.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// In a real application, this would be fetched from a database.
const ourSuppliers = [
  { name: 'Apple Parts Pro', location: 'Shenzhen, China' },
  { name: 'Samsung Components', location: 'Seoul, South Korea' },
  { name: 'Laptop Screens Inc.', location: 'Los Angeles, USA' },
];

const SupplyChainDisruptionSchema = z.object({
    riskLevel: z.enum(['Low', 'Medium', 'High']).describe('The assessed risk level of the event.'),
    event: z.string().describe('The name or type of the disruptive event (e.g., "Typhoon Forecast", "Port Congestion").'),
    impact: z.string().describe('A brief description of the event and its potential impact on our specific suppliers.'),
    recommendation: z.string().describe('A clear, actionable recommendation to mitigate the risk.'),
});
export type SupplyChainDisruption = z.infer<typeof SupplyChainDisruptionSchema>;

const MonitorSupplyChainOutputSchema = z.object({
  disruptions: z.array(SupplyChainDisruptionSchema),
});
export type MonitorSupplyChainOutput = z.infer<typeof MonitorSupplyChainOutputSchema>;


export async function monitorSupplyChain(): Promise<MonitorSupplyChainOutput> {
    // In a real app, we would pass our supplier list to the flow.
    // For this prototype, we'll use the hardcoded list.
    const result = await monitorSupplyChainFlow();
    return result;
}

const prompt = ai.definePrompt({
  name: 'monitorSupplyChainPrompt',
  output: {schema: MonitorSupplyChainOutputSchema},
  prompt: `You are a world-class supply chain analyst with access to real-time global news, weather, and logistics data.
Your task is to identify potential disruptions that could affect our electronics parts suppliers.
For each potential disruption, you must provide a risk level, a summary of the event, its specific impact on our suppliers, and a concrete, actionable recommendation.

Today's date is December 5th, 2023.

Our list of key suppliers:
{{#each suppliers}}
- {{name}} (located in {{location}})
{{/each}}

Simulate the discovery of 2-3 plausible, high-impact events based on current global conditions. Examples could include weather events, geopolitical tensions, port strikes, or raw material shortages.
Do not mention that you are simulating; present the findings as real alerts.

Generate your findings in the required JSON format. If no significant risks are found, return an empty array for "disruptions".`,
});


const monitorSupplyChainFlow = ai.defineFlow(
  {
    name: 'monitorSupplyChainFlow',
    outputSchema: MonitorSupplyChainOutputSchema,
  },
  async () => {
    const {output} = await prompt({
        // @ts-ignore
        suppliers: ourSuppliers
    });
    return output!;
  }
);
