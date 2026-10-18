import { AppLayout } from '@/components/layout/AppLayout';

export default function Home() {
    return (
        <AppLayout
            title="Estancias de Lujo en Los Cabos"
            description="Reserva directo en Monte Rocella — residencias de lujo en Cabo San Lucas con mejor precio garantizado, cancelación flexible y beneficios exclusivos."
            alternates={[
                { locale: 'en', url: 'https://monterocellastays.com/' },
                { locale: 'es', url: 'https://monterocellastays.com/es' },
            ]}
        >
            {/* Hero — Fase 3 */}
            <section className="min-h-[90svh] flex items-end" style={{ background: 'var(--color-obsidian)' }}>
                <div className="container pb-24">
                    <p className="text-xs uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--accent)' }}>
                        Cabo San Lucas · Los Cabos, México
                    </p>
                    <h1 className="font-display text-5xl md:text-7xl text-white mb-6" style={{ fontWeight: 300 }}>
                        Donde el Desierto<br />Se Encuentra con el Pacífico
                    </h1>
                    <p className="text-lg max-w-xl mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        Residencias de lujo gestionadas por Del Mar Boutique. Reserva directo para la mejor tarifa, cancelación flexible y un paquete de bienvenida.
                    </p>
                </div>
            </section>

            <section id="stays" className="py-24">
                <div className="container">
                    <p className="text-xs uppercase tracking-[0.12em] text-[var(--accent)] mb-3">Estancias</p>
                    <h2 className="font-display text-4xl mb-4">Para Cada Tipo de Escapada</h2>
                    <p className="text-[var(--fg-muted)]">El contenido de estancias cargará aquí en la Fase 3.</p>
                </div>
            </section>

            <section id="amenities" className="py-24" style={{ background: 'var(--bg-inset)' }}>
                <div className="container">
                    <p className="text-xs uppercase tracking-[0.12em] text-[var(--accent)] mb-3">Amenidades</p>
                    <h2 className="font-display text-4xl mb-4">Vida a Nivel Resort</h2>
                    <p className="text-[var(--fg-muted)]">La cuadrícula de amenidades cargará aquí en la Fase 3.</p>
                </div>
            </section>

            <section id="location" className="py-24">
                <div className="container">
                    <p className="text-xs uppercase tracking-[0.12em] text-[var(--accent)] mb-3">Ubicación</p>
                    <h2 className="font-display text-4xl mb-4">En el Corazón de Cabo San Lucas</h2>
                    <p className="text-[var(--fg-muted)]">El mapa y tiempos de traslado cargarán aquí en la Fase 3.</p>
                </div>
            </section>

            <section id="faq" className="py-24" style={{ background: 'var(--bg-inset)' }}>
                <div className="container">
                    <p className="text-xs uppercase tracking-[0.12em] text-[var(--accent)] mb-3">Preguntas frecuentes</p>
                    <h2 className="font-display text-4xl mb-4">Preguntas Comunes</h2>
                    <p className="text-[var(--fg-muted)]">El acordeón de preguntas cargará aquí en la Fase 3.</p>
                </div>
            </section>
        </AppLayout>
    );
}
