import BasePage from '@pages/core/base-page';
import SideBarComponent from '@pages/components/sideBarComponent';
import { Page } from '@playwright/test';
import { step } from 'playwright-helpers';

export default class SearchProduct extends BasePage {
	sideBarComponent: SideBarComponent;

	constructor(page: Page) {
		super(page);
		this.sideBarComponent = new SideBarComponent(page);
	}

	/**
	 * Application contents
	 */
	readonly headingPage = this.page.getByTestId('search-caption');
	readonly listProductNames = this.page.getByTestId('product-name').all();

	/**
	 * Assertions
	 */
	@step()
	async expectNavigateToSearchPage() {
		await this.verifyElementVisible(this.headingPage);
	}

	@step()
	async expectSearchResults(searchProduct: string) {
		const matchedProducts = await this.listProductNames;
		for (const productName of matchedProducts) {
			await this.verifyElementTextContains(productName, searchProduct);
		}
	}
}
