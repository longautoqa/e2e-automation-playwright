import { en, Faker } from '@faker-js/faker';

export class RandomUtils {
	private static readonly faker = new Faker({ locale: en });

	static randomEmail() {
		return `${Date.now()}_${this.randomString(5)}@gmail.com`;
	}

	static randomString(length = 15) {
		return this.faker.string.alphanumeric({ length: length });
	}

	static randomWords(options = { min: 3, max: 5 }) {
		return this.faker.word.words({ count: options });
	}

	static stringToSlug(value: string) {
		return value
			.toLowerCase()
			.replace(/ /g, '-')
			.replace(/[^\w-]+/g, '');
	}

	static randomPassword() {
		return this.faker.internet.password({
			length: 10,
			prefix: '@95Lonv',
		});
	}
}
