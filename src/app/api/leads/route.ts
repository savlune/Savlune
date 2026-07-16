import { NextRequest, NextResponse } from 'next/server';
import { leadFormSchema } from '@/lib/validation/lead';
import { saveLead } from '@/lib/leads/store';

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Body permintaan tidak valid.' }, { status: 400 });
  }

  const parsed = leadFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Data tidak valid.', issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  try {
    const { storage } = await saveLead({ ...parsed.data, createdAt: new Date().toISOString() });
    return NextResponse.json({ ok: true, storage }, { status: 201 });
  } catch (error) {
    console.error('Failed to save lead', error);
    return NextResponse.json({ error: 'Gagal menyimpan data. Coba lagi.' }, { status: 500 });
  }
}
