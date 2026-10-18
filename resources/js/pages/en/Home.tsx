import { AppLayout } from '@/components/layout/AppLayout';

export default function Home() {
    return (
        <AppLayout
            title="Luxury Stays in Los Cabos"
            description="Book direct at Monte Rocella — luxury residences in Cabo San Lucas with best price guarantee, flexible cancellation, and exclusive perks."
            alternates={[
                { locale: 'en', url: 'https://monterocellastays.com/' },
                { locale: 'es', url: 'https://monterocellastays.com/es' },
            ]}
        >
            {/* Hero — Phase 3 */}
            <section className="min-h-[90svh] flex items-end" style={{ background: 'var(--color-obsidian)' }}>
                <div className="container pb-24">
                    <p className="text-xs uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--accent)' }}>
                        Cabo San Lucas · Los Cabos, Mexico
                    </p>
                    <h1 className="font-display text-5xl md:text-7xl text-white mb-6" style={{ fontWeight: 300 }}>
                        Where the Desert<br />Meets the Pacific
                    </h1>
                    <p className="text-lg max-w-xl mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        Luxury residences managed by Del Mar Boutique. Book direct for the best rate, flexible cancellation, and a welcome package.
                    </p>
                </div>
            </section>

            {/* Placeholder sections — Phase 3 build */}
            <section id="stays" className="py-24">
                <div className="container">
                    <p className="text-xs uppercase tracking-[0.12em] text-[var(--accent)] mb-3">Our Stays</p>
                    <h2 className="font-display text-4xl mb-4">Curated for Every Escape</h2>
                    <p className="text-[var(--fg-muted)]">Stay content loads here in Phase 3.</p>
                </div>
            </section>

            <section id="amenities" className="py-24" style={{ background: 'var(--bg-inset)' }}>
                <div className="container">
                    <p className="text-xs uppercase tracking-[0.12em] text-[var(--accent)] mb-3">Amenities</p>
                    <h2 className="font-display text-4xl mb-4">Resort-Level Living</h2>
                    <p className="text-[var(--fg-muted)]">Amenities grid loads here in Phase 3.</p>
                </div>
            </section>

            <section id="location" className="py-24">
                <div className="container">
                    <p className="text-xs uppercase tracking-[0.12em] text-[var(--accent)] mb-3">Location</p>
                    <h2 className="font-display text-4xl mb-4">Prime Cabo San Lucas</h2>
                    <p className="text-[var(--fg-muted)]">Map and drive times load here in Phase 3.</p>
                </div>
            </section>

            <section id="faq" className="py-24" style={{ background: 'var(--bg-inset)' }}>
                <div className="container">
                    <p className="text-xs uppercase tracking-[0.12em] text-[var(--accent)] mb-3">FAQ</p>
                    <h2 className="font-display text-4xl mb-4">Common Questions</h2>
                    <p className="text-[var(--fg-muted)]">FAQ accordion loads here in Phase 3.</p>
                </div>
            </section>
        </AppLayout>
    );
}
