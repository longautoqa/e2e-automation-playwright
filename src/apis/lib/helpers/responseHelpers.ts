import { APIResponse } from '@playwright/test';

export async function extractField(field: string, response: APIResponse) {
	return (await response.json())[field];
}
