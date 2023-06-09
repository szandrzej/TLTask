import { BAD_CREDENTIALS } from '@/infrastructure/constants';

export class BadRequestError extends Error {
  constructor() {
    super();
    this.message = BAD_CREDENTIALS;
  }
}
