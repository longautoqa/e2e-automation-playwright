import BasePage from '@pages/basePage';
import { expect, Page } from '@playwright/test';
import { step } from 'playwright-helpers';

export default class LoginComponent extends BasePage {
	constructor(page: Page) {
		super(page);
	}

	/**
	 * Application contents
	 */
	readonly requiredEmailTxt = 'Email is required';
	readonly requiredPasswordTxt = 'Password is required';
	readonly invalidEmailFormatTxt = 'Email format is invalid';
	readonly invalidPasswordLengthTxt = 'Password length is invalid';
	readonly invalidEmailOrPasswordTxt = 'Invalid email or password';

	/**
	 * Locators
	 */
	public readonly loginForm = this.page.locator('.auth-form');
	readonly emailField = this.loginForm.getByTestId('email');
	readonly emailError = this.loginForm.getByTestId('email-error');
	readonly passwordField = this.loginForm.getByTestId('password');
	readonly passwordError = this.loginForm.getByTestId('password-error');
	readonly loginBtn = this.loginForm.getByTestId('login-submit');
	readonly loginError = this.loginForm.getByTestId('login-error');
	readonly registerAccountLink = this.loginForm.getByTestId('register-link');
	readonly forgotPasswordLink = this.loginForm.getByTestId(
		'forgot-password-link'
	);

	/**
	 * Actions
	 */
	async fillEmail(email: string) {
		await this.emailField.fill(email);
	}

	async fillPassword(password: string) {
		await this.passwordField.fill(password);
	}

	async clickLogin() {
		await this.loginBtn.click();
	}

	/**
	 * Methods
	 */
	async login(email: string, password: string) {
		await this.fillEmail(email);
		await this.fillPassword(password);
		await this.clickLogin();
	}

	/**
	 * Assertions
	 */
	@step()
	async expectRequiredEmailErrorMessage() {
		await expect(this.emailError).toHaveText(this.requiredEmailTxt);
	}

	@step()
	async expectRequiredPasswordErrorMessage() {
		await expect(this.passwordError).toHaveText(this.requiredPasswordTxt);
	}

	@step()
	async expectEmailFormatErrorMessage() {
		await expect(this.emailError).toHaveText(this.invalidEmailFormatTxt);
	}

	@step()
	async expectPasswordLengthErrorMessage() {
		await expect(this.passwordError).toHaveText(this.invalidPasswordLengthTxt);
	}

	@step()
	async expectLoginErrorMessage() {
		await expect(this.loginError).toHaveText(this.invalidEmailOrPasswordTxt);
	}

	@step()
	async expectLoggedInSuccess() {}

	@step()
	async expectLoggedInFail() {
		await expect(this.loginError).toHaveText(this.invalidEmailOrPasswordTxt);
	}
}
