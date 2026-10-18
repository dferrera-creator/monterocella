import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import createServer from '@inertiajs/react/server';
import ReactDOMServer from 'react-dom/server';

createServer((page: Parameters<typeof createInertiaApp>[0]['page']) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: title => title ? `${title} — Monte Rocella` : 'Monte Rocella',
        resolve: name =>
            resolvePageComponent(
                `./pages/${name}.tsx`,
                import.meta.glob('./pages/**/*.tsx'),
            ),
        setup: ({ App, props }) => <App {...props} />,
    }),
);
