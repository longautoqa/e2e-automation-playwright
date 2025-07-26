import _ from 'lodash';

import { expect } from '@fixtures/baseAPIFixture';
import { request } from '@playwright/test';
import ProductApi from 'src/apis/product/productApi';

// Get list products on 1st page
async function getListProducts() {
	let products: any[];

	const productApi = new ProductApi(await request.newContext(), {});
	await expect(async () => {
		const productRes = await productApi.getProducts();
		expect(productRes).toHaveOKStatus();

		const productBody = await productRes.json();
		products = productBody.data;
	}).toPass({
		intervals: [1_000, 2_000, 5_000],
		timeout: 20_000,
	});

	return products;
}

export async function getRandomInStockProduct() {
	const products = await getListProducts();
	const inStockProducts = products.filter((product) => product.in_stock);
	return _.sample(inStockProducts);
}

export async function getRandomInStockProductId() {
	const products = await getListProducts();
	const product = _.sample(products.filter((product) => product.in_stock));
	return product.id;
}

export async function getRandomInStockProducts(count: number) {
	const products = await getListProducts();
	const inStockProducts = products.filter((product) => product.in_stock);
	if (count < 2) throw new Error('Count must be greater than 1');
	return _.sampleSize(inStockProducts, count);
}

export async function getRandomInStockProductIds(count: number) {
	const products = await getListProducts();
	const inStockProducts = products.filter((product) => product.in_stock);
	if (count < 2) throw new Error('Count must be greater than 1');
	const results = _.sampleSize(inStockProducts, count);
	return _.map(results, 'id');
}

export async function getRandomOutOfStockProduct() {
	const products = await getListProducts();
	const outOfStockProducts = products.filter((product) => !product.in_stock);

	return _.sample(outOfStockProducts);
}
