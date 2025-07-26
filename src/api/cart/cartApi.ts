import BaseApi, { Headers } from '@api/baseAPI';
import { APIRequestContext } from '@playwright/test';

import Env from '@api/lib/helpers/env';
import { AddProductToCart } from './types';

export default class CartApi extends BaseApi {
	static readonly cartEndpoint = 'carts';

	private endpoint: string;

	constructor(request: APIRequestContext, headers: Headers) {
		super(request, headers);
		this.endpoint = Env.API_URL + CartApi.cartEndpoint;
	}

	async createCart() {
		return await this.request.post(this.endpoint, {
			headers: this.headers,
		});
	}

	async addProductToCart(cartId: string, data: AddProductToCart) {
		return await this.request.post(this.endpoint + `/${cartId}`, {
			data: data,
			headers: this.headers,
		});
	}

	async getCart(cartId: string) {
		return await this.request.get(this.endpoint + `/${cartId}`, {
			headers: this.headers,
		});
	}

	async updateProductQty(cartId: string, data: any) {
		return await this.request.put(this.endpoint + `/${cartId}`, {
			data: data,
			headers: this.headers,
		});
	}

	async removeProduct(cartId: string, productId: string) {
		return await this.request.delete(
			`${this.endpoint}/${cartId}/product/${productId}`,
			{
				headers: this.headers,
			}
		);
	}

	async deleteCart(cartId: string) {
		return await this.request.delete(this.endpoint + `/${cartId}`, {
			headers: this.headers,
		});
	}
}
