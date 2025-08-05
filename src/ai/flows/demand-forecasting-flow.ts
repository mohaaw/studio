
'use server';
/**
 * @fileOverview An AI flow to forecast product demand.
 *
 * - forecastDemand - A function that predicts future demand from historical data.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HistoricalDataPointSchema = z.object({
  month: z.string(),
  demand: z.number(),
});

const ForecastDemandInputSchema = z.object({
  historicalData: z.array(HistoricalDataPointSchema).describe('The historical sales data for the past 6-12 months.'),
  productCategory: z.string().describe('The product category for which to forecast demand.'),
  forecastPeriod: z.number().describe('The number of months to forecast into the future.'),
});

const ForecastDataPointSchema = z.object({
    month: z.string().describe('The month for the data point.'),
    demand: z.number().describe('The actual or predicted demand value.'),
    predicted: z.boolean().describe('Whether this data point is a prediction.'),
});

const ForecastDemandOutputSchema = z.object({
  forecast: z.array(ForecastDataPointSchema),
});
export type ForecastDemandOutput = z.infer<typeof ForecastDemandOutputSchema>;

export async function forecastDemand(input: z.infer<typeof ForecastDemandInputSchema>): Promise<ForecastDemandOutput> {
    const result = await forecastDemandFlow(input);
    return result;
}

const prompt = ai.definePrompt({
  name: 'forecastDemandPrompt',
  input: {schema: ForecastDemandInputSchema},
  output: {schema: ForecastDemandOutputSchema},
  prompt: `You are a data scientist specializing in demand forecasting for retail.
Your task is to analyze historical sales data for a specific product category and predict the demand for the next few months.

Analyze the provided historical data for trends, seasonality, and any apparent patterns.
Based on your analysis, generate a plausible forecast for the specified number of months.

- Product Category: "{{productCategory}}"
- Forecast Period: {{forecastPeriod}} months

Historical Data:
{{#each historicalData}}
- {{month}}: {{demand}} units
{{/each}}

Return a JSON object containing the full data series, including both the original historical data and your new predictions.
For each data point, include the month, the demand value, and a boolean 'predicted' flag.
Set 'predicted' to false for historical points and true for your forecasted points.
Ensure the months in the forecast continue logically from the historical data (e.g., if history ends in June, forecast starts in July).`,
});

const forecastDemandFlow = ai.defineFlow(
  {
    name: 'forecastDemandFlow',
    inputSchema: ForecastDemandInputSchema,
    outputSchema: ForecastDemandOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
