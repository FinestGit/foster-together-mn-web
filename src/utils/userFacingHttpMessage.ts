import type { ApiHttpError } from '../api/http';

type HttpIntent = 'load' | 'create' | 'update';

export function agencyUserFacingHttpMessage(
  intent: HttpIntent = 'load',
  e: ApiHttpError
) {
  switch (e.status) {
    case 400:
      return e.message;
    case 401:
      return `you must be signed in to ${intent} agencies.`;
    case 403:
      return 'you do not have access to this.';
    case 404:
      return 'agency not found';
    default:
      return 'something went wrong. Try again later.';
  }
}
