import { ProductInputModel } from '@pages/product/types';

export default class ProductData {
	static readonly basicProduct01: ProductInputModel = {
		name: 'Bolt Cutters',
		price: 48.41,
	};

	static readonly basicProduct02: ProductInputModel = {
		name: 'Claw Hammer with Shock Reduction Grip',
		price: 13.41,
	};

	static readonly outOfStockProduct01: ProductInputModel = {
		name: 'Long Nose Pliers',
		price: 14.24,
	};
}
