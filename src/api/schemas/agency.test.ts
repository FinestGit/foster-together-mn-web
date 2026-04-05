import { describe, expect, it, vi } from 'vitest';
import {
  AgencyCreateInputSchema,
  AgencyParseError,
  parseAgency,
  parseAgencyList,
} from './agency';

const validAgency = {
  id: 1,
  name: 'Test Agency',
  createdAt: '2020-01-01T00:00:00Z',
  updatedAt: '2020-01-01T00:00:00Z',
};

describe('parseAgency', () => {
  it('accepts a valid agency object', () => {
    expect(parseAgency(validAgency)).toEqual(validAgency);
  });

  it('throws AgencyParseError when shape is wrong', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => parseAgency({ ...validAgency, id: 'string' })).toThrow(
      AgencyParseError
    );
    vi.restoreAllMocks();
  });

  it('throws when required fields are missing', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => parseAgency({ id: 1 })).toThrow(AgencyParseError);
    vi.restoreAllMocks();
  });
});

describe('parseAgencyList', () => {
  it('accepts a valid array', () => {
    expect(parseAgencyList([validAgency])).toEqual([validAgency]);
  });

  it('accepts an empty array', () => {
    expect(parseAgencyList([])).toEqual([]);
  });

  it('throws when not an array', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => parseAgencyList({ ...validAgency, id: 1 })).toThrow(
      AgencyParseError
    );
    vi.restoreAllMocks();
  });

  it('throws when element is invalid', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => parseAgencyList([{ ...validAgency, id: 'string' }])).toThrow(
      AgencyParseError
    );
    vi.restoreAllMocks();
  });
});

describe('AgencyCreateInputSchema', () => {
  it('accepts a non-empty name within max length', () => {
    const r = AgencyCreateInputSchema.safeParse({ name: 'Test Agency' });
    expect(r.success).toBe(true);
  });

  it('rejects empty name', () => {
    const r = AgencyCreateInputSchema.safeParse({ name: '' });
    expect(r.success).toBe(false);
  });

  it('reject name over 255 characters', () => {
    const r = AgencyCreateInputSchema.safeParse({ name: 'a'.repeat(256) });
    expect(r.success).toBe(false);
  });
});
