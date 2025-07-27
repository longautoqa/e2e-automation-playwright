import { test, Page } from '@playwright/test';
import { Options } from './types';

export class MockApi {
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
}
