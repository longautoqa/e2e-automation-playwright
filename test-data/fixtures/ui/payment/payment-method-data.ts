import {
	BankDetailsInputModel,
	CreditCardInputModel,
	GiftCardInputModel,
} from '@pages/checkout/types';

export default class PaymentMethodData {
	static readonly bankTransfer: BankDetailsInputModel = {
		bankName: 'JCB Transfer',
		accountName: 'Test JCB Transfer',
		accountNumber: '123456789',
	};

	static readonly creditCard: CreditCardInputModel = {
		creditCardNumber: '4242-4242-4242-4242',
		cardHolderName: 'Long Nguyen Van',
		cvv: '123',
		expirationDate: '12/2030',
	};

	static readonly giftCard: GiftCardInputModel = {
		giftCardNumber: '3569 2341 3412',
		validationCode: '123456',
	};
}
