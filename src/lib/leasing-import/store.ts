import 'server-only';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { LeasingImportRow } from '@/lib/validation/leasing-import';

const LOCAL_PATH = path.join(process.cwd(), 'src/data/leasing-imports.local.json');

export interface StoredLeasingImportRow extends LeasingImportRow {
  id: string;
  importedAt: string;
  status: 'draft' | 'verified';
}

export async function appendLeasingImportRows(
  rows: LeasingImportRow[],
): Promise<StoredLeasingImportRow[]> {
  let existing: StoredLeasingImportRow[] = [];
  try {
    const raw = await fs.readFile(LOCAL_PATH, 'utf-8');
    existing = JSON.parse(raw) as StoredLeasingImportRow[];
  } catch {
    existing = [];
  }

  const newRows: StoredLeasingImportRow[] = rows.map((row) => ({
    ...row,
    id: crypto.randomUUID(),
    importedAt: new Date().toISOString(),
    status: 'draft',
  }));

  const combined = [...existing, ...newRows];
  await fs.mkdir(path.dirname(LOCAL_PATH), { recursive: true });
  await fs.writeFile(LOCAL_PATH, JSON.stringify(combined, null, 2), 'utf-8');
  return newRows;
}

export async function listLeasingImportRows(): Promise<StoredLeasingImportRow[]> {
  try {
    const raw = await fs.readFile(LOCAL_PATH, 'utf-8');
    return JSON.parse(raw) as StoredLeasingImportRow[];
  } catch {
    return [];
  }
}
