import { Page } from '@playwright/test';

import BasePage from '@pages/core/base-page';
import { step } from 'playwright-helpers';
import AddressFormComponent from '@pages/components/address';
import { RegisterUser } from '@apis/user/types';

export default class RegisterPage extends BasePage {
	static readonly registerUri = 'auth/register';

	addressFormComponent: AddressFormComponent;

	constructor(page: Page) {
		super(page);
		this.addressFormComponent = new AddressFormComponent(page);
	}

	/**
	 * Application contents
	 */
	readonly CUSTOMER_REGISTRATION = 'Customer registration';
	readonly REGISTER = 'Register';
	readonly FIRST_NAME_REQUIRED = 'First name is required';
	readonly LAST_NAME_REQUIRED = 'fields.last-name.required';
	readonly DOB_REQUIRED = 'Date of Birth is required';
	readonly PHONE_REQUIRED = 'Phone is required.';
	readonly EMAIL_REQUIRED = 'Email is required';
	readonly PASSWORD_REQUIRED = 'Password is required';
	readonly PASSWORD_MIN_LENGTH = 'Password must be minimal 6 characters long.';
	readonly INVALID_PASSWORD_CHARS =
		'Password can not include invalid characters.';

	/**
	 * Locators
	 */
	public readonly registerForm = this.page.locator('.auth-form');
	readonly firstNameField = this.page.getByTestId('first-name');
	readonly firstNameError = this.page.getByTestId('first-name-error');
	readonly lastNameField = this.page.getByTestId('last-name');
	readonly lastNameError = this.page.getByTestId('last-name-error');
	readonly dobPicker = this.page.getByTestId('dob');
	readonly dobError = this.page.getByTestId('dob-error');
	readonly phoneField = this.page.getByTestId('phone');
	readonly phoneError = this.page.getByTestId('phone-error');
	readonly emailField = this.page.getByTestId('email');
	readonly emailError = this.page.getByTestId('email-error');
	readonly passwordField = this.page.getByTestId('password');
	readonly passwordError = this.page.getByTestId('password-error');
	readonly registerBtn = this.page.getByTestId('register-submit');
	readonly errorField = this.page.locator('[data-test*="error"]');

	/**
	 * Actions
	 */
	@step()
	async clickRegister() {
		await this.clickElement(this.registerBtn);
	}

	/**
	 * Methods
	 */
	@step()
	async fillRegisterUser(userData: RegisterUser) {
		const { first_name, last_name, dob, address, phone, password, email } =
			userData;

		if (first_name) await this.fillElement(this.firstNameField, first_name);
		if (last_name) await this.fillElement(this.lastNameField, last_name);
		if (dob) await this.fillElement(this.dobPicker, dob);
		if (address) await this.addressFormComponent.fillAddressForm(address, true);
		if (phone) await this.fillElement(this.phoneField, phone);
		if (password) await this.fillElement(this.passwordField, password);
		if (email) await this.fillElement(this.emailField, email);
	}

	/**
	 * Assertions
	 */
	@step()
	async expectFirstNameRequiredErrorMsg() {
		await this.verifyElementTextContains(
			this.firstNameError,
			this.FIRST_NAME_REQUIRED
		);
	}

	@step()
	async expectLastNameRequiredErrorMsg() {
		await this.verifyElementTextContains(
			this.lastNameError,
			this.LAST_NAME_REQUIRED
		);
	}

	@step()
	async expectDOBRequiredErrorMsg() {
		await this.verifyElementTextContains(this.dobError, this.DOB_REQUIRED);
	}

	@step()
	async expectEmailRequiredErrorMsg() {
		await this.verifyElementTextContains(this.emailError, this.EMAIL_REQUIRED);
	}

	@step()
	async expectPhoneRequiredErrorMsg() {
		await this.verifyElementTextContains(this.phoneError, this.PHONE_REQUIRED);
	}

	@step()
	async expectPasswordRequiredErrorMsg() {
		await this.verifyElementTextContains(
			this.passwordError,
			this.PASSWORD_REQUIRED
		);
	}

	@step()
	async expectAllFieldsRequiredErrorMsgs() {
		await this.expectFirstNameRequiredErrorMsg();
		await this.expectLastNameRequiredErrorMsg();
		await this.expectDOBRequiredErrorMsg();
		await this.expectPhoneRequiredErrorMsg();
		await this.expectEmailRequiredErrorMsg();
		await this.expectPasswordRequiredErrorMsg();
		await this.addressFormComponent.expectStreetRequiredErrorMsg();
		await this.addressFormComponent.expectPostCodeRequiredErrorMsg();
		await this.addressFormComponent.expectCityRequiredErrorMsg();
		await this.addressFormComponent.expectStateRequiredErrorMsg();
		await this.addressFormComponent.expectCountryRequiredErrorMsg();
	}

	@step()
	async expectRegisterFormWithNoErrorMsgs() {
		await this.verifyElementCount(this.errorField, 0);
	}

	@step()
	async expectRegisterPageOpened() {
		await this.verifyElementVisible(this.registerBtn);
		await this.verifyElementText(this.registerBtn, this.REGISTER);
	}
}
