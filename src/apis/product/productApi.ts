import BaseApi, { Headers } from '@apis/baseAPI';
import { APIRequestContext } from '@playwright/test';
import Env from '@utils/env';

export default class ProductApi extends BaseApi {
	private endpoint: string;

	constructor(request: APIRequestContext, headers: Headers) {
		super(request, headers);
		this.endpoint = Env.API_URL + 'products';
	}

	async searchProduct(name: string, page = 1) {
		return await this.request.get(`${this.endpoint}/search`, {
			params: {
				q: name,
				page: page,
			},
		});
	}

	async getProducts(params?: { [key: string]: string | number }) {
		return await this.request.get(this.endpoint, {
			params: params,
		});
	}

	async getProduct(productId: string) {
		return await this.request.get(`${this.endpoint}/${productId}`);
	}
}
