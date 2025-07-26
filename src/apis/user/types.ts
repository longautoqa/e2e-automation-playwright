export interface RegisterUser {
	first_name?: string;
	last_name?: string;
	dob?: string;
	phone?: string;
	email?: string;
	password?: string;
	address?: Address;
}

export interface Address {
	street?: string;
	city?: string;
	state?: string;
	country?: string;
	postal_code?: string;
}
