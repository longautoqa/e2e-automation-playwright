import { expect, test } from '@fixtures/baseUIFixture';
import CartApi from 'src/api/cart/cartApi';
import { createCart } from '@api/lib/dataFactory/cart';
import { extractField } from 'src/api/lib/helpers/responseHelpers';
import { getRandomInStockProduct } from '@api/lib/dataFactory/product';
import { validateJsonSchema } from '@apiHelpers/validateJsonSchema';
import { RandomUtils } from '@utils/randomize';
import { createHeaders } from '@api/lib/helpers/authHelpers';
import Env from '@api/lib/helpers/env';
import { Headers } from '@api/baseAPI';

test.describe('Cart API feature', async () => {
	let headers: Headers;
	let cartId: string;
	let productId: string;

	test.beforeAll(async () => {
		headers = await createHeaders(
			Env.CUSTOMER_01_EMAIL,
			Env.CUSTOMER_01_PASSWORD
		);
		cartId = await createCart(headers);
		const getProductRes = await getRandomInStockProduct();
		productId = getProductRes.id;
	});

	test(
		'Create an empty cart',
		{
			tag: ['@smoke', '@positive'],
			annotation: {
				type: 'test',
				description: 'https://demo.atlassian.net/browse/JIRA-19',
			},
		},
		async ({ request }) => {
			const cartApi = new CartApi(request, headers);
			const createCartRes = await cartApi.createCart();

			expect(createCartRes).toHaveCreatedStatus();
			const cartId = await extractField('id', createCartRes);
			const getCartRes = await cartApi.getCart(cartId);

			expect(getCartRes).toHaveOKStatus();
			const getCartBody = await getCartRes.json();

			await validateJsonSchema('GET_cart', 'cart', getCartBody);
		}
	);

	test(
		'Add product to cart',
		{
			tag: ['@smoke', '@positive'],
			annotation: {
				type: 'test',
				description: 'https://demo.atlassian.net/browse/JIRA-20',
			},
		},
		async ({ request }) => {
			const cartApi = new CartApi(request, headers);

			const cartId = await createCart(headers);
			const addProductRes = await cartApi.addProductToCart(cartId, {
				product_id: productId,
				quantity: 1,
			});

			expect(addProductRes).toHaveOKStatus();
			const successMsg = await extractField('result', addProductRes);

			expect(successMsg).toEqual('item added or updated');

			const getCartRes = await cartApi.getCart(cartId);
			const getCartBody = await getCartRes.json();
			const addedProduct = getCartBody.cart_items[0];

			expect(addedProduct.quantity).toEqual(1);
			expect(addedProduct.cart_id).toEqual(cartId);
			expect(addedProduct.product_id).toEqual(productId);
			await validateJsonSchema('GET_cart', 'cart', getCartBody);
		}
	);

	test(
		'Add non-existing product to cart',
		{
			tag: ['@smoke', '@negative'],
			annotation: {
				type: 'test',
				description: 'https://demo.atlassian.net/browse/JIRA-21',
			},
		},
		async ({ request }) => {
			const cartApi = new CartApi(request, headers);

			const addProductRes = await cartApi.addProductToCart(cartId, {
				product_id: RandomUtils.randomString(),
				quantity: 1,
			});

			expect(addProductRes).toHaveUnprocessableContentStatus();
			const addProductBody = await addProductRes.json();

			expect(addProductBody.errors.product_id).toEqual([
				'The selected product id is invalid.',
			]);
		}
	);

	[
		{
			quantity: -1,
			errorMessage: 'The quantity field must be at least 1.',
		},
		{
			quantity: 0,
			errorMessage: 'The quantity field must be at least 1.',
		},
		{
			quantity: 'string',
			errorMessage: 'The quantity field must be an integer.',
		},
	].forEach(({ quantity, errorMessage }) => {
		test(
			`Add product with invalid quantity ${quantity} to cart @negative`,
			{
				tag: '@negative',
				annotation: {
					type: 'test',
					description: 'https://demo.atlassian.net/browse/JIRA-22',
				},
			},
			async ({ request }) => {
				const cartApi = new CartApi(request, headers);
				const addProductRes = await cartApi.addProductToCart(cartId, {
					product_id: productId,
					quantity: quantity,
				});

				expect(addProductRes).toHaveUnprocessableContentStatus();
				const addProductBody = await addProductRes.json();

				expect(addProductBody.message).toEqual(errorMessage);
			}
		);
	});
});
