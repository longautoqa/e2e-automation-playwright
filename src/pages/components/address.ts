import BasePage from '@pages/basePage';
import { expect, Page } from '@playwright/test';
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
		await this.streetField.fill(street);
	}

	@step()
	async fillCity(city: string) {
		await this.cityField.fill(city);
	}

	@step()
	async fillState(state: string) {
		await this.stateField.fill(state);
	}

	@step()
	async fillCountry(country: string) {
		await this.countryField.fill(country);
	}

	@step()
	async selectCountry(country: string) {
		await this.countryField.fill(country);
	}

	@step()
	async fillPostCode(postCode: string) {
		await this.postCodeField.fill(postCode);
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
		await expect(this.streetError).toContainText(this.streetRequired);
	}

	async expectCountryRequiredErrorMsg() {
		await expect(this.countryError).toContainText(this.countryRequired);
	}

	async expectStateRequiredErrorMsg() {
		await expect(this.stateError).toContainText(this.stateRequired);
	}

	async expectPostCodeRequiredErrorMsg() {
		await expect(this.postCodeError).toContainText(this.postCodeRequired);
	}

	async expectCityRequiredErrorMsg() {
		await expect(this.cityError).toContainText(this.cityRequired);
	}
}
