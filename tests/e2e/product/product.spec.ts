import ProductData from '@testDataStaticProduct/product-data';
import { test } from '@fixtures/ui-test-fixture';
import { TestType } from 'src/types';

test.describe('Product feature', async () => {
	test.use({ storageState: './playwright/.auth/customer01.json' });

	test(
		'View one product details',
		{
			tag: '@smoke',
			annotation: {
				type: TestType.Test,
				description: 'https://demo.atlassian.net/browse/JIRA-12',
			},
		},
		async ({ homePage, productPage, navComponent }) => {
			await test.step('View in-stock product details', async () => {
				await homePage.open();
				await homePage.clickProductName(ProductData.basicProduct01.name);
				await navComponent.expectNavigateToProductPage();
				await productPage.expectOutOfStockMessageHidden();
				await productPage.expectAddToCartButtonEnabled();
				await productPage.expectAddToFavouritesButtonEnabled();
			});
			await test.step('View out-of-stock product details', async () => {
				await homePage.open();
				await homePage.clickProductName(ProductData.outOfStockProduct01.name);
				await navComponent.expectNavigateToProductPage();
				await productPage.expectSetQuantityDisabled();
				await productPage.expectOutOfStockMessageShown();
				await productPage.expectAddToCartButtonDisabled();
				await productPage.expectAddToFavouritesButtonEnabled();
			});
		}
	);
});
