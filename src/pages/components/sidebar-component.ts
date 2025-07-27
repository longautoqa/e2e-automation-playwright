import BasePage from '@pages/core/base-page';
import { Page } from '@playwright/test';
import { step } from 'playwright-helpers';

export default class SideBarComponent extends BasePage {
	constructor(page: Page) {
		super(page);
	}

	/**
	 * Locators
	 */
	readonly sortDropdown = this.page.getByTestId('sort');
	readonly searchField = this.page.getByTestId('search-query');
	readonly searchBtn = this.page.getByTestId('search-submit');
	readonly clearSearchBtn = this.page.getByTestId('search-reset');
	readonly filterByCategory = (categoryName: string) =>
		this.page.locator('.checkbox', { hasText: categoryName });
	readonly filterByBrand = (brandName: string) =>
		this.page.locator('.checkbox', { hasText: brandName });

	/**
	 * Actions
	 */
	@step()
	async clearSearchBox() {
		await this.clickElement(this.clearSearchBtn);
	}

	/**
	 * Methods
	 */
	@step()
	async searchProductName(name: string) {
		await this.fillElement(this.searchField, name);
		await this.clickElement(this.searchBtn);
	}

	/**
	 * Assertions
	 */
	@step()
	async expectSearchBoxCleared() {
		await this.verifyElementEmpty(this.searchField);
	}

	@step()
	async expectListProductsPageShown() {}
}
