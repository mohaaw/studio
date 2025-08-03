
'use server';
/**
 * @fileOverview An AI flow to diagnose a reported repair issue.
 *
 * - diagnoseRepair - A function that provides a preliminary diagnosis.
 * - DiagnoseRepairInput - The input type for the diagnoseRepair function.
 * - DiagnoseRepairOutput - The return type for the diagnoseRepair function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const DiagnoseRepairInputSchema = z.object({
  reportedIssue: z.string().describe('The customer-reported issue with the device.'),
});
export type DiagnoseRepairInput = z.infer<typeof DiagnoseRepairInputSchema>;

export const DiagnoseRepairOutputSchema = z.object({
  preliminaryDiagnosis: z.string().describe('A preliminary diagnosis of what might be wrong.'),
  suggestedParts: z.array(z.string()).describe('A list of parts that might be needed for the repair.'),
  estimatedDifficulty: z.enum(['Low', 'Medium', 'High', 'Very High']).describe('The estimated difficulty of the repair.'),
});
export type DiagnoseRepairOutput = z.infer<typeof DiagnoseRepairOutputSchema>;

export async function diagnoseRepair(input: DiagnoseRepairInput): Promise<DiagnoseRepairOutput> {
    const result = await diagnoseRepairFlow(input);
    return result;
}

const prompt = ai.definePrompt({
  name: 'diagnoseRepairPrompt',
  input: {schema: DiagnoseRepairInputSchema},
  output: {schema: DiagnoseRepairOutputSchema},
  prompt: `You are an expert electronics repair technician. A customer has reported an issue with their device.
Your task is to provide a preliminary diagnosis, suggest potential parts needed for the repair, and estimate the repair difficulty.

Analyze the reported issue and provide a concise and professional assessment.

Reported Issue:
"{{{reportedIssue}}}"

Provide your analysis in the required JSON format.`,
});

const diagnoseRepairFlow = ai.defineFlow(
  {
    name: 'diagnoseRepairFlow',
    inputSchema: DiagnoseRepairInputSchema,
    outputSchema: DiagnoseRepairOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
