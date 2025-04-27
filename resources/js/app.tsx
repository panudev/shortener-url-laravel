import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { Ziggy } from './ziggy'; 
import { route as ziggyRoute, type Config } from 'ziggy-js';

declare global {
    interface Window {
        Ziggy: Config;
        route: typeof ziggyRoute;
    }
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const url = new URL(window.location.href);
        // Set global Ziggy config
        window.Ziggy = {
            ...(Ziggy as Config),
            location: {
                host: url.host,
                pathname: url.pathname,
                search: url.search,
            },
        };
        window.route = ziggyRoute;
    
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

initializeTheme();
