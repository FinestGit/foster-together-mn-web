import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Mock } from 'vitest';
import { ApiHttpError, requestJson } from './http';
import {
  createAgency,
  deleteAgency,
  getAgency,
  listAgencies,
  updateAgency,
} from './agencies';

vi.mock('./http', async (importOriginal) => {
  const mod = await importOriginal<typeof import('./http')>();
  return {
    ...mod,
    requestJson: vi.fn(),
  };
});

const mockRequestJson = requestJson as Mock;

const validRow = {
  id: 1,
  name: 'Test Agency',
  createdAt: '2020-01-01T00:00:00Z',
  updatedAt: '2020-01-01T00:00:00Z',
};

beforeEach(() => {
  mockRequestJson.mockReset();
});

describe('listAgencies', () => {
  it('GETs collection path and parses array', async () => {
    mockRequestJson.mockResolvedValue([validRow]);
    const rows = await listAgencies();
    expect(rows).toEqual([validRow]);
    expect(mockRequestJson).toHaveBeenCalledWith('/api/v1/agencies', {
      signal: undefined,
      headers: undefined,
    });
  });

  it('treats missing body as empty list', async () => {
    mockRequestJson.mockResolvedValue(undefined);
    await expect(listAgencies()).resolves.toEqual([]);
  });

  it('sends Authorization when accessToken is set', async () => {
    mockRequestJson.mockResolvedValue([validRow]);
    await listAgencies({ accessToken: 'test-token' });
    expect(mockRequestJson).toHaveBeenCalledWith('/api/v1/agencies', {
      signal: undefined,
      headers: { Authorization: 'Bearer test-token' },
    });
  });

  it('merges headers and accessToken (token wins Authorization)', async () => {
    mockRequestJson.mockResolvedValue([]);
    await listAgencies({
      accessToken: 'test-token',
      headers: { Authorization: 'Bearer stale-token', 'X-Trace': '1' },
    });
    expect(mockRequestJson).toHaveBeenCalledWith('/api/v1/agencies', {
      signal: undefined,
      headers: { Authorization: 'Bearer test-token', 'X-Trace': '1' },
    });
  });
});

describe('getAgency', () => {
  it('rejects non-positive id without calling requestJson', async () => {
    await expect(getAgency(0)).rejects.toMatchObject({
      name: 'ApiHttpError',
      status: 400,
      message: 'Invalid agency ID',
    });
    expect(mockRequestJson).not.toHaveBeenCalled();
  });

  it('rejects non-integer id', async () => {
    await expect(getAgency(1.2)).rejects.toMatchObject({
      name: 'ApiHttpError',
      status: 400,
      message: 'Invalid agency ID',
    });
    expect(mockRequestJson).not.toHaveBeenCalled();
  });

  it('throws 404 when response body is empty', async () => {
    mockRequestJson.mockResolvedValue(undefined);
    await expect(getAgency(1)).rejects.toMatchObject({
      name: 'ApiHttpError',
      status: 404,
      message: 'Agency not found',
    });
  });

  it('returns parsed agency on success', async () => {
    mockRequestJson.mockResolvedValue(validRow);
    const agency = await getAgency(1);
    expect(agency).toEqual(validRow);
    expect(mockRequestJson).toHaveBeenCalledWith('/api/v1/agencies/1', {
      signal: undefined,
      headers: undefined,
    });
  });
});

describe('createAgency', () => {
  it('POSTs validated body and returns agency', async () => {
    mockRequestJson.mockResolvedValue(validRow);
    const input = { name: 'Test Agency' };
    await expect(createAgency(input)).resolves.toEqual(validRow);
    expect(mockRequestJson).toHaveBeenCalledWith('/api/v1/agencies', {
      signal: undefined,
      headers: undefined,
      method: 'POST',
      body: input,
    });
  });

  it('throws 502 when response body is empty', async () => {
    mockRequestJson.mockResolvedValue(undefined);
    await expect(createAgency({ name: 'Test Agency' })).rejects.toMatchObject({
      name: 'ApiHttpError',
      status: 502,
      message: 'Empty response from server',
    });
  });

  it('does not call requestJson when Zod rejects input', async () => {
    await expect(createAgency({ name: '' })).rejects.toThrow();
    expect(mockRequestJson).not.toHaveBeenCalled();
  });
});

describe('updateAgency', () => {
  it('rejects invalid id', async () => {
    await expect(
      updateAgency(0, { name: 'Test Agency' })
    ).rejects.toMatchObject({
      name: 'ApiHttpError',
      status: 400,
      message: 'Invalid agency ID',
    });
    expect(mockRequestJson).not.toHaveBeenCalled();
  });

  it('PUTs validated body and returns agency', async () => {
    mockRequestJson.mockResolvedValue(validRow);
    const input = { name: 'Test Agency' };
    await expect(updateAgency(1, input)).resolves.toEqual(validRow);
    expect(mockRequestJson).toHaveBeenCalledWith('/api/v1/agencies/1', {
      signal: undefined,
      headers: undefined,
      method: 'PUT',
      body: input,
    });
  });

  it('throws 502 when response body is empty', async () => {
    mockRequestJson.mockResolvedValue(undefined);
    await expect(
      updateAgency(1, { name: 'Test Agency' })
    ).rejects.toMatchObject({
      name: 'ApiHttpError',
      status: 502,
      message: 'Empty response from server',
    });
  });
});

describe('deleteAgency', () => {
  it('rejects invalid id', async () => {
    await expect(deleteAgency(0)).rejects.toMatchObject({
      name: 'ApiHttpError',
      status: 400,
      message: 'Invalid agency ID',
    });
    expect(mockRequestJson).not.toHaveBeenCalled();
  });

  it('DELETEs resource path', async () => {
    mockRequestJson.mockResolvedValue(undefined);
    await expect(deleteAgency(1)).resolves.toBeUndefined();
    expect(mockRequestJson).toHaveBeenCalledWith('/api/v1/agencies/1', {
      signal: undefined,
      headers: undefined,
      method: 'DELETE',
    });
  });
});

describe('ApiHttpError identity', () => {
  it('getAgency(0) throws ApiHttpError from http module', async () => {
    await expect(getAgency(0)).rejects.toBeInstanceOf(ApiHttpError);
  });
});
