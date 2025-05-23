import { extractField } from '@apiHelpers/responseHelpers';
import { validateJsonSchema } from '@apiHelpers/validateJsonSchema';
import { test, expect } from '@fixtures/baseUIFixture';
import ProductApi from 'src/api/product/productApi';
import { TestType } from 'src/types';
import { randomString } from 'utils/randomize';

test.describe('Product API feature @product', async () => {
	test(
		'Get list products',
		{
			tag: ['@smoke'],
			annotation: {
				type: TestType.Test,
				description: 'https://demo.atlassian.net/browse/JIRA-23',
			},
		},
		async ({ request }) => {
			const productApi = new ProductApi(request, {});
			const listProductRes = await productApi.getProducts();

			expect(listProductRes).toHaveOKStatus();
			const listProductBody = await listProductRes.json();

			expect(listProductBody.current_page).toEqual(1);
			expect(listProductBody.from).toEqual(1);
			expect(listProductBody.last_page).toEqual(6);
			expect(listProductBody.per_page).toEqual(9);
			expect(listProductBody.to).toEqual(9);
			expect(listProductBody.total).toEqual(50);

			await validateJsonSchema('GET_list_product', 'product', listProductBody);
		}
	);

	test(
		'Get a product',
		{
			tag: ['@smoke'],
			annotation: {
				type: TestType.Test,
				description: 'https://demo.atlassian.net/browse/JIRA-24',
			},
		},
		async ({ request }) => {
			const productApi = new ProductApi(request, {});
			const listProductRes = await productApi.getProducts();

			expect(listProductRes).toHaveOKStatus();
			const listProductBody = await listProductRes.json();
			const getOneProduct = listProductBody.data[0];

			await validateJsonSchema('GET_product', 'product', getOneProduct);
		}
	);

	test(
		'Get a non-existing product',
		{
			annotation: {
				type: TestType.Test,
				description: 'https://demo.atlassian.net/browse/JIRA-25',
			},
		},
		async ({ request }) => {
			const productApi = new ProductApi(request, {});
			const productId = randomString();
			const getProductRes = await productApi.getProduct(productId);

			expect(getProductRes).toHaveNotFoundStatus();
			const errorMsg = await extractField('message', getProductRes);

			expect(errorMsg).toEqual('Requested item not found');
		}
	);
});
