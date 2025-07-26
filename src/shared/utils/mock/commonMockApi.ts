import { test, Page } from '@playwright/test';
import { Options } from './types';

export async function mockInvoicesResponse(options: Options, page: Page) {
	await test.step('Mocking invoice API response...', async () => {
		await page.route('**/invoices?page=*', async (route) => {
			await route.fulfill(options);
		});
	});
}

export async function mockInvoiceResponse(options: Options, page: Page) {
	await test.step('Mocking invoice API response...', async () => {
		await page.route('**/invoices/*', async (route) => {
			await route.fulfill(options);
		});
	});
}

export async function mockCartResponse(options: Options, page: Page) {
	await test.step('Mocking cart API response...', async () => {
		await page.route('**/carts/*', async (route) => {
			await route.fulfill(options);
		});
	});
}

export async function mockProductResponse(options: Options, page: Page) {
	await test.step('Mocking product API response', async () => {
		await page.route('**/products/*', async (route) => {
			await route.fulfill(options);
		});
	});
}
