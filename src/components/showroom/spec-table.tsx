import type { SpecificationGroup } from '@/types';

export function SpecTable({ groups, vehicleName }: { groups: SpecificationGroup[]; vehicleName: string }) {
  if (groups.length === 0) {
    return (
      <p className="max-w-lg text-sm leading-relaxed text-white/40">
        Spesifikasi lengkap {vehicleName} menunggu konfirmasi dari sumber resmi Mitsubishi Motors
        Indonesia. Hubungi sales untuk brosur dan data teknis terbaru.
      </p>
    );
  }

  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <div key={group.group}>
          <h4 className="text-xs uppercase tracking-widest2 text-savlune-gold-light">{group.group}</h4>
          <dl className="mt-3 divide-y divide-white/10">
            {group.items.map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2.5">
                <dt className="text-sm text-white/55">{item.label}</dt>
                <dd className="text-sm font-medium text-offwhite">
                  {item.value.status === 'verified' && item.value.value
                    ? item.value.value
                    : 'Menunggu konfirmasi'}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
