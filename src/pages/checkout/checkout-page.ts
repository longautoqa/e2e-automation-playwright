import { Page } from '@playwright/test';
import { step } from 'playwright-helpers';

import LoginComponent from '@pages/components/login';
import CartComponent from './components/cart';
import AddressComponent from '@pages/components/address';
import PaymentComponent from './components/payment';
import BasePage from '@pages/core/base-page';

export default class CheckoutPage extends BasePage {
	static readonly checkoutUri = 'checkout';

	cartComponent: CartComponent;
	loginComponent: LoginComponent;
	addressComponent: AddressComponent;
	paymentComponent: PaymentComponent;

	constructor(page: Page) {
		super(page);
		this.cartComponent = new CartComponent(page);
		this.loginComponent = new LoginComponent(page);
		this.addressComponent = new AddressComponent(page);
		this.paymentComponent = new PaymentComponent(page);
	}

	/**
	 * Application contents
	 */
	readonly processToCheckoutTxt = 'Proceed to checkout';
	readonly cartTxt = 'Cart';
	readonly loggedInTxt = 'you are already logged in';
	readonly billingAddressTxt = 'Billing Address';
	readonly paymentTxt = 'Payment';
	readonly signedInSucceededTxt =
		'you are already logged in. You can proceed to checkout.';
	readonly paymentSuccessTxt = 'Payment was successful';

	/**
	 * Locators
	 */
	readonly checkoutForm = this.page.locator('//app-checkout');
	readonly processToCheckoutBtn = this.page.getByRole('button', {
		name: this.processToCheckoutTxt,
	});
	readonly signInMsg = this.page.locator('.login-form-1 > p');
	readonly currentStep = this.page.locator('ul.steps-indicator > li.current');
	readonly addressStepTitle = this.page.locator('app-address h3');
	readonly paymentStepTitle = this.page.locator('app-payment h3');
	readonly signInStep = this.page.locator('.login-form-1').nth(0);
	readonly confirmBtn = this.page.getByTestId('finish');
	readonly paymentSuccessMsg = this.page.getByTestId('payment-success-message');

	/**
	 * Actions
	 */
	@step()
	async clickProcessToCheckout() {
		await this.clickElement(this.processToCheckoutBtn);
	}

	@step()
	async clickConfirm() {
		await this.clickElement(this.confirmBtn);
	}

	/**
	 * Assertions
	 */
	@step()
	async expectProcessToCheckoutDisabled() {
		await this.verifyElementDisabled(this.processToCheckoutBtn);
	}

	@step()
	async expectNavigateToCartStep() {
		await this.verifyElementTextContains(this.currentStep, this.cartTxt);
	}

	@step()
	async expectNavigateToSignInStep() {
		await this.verifyElementTextNotContains(this.signInStep, this.loggedInTxt);
	}

	@step()
	async expectNavigateToSignedInStep() {
		await this.verifyElementTextContains(this.signInStep, this.loggedInTxt);
	}

	@step()
	async expectToNavigateToBillingAddressStep() {
		await this.verifyElementText(this.addressStepTitle, this.billingAddressTxt);
	}

	@step()
	async expectNavigateToPaymentStep() {
		await this.verifyElementText(this.paymentStepTitle, this.paymentTxt);
	}

	@step()
	async expectSignedInSuccess() {
		await this.verifyElementTextContains(
			this.signInMsg,
			this.signedInSucceededTxt
		);
	}

	@step()
	async expectPaymentSuccessMsg() {
		await this.verifyElementText(
			this.paymentSuccessMsg,
			this.paymentSuccessTxt
		);
	}
}
