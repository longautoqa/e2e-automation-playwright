import { test } from '@fixtures/ui-test-fixture';

import AddressData from '@testDataStaticCommon/address-data';
import ProductData from '@testDataStaticProduct/product-data';
import {
	PaymentMethodLabel,
	MonthlyInstallmentLabel,
} from '@pages/checkout/types';
import { TestType } from 'src/types';
import PaymentMethodData from '@testDataStaticPayment/payment-method-data';

test.describe('Checkout order feature with logged in user @checkout', async () => {
	test.use({ storageState: './playwright/.auth/customer01.json' });

	test(
		`Checkout order with payment method ${PaymentMethodLabel.cashOnDelivery}`,
		{
			tag: '@smoke',
			annotation: {
				type: TestType.Test,
				description: 'https://demo.atlassian.net/browse/JIRA-04',
			},
		},
		async ({ homePage, navComponent, productPage, checkoutPage }) => {
			await homePage.open();
			await homePage.expectNavigateToHomePage();
			await homePage.clickProductName(ProductData.basicProduct01.name);
			await navComponent.expectNavigateToProductPage();
			await productPage.clickAddToCart();
			await productPage.expectAddedProductToCartSuccessMsg();
			await productPage.closeToastMessageBox();
			await productPage.expectToastMessageBoxHidden();
			await navComponent.expectCartQuantity(1);
			await navComponent.clickShoppingCart();
			await checkoutPage.expectNavigateToCartStep();
			await checkoutPage.cartComponent.expectProduct(
				ProductData.basicProduct01,
				1
			);
			await checkoutPage.clickProcessToCheckout();
			await checkoutPage.expectNavigateToSignedInStep();
			await checkoutPage.clickProcessToCheckout();
			await checkoutPage.expectToNavigateToBillingAddressStep();
			await checkoutPage.expectProcessToCheckoutDisabled();
			await checkoutPage.addressComponent.fillAddressForm(
				AddressData.address01
			);
			await checkoutPage.clickProcessToCheckout();
			await checkoutPage.expectNavigateToPaymentStep();
			await checkoutPage.paymentComponent.selectPaymentMethod(
				PaymentMethodLabel.cashOnDelivery
			);
			await checkoutPage.clickConfirm();
			await checkoutPage.expectPaymentSuccessMsg();
			// Issue: https://demo.atlassian.net/browse/JIRA-111
			// await checkoutPage.clickConfirm();
			// await checkoutPage.paymentComponent.expectOrderedSuccess();
			// await navComponent.expectShoppingCartHidden();
		}
	);

	test(
		`Checkout order with payment method ${PaymentMethodLabel.bankTransfer}`,
		{
			tag: '@smoke',
			annotation: {
				type: TestType.Test,
				description: 'https://demo.atlassian.net/browse/JIRA-05',
			},
		},
		async ({ homePage, navComponent, productPage, checkoutPage }) => {
			await homePage.open();
			await homePage.expectNavigateToHomePage();
			await homePage.clickProductName(ProductData.basicProduct01.name);
			await navComponent.expectNavigateToProductPage();
			await productPage.clickAddToCart();
			await productPage.expectAddedProductToCartSuccessMsg();
			await productPage.closeToastMessageBox();
			await productPage.expectToastMessageBoxHidden();
			await navComponent.expectCartQuantity(1);
			await navComponent.clickShoppingCart();
			await checkoutPage.expectNavigateToCartStep();
			await checkoutPage.cartComponent.expectProduct(
				ProductData.basicProduct01,
				1
			);
			await checkoutPage.clickProcessToCheckout();
			await checkoutPage.expectNavigateToSignedInStep();
			await checkoutPage.clickProcessToCheckout();
			await checkoutPage.expectToNavigateToBillingAddressStep();
			await checkoutPage.addressComponent.fillAddressForm(
				AddressData.address01
			);
			await checkoutPage.clickProcessToCheckout();
			await checkoutPage.expectNavigateToPaymentStep();
			await checkoutPage.paymentComponent.selectPaymentMethod(
				PaymentMethodLabel.bankTransfer
			);
			await checkoutPage.paymentComponent.fillBankDetails(
				PaymentMethodData.bankTransfer
			);
			await checkoutPage.clickConfirm();
			await checkoutPage.expectPaymentSuccessMsg();
			// Issue: https://demo.atlassian.net/browse/JIRA-111
			// await checkoutPage.clickConfirm();
			// await checkoutPage.paymentComponent.expectOrderedSuccess();
			// await navComponent.expectShoppingCartHidden();
		}
	);

	test(
		`Checkout order with payment method ${PaymentMethodLabel.creditCard}`,
		{
			tag: '@smoke',
			annotation: {
				type: TestType.Test,
				description: 'https://demo.atlassian.net/browse/JIRA-06',
			},
		},
		async ({ homePage, navComponent, productPage, checkoutPage }) => {
			await homePage.open();
			await homePage.clickProductName(ProductData.basicProduct02.name);
			await navComponent.expectNavigateToProductPage();
			await productPage.clickAddToCart();
			await productPage.expectAddedProductToCartSuccessMsg();
			await productPage.closeToastMessageBox();
			await productPage.expectToastMessageBoxHidden();
			await navComponent.expectCartQuantity(1);
			await navComponent.clickShoppingCart();
			await checkoutPage.expectNavigateToCartStep();
			await checkoutPage.cartComponent.expectProduct(
				ProductData.basicProduct02,
				1
			);
			await checkoutPage.clickProcessToCheckout();
			await checkoutPage.expectNavigateToSignedInStep();
			await checkoutPage.clickProcessToCheckout();
			await checkoutPage.expectToNavigateToBillingAddressStep();
			await checkoutPage.addressComponent.fillAddressForm(
				AddressData.address01
			);
			await checkoutPage.clickProcessToCheckout();
			await checkoutPage.expectNavigateToPaymentStep();
			await checkoutPage.paymentComponent.selectPaymentMethod(
				PaymentMethodLabel.creditCard
			);
			await checkoutPage.paymentComponent.fillCreditCard(
				PaymentMethodData.creditCard
			);
			await checkoutPage.clickConfirm();
			await checkoutPage.expectPaymentSuccessMsg();
			// Issue: https://demo.atlassian.net/browse/JIRA-111
			// await checkoutPage.clickConfirm();
			// await checkoutPage.paymentComponent.expectOrderedSuccess();
			// await navComponent.expectShoppingCartHidden();
		}
	);

	test(
		`Checkout order with payment method ${PaymentMethodLabel.buyNowPayLater}`,
		{
			tag: '@smoke',
			annotation: {
				type: TestType.Test,
				description: 'https://demo.atlassian.net/browse/JIRA-07',
			},
		},
		async ({ homePage, navComponent, productPage, checkoutPage }) => {
			await homePage.open();
			await homePage.clickProductName(ProductData.basicProduct02.name);
			await navComponent.expectNavigateToProductPage();
			await productPage.clickAddToCart();
			await productPage.expectAddedProductToCartSuccessMsg();
			await productPage.closeToastMessageBox();
			await productPage.expectToastMessageBoxHidden();
			await navComponent.expectCartQuantity(1);
			await navComponent.clickShoppingCart();
			await checkoutPage.expectNavigateToCartStep();
			await checkoutPage.cartComponent.expectProduct(
				ProductData.basicProduct02,
				1
			);
			await checkoutPage.clickProcessToCheckout();
			await checkoutPage.expectNavigateToSignedInStep();
			await checkoutPage.expectSignedInSuccess();
			await checkoutPage.clickProcessToCheckout();
			await checkoutPage.expectToNavigateToBillingAddressStep();
			await checkoutPage.addressComponent.fillAddressForm(
				AddressData.address01
			);
			await checkoutPage.clickProcessToCheckout();
			await checkoutPage.expectNavigateToPaymentStep();
			await checkoutPage.paymentComponent.selectPaymentMethod(
				PaymentMethodLabel.buyNowPayLater
			);
			await checkoutPage.paymentComponent.selectMonthlyInstallments(
				MonthlyInstallmentLabel.three
			);
			await checkoutPage.clickConfirm();
			await checkoutPage.expectPaymentSuccessMsg();
			// Issue: https://demo.atlassian.net/browse/JIRA-111
			// await checkoutPage.clickConfirm();
			// await checkoutPage.paymentComponent.expectOrderedSuccess();
			// await navComponent.expectShoppingCartHidden();
		}
	);
});
