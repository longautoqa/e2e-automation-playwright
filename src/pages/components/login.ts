import BasePage from '@pages/core/base-page';
import { Page } from '@playwright/test';
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
		await this.fillElement(this.emailField, email);
	}

	async fillPassword(password: string) {
		await this.fillElement(this.passwordField, password);
	}

	async clickLogin() {
		await this.clickElement(this.loginBtn);
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
		await this.verifyElementText(this.emailError, this.requiredEmailTxt);
	}

	@step()
	async expectRequiredPasswordErrorMessage() {
		await this.verifyElementText(this.passwordError, this.requiredPasswordTxt);
	}

	@step()
	async expectEmailFormatErrorMessage() {
		await this.verifyElementText(this.emailError, this.invalidEmailFormatTxt);
	}

	@step()
	async expectPasswordLengthErrorMessage() {
		await this.verifyElementText(
			this.passwordError,
			this.invalidPasswordLengthTxt
		);
	}

	@step()
	async expectLoginErrorMessage() {
		await this.verifyElementText(
			this.loginError,
			this.invalidEmailOrPasswordTxt
		);
	}

	@step()
	async expectLoggedInSuccess() {}

	@step()
	async expectLoggedInFail() {
		await this.verifyElementText(
			this.loginError,
			this.invalidEmailOrPasswordTxt
		);
	}
}
