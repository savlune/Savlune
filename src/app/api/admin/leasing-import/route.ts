import { NextRequest, NextResponse } from 'next/server';
import { parseLeasingCsv } from '@/lib/validation/leasing-import';
import { appendLeasingImportRows } from '@/lib/leasing-import/store';

export async function POST(request: NextRequest) {
  const { csv } = (await request.json()) as { csv?: string };
  if (!csv) {
    return NextResponse.json({ error: 'File CSV kosong.' }, { status: 400 });
  }

  const { rows, errors } = parseLeasingCsv(csv);
  if (rows.length === 0) {
    return NextResponse.json({ error: 'Tidak ada baris valid untuk diimpor.', errors }, { status: 422 });
  }

  const saved = await appendLeasingImportRows(rows);
  return NextResponse.json({ ok: true, imported: saved.length, errors }, { status: 201 });
}
