import 'server-only';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { LeadPayload } from '@/types';

const LOCAL_LEADS_PATH = path.join(process.cwd(), 'src/data/leads.local.json');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseServiceKey);
}

async function saveToSupabase(lead: LeadPayload): Promise<void> {
  const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseServiceKey as string,
      Authorization: `Bearer ${supabaseServiceKey}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Supabase insert failed (${response.status}): ${text}`);
  }
}

async function saveToLocalJson(lead: LeadPayload): Promise<void> {
  let existing: LeadPayload[] = [];
  try {
    const raw = await fs.readFile(LOCAL_LEADS_PATH, 'utf-8');
    existing = JSON.parse(raw) as LeadPayload[];
  } catch {
    existing = [];
  }
  existing.push(lead);
  await fs.mkdir(path.dirname(LOCAL_LEADS_PATH), { recursive: true });
  await fs.writeFile(LOCAL_LEADS_PATH, JSON.stringify(existing, null, 2), 'utf-8');
}

/**
 * Persists a lead. Uses Supabase when NEXT_PUBLIC_SUPABASE_URL /
 * SUPABASE_SERVICE_ROLE_KEY are configured, otherwise falls back to a local
 * JSON file (dev convenience only — not durable on serverless hosts).
 */
export async function saveLead(lead: LeadPayload): Promise<{ storage: 'supabase' | 'local' }> {
  if (isSupabaseConfigured()) {
    await saveToSupabase(lead);
    return { storage: 'supabase' };
  }
  await saveToLocalJson(lead);
  return { storage: 'local' };
}

async function listFromSupabase(): Promise<LeadPayload[]> {
  const response = await fetch(`${supabaseUrl}/rest/v1/leads?order=createdAt.desc&limit=50`, {
    headers: {
      apikey: supabaseServiceKey as string,
      Authorization: `Bearer ${supabaseServiceKey}`,
    },
    cache: 'no-store',
  });
  if (!response.ok) return [];
  return (await response.json()) as LeadPayload[];
}

async function listFromLocalJson(): Promise<LeadPayload[]> {
  try {
    const raw = await fs.readFile(LOCAL_LEADS_PATH, 'utf-8');
    return (JSON.parse(raw) as LeadPayload[]).reverse();
  } catch {
    return [];
  }
}

export async function listLeads(): Promise<{ leads: LeadPayload[]; storage: 'supabase' | 'local' }> {
  if (isSupabaseConfigured()) {
    return { leads: await listFromSupabase(), storage: 'supabase' };
  }
  return { leads: await listFromLocalJson(), storage: 'local' };
}
