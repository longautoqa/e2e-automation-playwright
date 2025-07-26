import UserApi from '@apis/user/userApi';
import { expect } from '@fixtures/baseAPIFixture';
import { request } from '@playwright/test';
import { RegisterUser } from '@apis/user/types';
import { en, Faker } from '@faker-js/faker';
import { DateUtils } from '@utils/date';
import { RandomUtils } from '@utils/randomize';

const faker = new Faker({ locale: en });

export async function createRandomUserBody(email?: string, password?: string) {
	const userBody: RegisterUser = {
		first_name: faker.person.firstName(),
		last_name: faker.person.lastName(),
		dob: DateUtils.minusYears(30),
		phone: '0987654321',
		email: email || RandomUtils.randomEmail(),
		password: password || RandomUtils.randomPassword(),
		address: {
			street: faker.location.streetAddress({ useFullAddress: true }),
			city: faker.location.city(),
			state: faker.location.state(),
			country: 'Australia', // faker.location.country(),
			postal_code: faker.location.zipCode(),
		},
	};

	return userBody;
}

export async function createRandomUser(email?: string, password?: string) {
	let body: RegisterUser;

	await expect(async () => {
		const userApi = new UserApi(await request.newContext(), {});
		const payload = await createRandomUserBody(email, password);
		const response = await userApi.createUser(payload);

		expect(response.status()).toEqual(201);
		body = await response.json();
		body.password = payload.password;
	}).toPass({
		intervals: [1_000, 4_000, 10_000],
		timeout: 10_000,
	});

	return body;
}
