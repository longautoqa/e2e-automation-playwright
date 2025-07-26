export default class Env {
	static readonly BASE_URL =
		process.env.BASE_URL || 'https://practicesoftwaretesting.com/';
	static readonly API_URL =
		process.env.API_URL || 'https://api.practicesoftwaretesting.com/';
	static readonly ADMIN_EMAIL = process.env.ADMIN_EMAIL;
	static readonly ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
	static readonly CUSTOMER_01_EMAIL = process.env.CUSTOMER_01_EMAIL;
	static readonly CUSTOMER_01_PASSWORD = process.env.CUSTOMER_01_PASSWORD;
	static readonly CUSTOMER_02_EMAIL = process.env.CUSTOMER_02_EMAIL;
	static readonly CUSTOMER_02_PASSWORD = process.env.CUSTOMER_02_PASSWORD;
}
