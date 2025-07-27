import { mergeExpects } from '@playwright/test';
import { expect as typesExpect } from '@apiExpect/typeExpect';
import { expect as statusesExpect } from '@apiExpect/statusExpect';

export { test } from '@playwright/test';

export const expect = mergeExpects(typesExpect, statusesExpect);
