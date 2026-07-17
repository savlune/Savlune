'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadFormSchema, type LeadFormValues } from '@/lib/validation/lead';
import { vehicles } from '@/data/vehicles';
import { Button } from '@/components/ui/button';
import { buildWhatsAppUrl } from '@/lib/whatsapp/message';
import { salesConsultant } from '@/data/locations';
import type { LeadType } from '@/types';

interface LeadFormProps {
  type: LeadType;
  defaultVehicleSlug?: string;
  showDatePicker?: boolean;
  showNeedField?: boolean;
  submitLabel?: string;
}

const inputClasses =
  'mt-2 w-full border border-white/15 bg-transparent px-3.5 py-3 text-sm text-offwhite outline-none focus:border-savlune-gold placeholder:text-white/25';

export function LeadForm({
  type,
  defaultVehicleSlug,
  showDatePicker = false,
  showNeedField = false,
  submitLabel = 'Kirim Permintaan',
}: LeadFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [waUrl, setWaUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: { type, vehicleSlug: defaultVehicleSlug, city: 'Samarinda' },
  });

  const onSubmit = async (values: LeadFormValues) => {
    setStatus('submitting');
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('request failed');

      const vehicleName = vehicles.find((v) => v.slug === values.vehicleSlug)?.name;
      const message = [
        `Halo Kak ${salesConsultant.name}, saya ${values.name} ingin mengajukan ${labelFor(type)}.`,
        vehicleName ? `Kendaraan: ${vehicleName}` : undefined,
        `Kota: ${values.city}`,
        values.preferredDate ? `Tanggal yang diinginkan: ${values.preferredDate}` : undefined,
        values.need ? `Kebutuhan: ${values.need}` : undefined,
        values.message ? `Catatan: ${values.message}` : undefined,
        `No. telepon: ${values.phone}`,
      ]
        .filter((l): l is string => Boolean(l))
        .join('\n');

      setWaUrl(buildWhatsAppUrl(message));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="border border-savlune-gold/30 bg-charcoal-900/50 p-8 text-center">
        <p className="font-display text-2xl text-offwhite">Permintaan Terkirim</p>
        <p className="mt-2 text-sm text-white/55">
          Data Anda sudah kami terima. Lanjutkan ke WhatsApp agar sales dapat segera menindaklanjuti.
        </p>
        {waUrl && (
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block">
            <Button variant="whatsapp">Lanjutkan ke WhatsApp</Button>
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className="text-xs uppercase tracking-widest2 text-white/40">Nama Lengkap</label>
        <input {...register('name')} className={inputClasses} placeholder="Nama Anda" />
        {errors.name && <p className="mt-1.5 text-xs text-mitsubishi-red">{errors.name.message}</p>}
      </div>

      <div>
        <label className="text-xs uppercase tracking-widest2 text-white/40">No. WhatsApp</label>
        <input {...register('phone')} className={inputClasses} placeholder="0812xxxxxxx" />
        {errors.phone && <p className="mt-1.5 text-xs text-mitsubishi-red">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="text-xs uppercase tracking-widest2 text-white/40">Kota</label>
        <input {...register('city')} className={inputClasses} placeholder="Samarinda" />
        {errors.city && <p className="mt-1.5 text-xs text-mitsubishi-red">{errors.city.message}</p>}
      </div>

      <div className="sm:col-span-2">
        <label className="text-xs uppercase tracking-widest2 text-white/40">Email (opsional)</label>
        <input {...register('email')} className={inputClasses} placeholder="nama@email.com" />
        {errors.email && <p className="mt-1.5 text-xs text-mitsubishi-red">{errors.email.message}</p>}
      </div>

      <div className="sm:col-span-2">
        <label className="text-xs uppercase tracking-widest2 text-white/40">Kendaraan</label>
        <select {...register('vehicleSlug')} className={inputClasses} defaultValue={defaultVehicleSlug}>
          <option value="" className="bg-charcoal-900">
            Belum menentukan
          </option>
          {vehicles.map((v) => (
            <option key={v.slug} value={v.slug} className="bg-charcoal-900">
              {v.name}
            </option>
          ))}
        </select>
      </div>

      {showDatePicker && (
        <div>
          <label className="text-xs uppercase tracking-widest2 text-white/40">Tanggal Diinginkan</label>
          <input type="date" {...register('preferredDate')} className={inputClasses} />
        </div>
      )}

      {showNeedField && (
        <div className={showDatePicker ? '' : 'sm:col-span-2'}>
          <label className="text-xs uppercase tracking-widest2 text-white/40">Kebutuhan</label>
          <input {...register('need')} className={inputClasses} placeholder="Mis. mobil keluarga" />
        </div>
      )}

      <div className="sm:col-span-2">
        <label className="text-xs uppercase tracking-widest2 text-white/40">Catatan (opsional)</label>
        <textarea {...register('message')} rows={3} className={inputClasses} placeholder="Ceritakan kebutuhan Anda" />
      </div>

      <div className="sm:col-span-2">
        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Mengirim...' : submitLabel}
        </Button>
        {status === 'error' && (
          <p className="mt-3 text-sm text-mitsubishi-red">
            Gagal mengirim data. Silakan coba lagi atau hubungi sales langsung via WhatsApp.
          </p>
        )}
      </div>
    </form>
  );
}

function labelFor(type: LeadType): string {
  switch (type) {
    case 'test-drive':
      return 'jadwal test drive';
    case 'trade-in':
      return 'penawaran trade-in';
    case 'consultation':
      return 'konsultasi kendaraan';
    case 'financing-simulation':
      return 'simulasi pembiayaan';
    default:
      return 'permintaan informasi';
  }
}
