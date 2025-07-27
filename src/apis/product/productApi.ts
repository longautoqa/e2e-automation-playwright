import BaseApi from '@apisCore/baseApi';
import { Headers } from '@apisCore/types';
import { APIRequestContext } from '@playwright/test';

export default class ProductApi extends BaseApi {
	static readonly PRODUCT = 'products';

	constructor(request: APIRequestContext, headers: Headers) {
		super(request, headers);
	}

	async searchProduct(name: string, page = 1) {
		return await this.get(`${ProductApi.PRODUCT}/search`, {
			params: {
				q: name,
				page: page,
			},
		});
	}

	async getProducts(params?: { [key: string]: string | number }) {
		return await this.get(ProductApi.PRODUCT, { params });
	}

	async getProduct(productId: string) {
		return await this.get(`${ProductApi.PRODUCT}/${productId}`);
	}
}
