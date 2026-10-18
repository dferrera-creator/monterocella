import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { hubspotTrackPage } from '@/lib/analytics';

createInertiaApp({
    title: title => title ? `${title} — Monte Rocella` : 'Monte Rocella',
    resolve: name =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: {
        color: 'var(--accent)',
        showSpinner: false,
    },
});

// Track page view in HubSpot on each Inertia navigation
if (typeof window !== 'undefined') {
    document.addEventListener('inertia:finish', () => {
        hubspotTrackPage();
    });
}
