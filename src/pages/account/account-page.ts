import BasePage from '@pages/core/base-page';
import { Page } from '@playwright/test';
import { step } from 'playwright-helpers';

export default class AccountPage extends BasePage {
	static readonly accountUri = 'account';
	static readonly profileUri = `${AccountPage.accountUri}/accountUri`;

	constructor(page: Page) {
		super(page);
	}

	/**
	 * Assertions
	 */
	@step()
	async expectNavigateToAccountPage() {
		await this.page.waitForURL(`**/${AccountPage.accountUri}`);
	}

	@step()
	async expectNavigateToProfilePage() {
		await this.page.waitForURL(`**/${AccountPage.profileUri}`);
	}
}
