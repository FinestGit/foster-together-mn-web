export function parseAgencyId(agencyId: string): number | null {
  let id = Number.parseInt(agencyId, 10);
  if (Number.isNaN(id) || id <= 0) {
    return null;
  }
  return id;
}
