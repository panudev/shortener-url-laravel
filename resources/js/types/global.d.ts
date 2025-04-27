import { Config } from 'ziggy-js';

declare global {
    interface Window {
        Ziggy: Config;
    }
}

export {};
