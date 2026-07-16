import type { Vehicle, VehicleHighlight } from '@/types';

const CHAPTERS: { key: VehicleHighlight['chapter']; number: string; title: string; description: string }[] = [
  { key: 'presence', number: '01', title: 'Presence', description: 'Desain yang kuat dari setiap sudut.' },
  { key: 'comfort', number: '02', title: 'Comfort', description: 'Kabin yang dirancang untuk perjalanan panjang.' },
  {
    key: 'technology',
    number: '03',
    title: 'Technology',
    description: 'Teknologi berkendara yang membantu pengemudi.',
  },
  {
    key: 'confidence',
    number: '04',
    title: 'Confidence',
    description: 'Fitur keselamatan dan kontrol berkendara.',
  },
  {
    key: 'ownership',
    number: '05',
    title: 'Ownership',
    description: 'Layanan purna jual dan kemudahan pembiayaan.',
  },
];

export function FeatureStory({ vehicle }: { vehicle: Vehicle }) {
  return (
    <section className="border-t border-white/10">
      {CHAPTERS.map((chapter, i) => {
        const items = vehicle.highlights.filter((h) => h.chapter === chapter.key);
        return (
          <div
            key={chapter.key}
            className={i % 2 === 1 ? 'bg-charcoal-900/40' : undefined}
          >
            <div className="container-content grid grid-cols-1 gap-8 border-b border-white/10 py-16 md:grid-cols-[220px_1fr] md:py-20">
              <div>
                <span className="section-number">{chapter.number}</span>
                <h3 className="mt-2 font-display text-3xl font-light text-offwhite">{chapter.title}</h3>
                <p className="mt-2 text-sm text-white/50">{chapter.description}</p>
              </div>
              <div>
                {items.length > 0 ? (
                  <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {items.map((item) => (
                      <li key={item.title}>
                        <h4 className="font-medium text-offwhite">{item.title}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-white/55">{item.description}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="max-w-md text-sm leading-relaxed text-white/35">
                    Materi {chapter.title.toLowerCase()} untuk {vehicle.name} menunggu konfirmasi dari
                    sumber resmi. Hubungi sales untuk penjelasan lengkap dan brosur terbaru.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
