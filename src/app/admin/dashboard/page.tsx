import { listLeads } from '@/lib/leads/store';
import { formatDateID } from '@/lib/formatters/currency';
import { CsvImportPanel } from '@/components/admin/csv-import-panel';
import { LogoutButton } from '@/components/admin/logout-button';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const { leads, storage } = await listLeads();

  return (
    <div className="container-content py-14 pt-32">
      <div className="flex items-center justify-between">
        <div>
          <span className="section-number">Admin</span>
          <h1 className="mt-3 font-display text-4xl font-light text-offwhite">Dashboard SAVLUNE</h1>
          <p className="mt-2 text-sm text-white/45">
            Sumber data leads: <span className="text-white/70">{storage === 'supabase' ? 'Supabase' : 'JSON lokal (dev)'}</span>
          </p>
        </div>
        <LogoutButton />
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-offwhite">Leads Terbaru</h2>
        {leads.length === 0 ? (
          <p className="mt-4 text-sm text-white/45">Belum ada leads masuk.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-widest2 text-white/40">
                  <th className="py-3 pr-4">Tanggal</th>
                  <th className="py-3 pr-4">Tipe</th>
                  <th className="py-3 pr-4">Nama</th>
                  <th className="py-3 pr-4">Telepon</th>
                  <th className="py-3 pr-4">Kendaraan</th>
                  <th className="py-3 pr-4">Kota</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, i) => (
                  <tr key={i} className="border-t border-white/10 text-white/70">
                    <td className="py-3 pr-4">{formatDateID(lead.createdAt)}</td>
                    <td className="py-3 pr-4">{lead.type}</td>
                    <td className="py-3 pr-4">{lead.name}</td>
                    <td className="py-3 pr-4">{lead.phone}</td>
                    <td className="py-3 pr-4">{lead.vehicleSlug ?? '—'}</td>
                    <td className="py-3 pr-4">{lead.city}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-16">
        <CsvImportPanel />
      </section>
    </div>
  );
}
