import { test, expect } from '@fixtures/baseUIFixture';
import {
	mockInvoicesResponse,
	mockInvoiceResponse,
} from 'src/mock-api/common-mock-api';
import invoices from '../fixtures/invoices.json';

test.describe('[Visual tests] Invoice feature', async () => {
	test.use({ storageState: './playwright/.auth/customer01.json' });

	test.skip('View invoice details', async ({
		page,
		navComponent,
		accountPage,
		invoicePage,
	}) => {
		await mockInvoicesResponse(
			{
				status: 200,
				json: invoices,
			},
			page
		);

		await navComponent.openInvoicesPageURL();
		await accountPage.expectNavigateToInvoicesPage();

		const invoice = invoices.data[0];
		await mockInvoiceResponse(
			{
				status: 200,
				json: invoice,
			},
			page
		);

		await navComponent.openInvoiceDetailsPageURL(invoice.id);
		await accountPage.expectNavigateToInvoicePage();
		await expect(invoicePage.invoicesTable).toHaveScreenshot(
			'invoice-details.png'
		);
	});
});
