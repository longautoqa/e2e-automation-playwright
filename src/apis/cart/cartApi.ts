import BaseApi from '@apisCore/baseApi';
import { Headers } from '@apisCore/types';
import { APIRequestContext } from '@playwright/test';
import { AddProductToCart } from './types';

export default class CartApi extends BaseApi {
	static readonly CART = 'carts';

	constructor(request: APIRequestContext, headers: Headers) {
		super(request, headers);
	}

	async createCart() {
		return await this.post(CartApi.CART);
	}

	async addProductToCart(cartId: string, data: AddProductToCart) {
		return await this.post(`${CartApi.CART}/${cartId}`, { data });
	}

	async getCart(cartId: string) {
		return await this.get(`${CartApi.CART}/${cartId}`);
	}

	async updateProductQty(cartId: string, data: any) {
		return await this.put(`${CartApi.CART}/${cartId}`, { data });
	}

	async removeProduct(cartId: string, productId: string) {
		return await this.delete(
			`${CartApi.CART}/${cartId}/product/${productId}`
		);
	}

	async deleteCart(cartId: string) {
		return await this.delete(`${CartApi.CART}/${cartId}`);
	}
}
