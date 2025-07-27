import { Page } from '@playwright/test';

import BasePage from '@pages/core/base-page';
import { ProductInputModel } from './types';
import { step } from 'playwright-helpers';

export default class ProductPage extends BasePage {
	static readonly productUri = 'product';

	constructor(page: Page) {
		super(page);
	}

	/**
	 * Application contents
	 */
	readonly dd = 'Unauthorized, can not add product to your favorite list.';

	/**
	 * Locators
	 */
	public readonly productDetails = this.page.locator('.my-3');
	readonly productName = this.page.getByTestId('product-name');
	readonly unitPrice = this.page.getByTestId('unit-price');
	readonly qtyField = this.page.getByTestId('quantity');
	readonly minusQtyBtn = this.page.getByTestId('decrease-quantity');
	readonly plusQtyBtn = this.page.getByTestId('increase-quantity');
	readonly addToCartBtn = this.page.getByTestId('add-to-cart');
	readonly addToFavoritesBtn = this.page.getByTestId('add-to-favorites');
	readonly toastBox = this.page.locator('#toast-container');
	readonly toastSucceedMsg = this.toastBox.locator('.toast-success');
	readonly toastErrorMsg = this.toastBox.locator('.toast-error');
	readonly outOfStockMsg = this.page.getByTestId('out-of-stock');

	/**
	 * Actions
	 */
	@step()
	async clickAddToCart() {
		await this.clickElement(this.addToCartBtn);
	}

	@step()
	async clickAddToFavourites() {
		await this.clickElement(this.addToFavoritesBtn);
	}

	@step()
	async closeToastMessageBox() {
		await this.clickElement(this.toastBox);
		await this.waitForElementHidden(this.toastBox);
	}

	/**
	 * Assertions
	 */
	@step()
	async expectProductDetails(product: ProductInputModel) {
		await this.verifyElementText(this.productName, product.name);
		await this.verifyElementText(this.unitPrice, product.price.toString());
	}

	@step()
	async expectAddedProductToCartSuccessMsg() {
		await this.verifyElementVisible(this.toastSucceedMsg);
	}

	@step()
	async expectAddedProductToCartMessageHidden() {
		await this.verifyElementHidden(this.toastSucceedMsg);
	}

	@step()
	async expectOutOfStockMessageShown() {
		await this.verifyElementVisible(this.outOfStockMsg);
	}

	@step()
	async expectSetQuantityDisabled() {
		await this.verifyElementValue(this.qtyField, '1');
		await this.verifyElementDisabled(this.qtyField);
		await this.verifyElementDisabled(this.minusQtyBtn);
		await this.verifyElementDisabled(this.plusQtyBtn);
	}

	@step()
	async expectOutOfStockMessageHidden() {
		await this.verifyElementHidden(this.outOfStockMsg);
	}

	@step()
	async expectAddToCartButtonDisabled() {
		await this.verifyElementDisabled(this.addToCartBtn);
	}

	@step()
	async expectAddToCartButtonEnabled() {
		await this.verifyElementEnabled(this.addToCartBtn);
	}

	@step()
	async expectAddToFavouritesButtonEnabled() {
		await this.verifyElementEnabled(this.addToFavoritesBtn);
	}

	@step()
	async expectAddedToFavouritesErrorMsg() {
		await this.verifyElementVisible(this.toastErrorMsg);
	}

	@step()
	async expectToastMessageBoxHidden() {
		await this.verifyElementHidden(this.toastBox);
	}
}
