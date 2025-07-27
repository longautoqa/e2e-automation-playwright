import BasePage from '@pages/core/base-page';
import { Page } from '@playwright/test';
import { step } from 'playwright-helpers';
import { Address } from '@apis/user/types';

export default class AddressFormComponent extends BasePage {
	constructor(page: Page) {
		super(page);
	}

	/**
	 * Application contents
	 */
	readonly streetRequired = 'Street is required';
	readonly postCodeRequired = 'Postcode is required';
	readonly cityRequired = 'City is required';
	readonly stateRequired = 'State is required';
	readonly countryRequired = 'Country is required';

	/**
	 * Locators
	 */
	readonly streetField = this.page.getByTestId('street');
	readonly streetError = this.page.getByTestId('street-error');
	readonly cityField = this.page.getByTestId('city');
	readonly cityError = this.page.getByTestId('city-error');
	readonly stateField = this.page.getByTestId('state');
	readonly stateError = this.page.getByTestId('state-error');
	readonly countryDropdown = (value: string) =>
		this.page.selectOption('[id="country"]', value);
	readonly countryField = this.page.getByTestId('country');
	readonly countryError = this.page.getByTestId('country-error');
	readonly postCodeField = this.page.getByTestId('postal_code');
	readonly postCodeError = this.page.getByTestId('postal_code-error');

	/**
	 * Actions
	 */
	@step()
	async fillStreet(street: string) {
		await this.fillElement(this.streetField, street);
	}

	@step()
	async fillCity(city: string) {
		await this.fillElement(this.cityField, city);
	}

	@step()
	async fillState(state: string) {
		await this.fillElement(this.stateField, state);
	}

	@step()
	async fillCountry(country: string) {
		await this.fillElement(this.countryField, country);
	}

	@step()
	async selectCountry(country: string) {
		await this.fillElement(this.countryField, country);
	}

	@step()
	async fillPostCode(postCode: string) {
		await this.fillElement(this.postCodeField, postCode);
	}

	/**
	 * Methods
	 */
	@step()
	async fillAddressForm(addressDetails: Address, isRegisterUser = false) {
		const { street, city, state, country, postal_code } = addressDetails;

		if (street) await this.fillStreet(street);
		if (city) await this.fillCity(city);
		if (country) {
			if (isRegisterUser) {
				await this.countryDropdown(country);
			} else {
				await this.fillCountry(country);
			}
		}
		if (state) await this.fillState(state);
		if (postal_code) await this.fillPostCode(postal_code);
	}

	/**
	 * Assertions
	 */
	async expectStreetRequiredErrorMsg() {
		await this.verifyElementTextContains(this.streetError, this.streetRequired);
	}

	async expectCountryRequiredErrorMsg() {
		await this.verifyElementTextContains(
			this.countryError,
			this.countryRequired
		);
	}

	async expectStateRequiredErrorMsg() {
		await this.verifyElementTextContains(this.stateError, this.stateRequired);
	}

	async expectPostCodeRequiredErrorMsg() {
		await this.verifyElementTextContains(
			this.postCodeError,
			this.postCodeRequired
		);
	}

	async expectCityRequiredErrorMsg() {
		await this.verifyElementTextContains(this.cityError, this.cityRequired);
	}
}
