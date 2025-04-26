import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Link Shortener',
        href: '/dashboard',
    }
];

type UrlsForm = {
    url: string;
    want_qr: boolean;
};

type Result = {
    short_url?: string;
    qr_url?: string;
};

export default function Dashboard() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<UrlsForm>>({
        url: '',
        want_qr: false,
    });
    const { props } = usePage();
    const result: Result = props.result ?? { short_url: undefined, qr_url: undefined };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('urls.store'), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Link Shortener" />
            <div className="flex min-h-[90vh] flex-1 flex-col items-center justify-center p-4">
                <form
                    onSubmit={submit}
                    className="flex w-full max-w-xl flex-col gap-6 rounded-2xl bg-white/90 p-10 shadow-2xl ring-1 ring-black/10 dark:bg-[#18181b]/90 dark:ring-white/10"
                >
                    <h2 className="text-center text-3xl font-bold dark:text-white">Shorten your link</h2>
                    <div>
                        <label className="mb-1 block text-base font-semibold dark:text-white">Paste your long link here</label>
                        <input
                            type="text"
                            placeholder="https://example.com"
                            value={data.url}
                            onChange={(e) => setData('url', e.target.value)}
                            className="w-full rounded-md border p-3 text-base dark:border-[#333] dark:bg-[#232326] dark:text-white dark:placeholder:text-gray-500"
                        />
                        {errors.url && <div className="mt-1 text-sm text-red-500">{errors.url}</div>}
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Example: https://yourdomain.com/very-long-link</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            id="want_qr"
                            type="checkbox"
                            checked={data.want_qr}
                            onChange={(e) => setData('want_qr', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="want_qr" className="text-sm dark:text-white">
                            Also generate QR Code
                        </label>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">If checked, you will get both a short link and a QR code.</p>
                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-2 w-full rounded-md bg-blue-600 py-3 text-lg font-bold text-white transition hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                    >
                        {data.want_qr ? 'Get Short link & QR Code' : 'Get Short link'}
                    </button>
                </form>

                {result && (
                    <div className="mt-8 flex w-full max-w-xl flex-col items-center gap-4 rounded-xl bg-white/80 p-6 shadow dark:bg-[#232326]/90">
                        <h3 className="mb-2 text-xl font-semibold dark:text-white">Your Result</h3>
                        {result.short_url && (
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-gray-600 dark:text-gray-300">Short link:</span>
                                <a
                                    href={result.short_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="break-all text-blue-600 underline dark:text-blue-400"
                                >
                                    {result.short_url}
                                </a>
                            </div>
                        )}
                        {result.qr_url && (
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-gray-600 dark:text-gray-300">QR Code:</span>
                                <img src={result.qr_url} alt="QR Code" className="h-32 w-32 rounded bg-white p-2 shadow" />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
