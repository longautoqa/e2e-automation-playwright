import BasePage from '@pages/core/base-page';
import LoginComponent from '@pages/components/login';
import { Page } from '@playwright/test';
import { step } from 'playwright-helpers';

export default class LoginPage extends BasePage {
	static readonly loginUri = 'auth/login';

	loginComponent: LoginComponent;

	constructor(page: Page) {
		super(page);
		this.loginComponent = new LoginComponent(page);
	}

	/***
	 * Application contents
	 */
	static readonly LOGIN = 'Login';

	/**
	 * Locators
	 */
	readonly headingPage = this.page.locator('.auth-form > h3');
	readonly registerLink = this.page.getByTestId('register-link');

	/**
	 * Actions
	 */
	async clickRegisterLink() {
		await this.clickElement(this.registerLink);
	}

	/**
	 * Assertions
	 */
	@step()
	async expectLoginPageOpened() {
		await this.verifyElementVisible(this.loginComponent.loginBtn);
		await this.verifyElementText(this.loginComponent.loginBtn, LoginPage.LOGIN);
	}
}
