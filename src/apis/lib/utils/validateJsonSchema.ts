import { expect } from '@fixtures/api-test-fixture';
import Ajv from 'ajv';

export async function validateJsonSchema(
	fileName: string,
	filePath: string,
	body: object
) {
	const schemaFile = require(
		`../../lib/schemas/${filePath}/${fileName}_schema.json`
	);

	const ajv = new Ajv({ allErrors: true });
	const validate = ajv.compile(schemaFile);
	const isValidSchema = validate(body);

	if (!isValidSchema) {
		console.log(validate.errors);
		console.log(`Response body: ${body}`);
	}

	expect(isValidSchema).toBe(true);
}
