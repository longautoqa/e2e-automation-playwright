export enum PaymentMethodLabel {
	bankTransfer = 'Bank Transfer',
	cashOnDelivery = 'Cash on Delivery',
	creditCard = 'Credit Card',
	buyNowPayLater = 'Buy Now Pay Later',
	giftCard = 'Gift Card',
}

export enum MonthlyInstallmentLabel {
	three = '3 Monthly Installments',
	six = '6 Monthly Installments',
	nine = '9 Monthly Installments',
	twelve = '12 Monthly Installments',
}

/**
 * Interfaces
 */
export interface BankDetailsInputModel {
	bankName?: string;
	accountName?: string;
	accountNumber?: string;
}

export interface CreditCardInputModel {
	cardHolderName?: string;
	creditCardNumber?: string;
	cvv?: string;
	expirationDate?: string;
}

export interface GiftCardInputModel {
	giftCardNumber?: string;
	validationCode?: string;
}
