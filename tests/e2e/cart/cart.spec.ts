import {
	getRandomInStockProductId,
	getRandomInStockProductIds,
} from '@testDataFactory/product-data-factory';
import { test } from '@fixtures/ui-test-fixture';
import { TestType } from 'src/types';

test.describe('Product cart feature as logged in user @cart', async () => {
	test.use({ storageState: './playwright/.auth/customer02.json' });

	test(
		'Add one product to cart',
		{
			tag: '@smoke',
			annotation: {
				type: TestType.Test,
				description: 'https://demo.atlassian.net/browse/JIRA-01',
			},
		},
		async ({ productPage, navComponent }) => {
			const productId = await getRandomInStockProductId();

			await navComponent.openProductPageURL(productId);
			await navComponent.expectNavigateToProductPage();
			await productPage.clickAddToCart();
			await productPage.expectAddedProductToCartSuccessMsg();
			await productPage.closeToastMessageBox();
			await productPage.expectToastMessageBoxHidden();
			await navComponent.expectCartQuantity(1);
		}
	);

	test(
		'Add same product to cart',
		{
			tag: '@smoke',
			annotation: {
				type: TestType.Test,
				description: 'https://demo.atlassian.net/browse/JIRA-02',
			},
		},
		async ({ productPage, navComponent }) => {
			const productId = await getRandomInStockProductId();

			await test.step(`Add product with ${productId} - quantity (1) to cart`, async () => {
				await navComponent.openProductPageURL(productId);
				await navComponent.expectNavigateToProductPage();
				await productPage.clickAddToCart();
				await productPage.expectAddedProductToCartSuccessMsg();
				await productPage.closeToastMessageBox();
				await productPage.expectToastMessageBoxHidden();
				await navComponent.expectCartQuantity(1);
			});
			await test.step(`Add product with ${productId} - quantity (1) again to cart`, async () => {
				await navComponent.openProductPageURL(productId);
				await navComponent.expectNavigateToProductPage();
				await productPage.clickAddToCart();
				await productPage.expectAddedProductToCartSuccessMsg();
				await productPage.closeToastMessageBox();
				await productPage.expectToastMessageBoxHidden();
				await navComponent.expectCartQuantity(2);
			});
		}
	);

	test(
		'Add two products to cart',
		{
			tag: '@smoke',
			annotation: {
				type: TestType.Test,
				description: 'https://demo.atlassian.net/browse/JIRA-03',
			},
		},
		async ({ productPage, navComponent }) => {
			const productIds = await getRandomInStockProductIds(2);

			await test.step(`Add product with ${productIds[0]} with quantity is 1 to cart`, async () => {
				await navComponent.openProductPageURL(productIds[0]);
				await navComponent.expectNavigateToProductPage();
				await productPage.clickAddToCart();
				await productPage.expectAddedProductToCartSuccessMsg();
				await productPage.closeToastMessageBox();
				await productPage.expectToastMessageBoxHidden();
				await navComponent.expectCartQuantity(1);
			});
			await test.step(`Add product with ${productIds[1]} with quantity is 1 to cart`, async () => {
				await navComponent.openProductPageURL(productIds[1]);
				await navComponent.expectNavigateToProductPage();
				await productPage.clickAddToCart();
				await productPage.expectAddedProductToCartSuccessMsg();
				await productPage.closeToastMessageBox();
				await productPage.expectToastMessageBoxHidden();
				await navComponent.expectCartQuantity(2);
			});
		}
	);
});
