import { test, Page } from '@playwright/test';
import { Options } from './types';

export class MockApi {
	static async mockInvoicesResponse(options: Options, page: Page) {
		await test.step('Mocking invoice API response...', async () => {
			await page.route('**/invoices?page=*', async (route) => {
				await route.fulfill(options);
			});
		});
	}

	static async mockInvoiceResponse(options: Options, page: Page) {
		await test.step('Mocking invoice API response...', async () => {
			await page.route('**/invoices/*', async (route) => {
				await route.fulfill(options);
			});
		});
	}

	static async mockCartResponse(options: Options, page: Page) {
		await test.step('Mocking cart API response...', async () => {
			await page.route('**/carts/*', async (route) => {
				await route.fulfill(options);
			});
		});
	}

	static async mockProductResponse(options: Options, page: Page) {
		await test.step('Mocking product API response', async () => {
			await page.route('**/products/*', async (route) => {
				await route.fulfill(options);
			});
		});
	}

	static async mockGenericResponse(urlPattern: string, options: Options, page: Page) {
		await test.step(`Mocking API response for ${urlPattern}...`, async () => {
			await page.route(urlPattern, async (route) => {
				await route.fulfill(options);
			});
		});
	}

	static async mockErrorResponse(urlPattern: string, status: number, page: Page, errorMessage?: string) {
		await test.step(`Mocking error response for ${urlPattern}...`, async () => {
			await page.route(urlPattern, async (route) => {
				await route.fulfill({
					status,
					json: {
						error: errorMessage || 'Mocked error response',
						status
					}
				});
			});
		});
	}
}
