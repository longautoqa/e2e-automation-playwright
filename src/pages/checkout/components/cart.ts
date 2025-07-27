import { Page } from '@playwright/test';
import { ProductInputModel } from '../../product/types';
import { step } from 'playwright-helpers';
import BasePage from '@pages/core/base-page';

export default class CartComponent extends BasePage {
	constructor(page: Page) {
		super(page);
	}

	/**
	 * Locators
	 */
	readonly wizardSteps = this.page.locator('.wizard-steps');
	readonly productItem = (productName: string) =>
		this.wizardSteps.filter({ hasText: new RegExp(productName) });
	readonly productName = (name: string) =>
		this.productItem(name).getByTestId('product-title');
	readonly productQtyField = (name: string) =>
		this.productItem(name).getByTestId('product-quantity');
	readonly productUnitPrice = (name: string) =>
		this.productItem(name).getByTestId('product-price');
	readonly productLinePrice = (name: string) =>
		this.productItem(name).getByTestId('line-price');
	readonly cartStepBtn = this.page.getByTestId('proceed-1');
	readonly signInStepBtn = this.page.locator('');
	readonly billingAddressBtn = this.page.locator('');
	readonly paymentStepBtn = this.page.locator('');
	readonly removeItemBtn = this.page.locator('.btn-danger');
	readonly cartTotalPrice = this.page.getByTestId('cart-total');

	/**
	 * Assertions
	 */
	@step()
	async expectProduct(product: ProductInputModel, quantity: number) {
		const linePrice = product.price * quantity;

		await this.verifyElementCount(this.productName(product.name), 1);
		await this.verifyElementValue(
			this.productQtyField(product.name),
			quantity.toString()
		);
		await this.verifyElementTextContains(
			this.productUnitPrice(product.name),
			product.price.toString()
		);
		await this.verifyElementTextContains(
			this.productLinePrice(product.name),
			linePrice.toString()
		);
	}
}
