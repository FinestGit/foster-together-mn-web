import { ApiHttpError, requestJson, type RequestJsonOptions } from './http';
import {
  AgencyCreateInputSchema,
  AgencyUpdateInputSchema,
  parseAgency,
  parseAgencyList,
} from './schemas/agency';
import type {
  Agency,
  AgencyCreateInput,
  AgencyUpdateInput,
} from './schemas/agency';

export type AgencyRequestOptions = Pick<
  RequestJsonOptions,
  'signal' | 'headers'
> & {
  accessToken?: string;
};

const AGENCIES_PATH = '/api/v1/agencies';

export async function listAgencies(
  options?: AgencyRequestOptions
): Promise<Agency[]> {
  const raw = await requestJson<unknown>(
    AGENCIES_PATH,
    toRequestJsonOptions(options)
  );
  return parseAgencyList(raw ?? []);
}

export async function getAgency(
  id: number,
  options?: AgencyRequestOptions
): Promise<Agency> {
  assertValidAgencyId(id);
  const raw = await requestJson<unknown>(
    `${AGENCIES_PATH}/${id}`,
    toRequestJsonOptions(options)
  );
  if (raw === undefined) {
    throw new ApiHttpError(404, 'Agency not found');
  }
  return parseAgency(raw);
}

export async function createAgency(
  input: AgencyCreateInput,
  options?: AgencyRequestOptions
): Promise<Agency> {
  const body = AgencyCreateInputSchema.parse(input);
  const raw = await requestJson<unknown>(AGENCIES_PATH, {
    method: 'POST',
    body,
    ...toRequestJsonOptions(options),
  });
  if (raw === undefined) {
    throw new ApiHttpError(502, 'Empty response from server');
  }
  return parseAgency(raw);
}

export async function updateAgency(
  id: number,
  input: AgencyUpdateInput,
  options?: AgencyRequestOptions
): Promise<Agency> {
  assertValidAgencyId(id);
  const body = AgencyUpdateInputSchema.parse(input);
  const raw = await requestJson<unknown>(`${AGENCIES_PATH}/${id}`, {
    method: 'PUT',
    body,
    ...toRequestJsonOptions(options),
  });
  if (raw === undefined) {
    throw new ApiHttpError(502, 'Empty response from server');
  }
  return parseAgency(raw);
}

export async function deleteAgency(
  id: number,
  options?: AgencyRequestOptions
): Promise<void> {
  assertValidAgencyId(id);
  await requestJson<void>(`${AGENCIES_PATH}/${id}`, {
    method: 'DELETE',
    ...toRequestJsonOptions(options),
  });
}

function assertValidAgencyId(id: number): void {
  if (id <= 0) {
    throw new ApiHttpError(400, 'Invalid agency ID');
  }
  if (!Number.isInteger(id)) {
    throw new ApiHttpError(400, 'Invalid agency ID');
  }
}

function toRequestJsonOptions(
  options?: AgencyRequestOptions
): Pick<RequestJsonOptions, 'signal' | 'headers'> {
  const { accessToken, headers, signal } = options ?? {};
  const merged: Record<string, string> = { ...headers };
  if (accessToken) {
    merged.Authorization = `Bearer ${accessToken}`;
  }
  return {
    signal,
    headers: Object.keys(merged).length > 0 ? merged : undefined,
  };
}
