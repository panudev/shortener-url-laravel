import { type SharedData } from '@/types';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { Fragment, useEffect, useState } from 'react';
import { route } from 'ziggy-js';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const { data, setData, processing, errors } = useForm({
        url: '',
    });
    const [mode, setMode] = useState<'shorten' | 'qrcode'>('shorten');
    console.log(window.Ziggy)
    useEffect(() => {
        if (typeof window.Ziggy !== 'undefined' && window.Ziggy.routes && auth.user) {
            window.location.href = route('dashboard');
        }
    }, [auth.user]);

    if (auth.user) return null;

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!auth.user) {
            window.location.href = route('login');
            return;
        }
    };
    

    return (
        <Fragment>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#000000]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Link Shortener
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <form
                            onSubmit={submit}
                            className="flex w-full flex-col items-center space-y-6 rounded-lg bg-white p-8 shadow-lg lg:flex-row lg:items-stretch dark:border dark:border-[#27272a] dark:bg-[#18181b] dark:shadow-xl"
                        >
                            <div className="flex flex-1 flex-col justify-center space-y-6">
                                <div className="mb-2 flex items-center justify-center space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setMode('shorten')}
                                        className={`rounded-l-lg px-4 py-2 font-semibold outline-none ${
                                            mode === 'shorten'
                                                ? 'border border-blue-600 bg-blue-600 text-white ring-2 ring-blue-400 dark:border-blue-400 dark:bg-blue-500 dark:text-white'
                                                : 'border border-blue-600 bg-white text-blue-600 dark:border-blue-700 dark:bg-[#232326] dark:text-blue-400'
                                        } focus-visible:ring-blue-400' hover:bg-blue-700 focus-visible:ring-2 dark:hover:bg-blue-600`}
                                        autoFocus={mode === 'shorten'}
                                    >
                                        Short link
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setMode('qrcode')}
                                        className={`rounded-r-lg px-4 py-2 font-semibold outline-none ${
                                            mode === 'qrcode'
                                                ? 'border border-blue-600 bg-blue-600 text-white ring-2 ring-blue-400 dark:border-blue-400 dark:bg-blue-500 dark:text-white'
                                                : 'border border-blue-600 bg-white text-blue-600 dark:border-blue-700 dark:bg-[#232326] dark:text-blue-400'
                                        } focus-visible:ring-blue-400' hover:bg-blue-700 focus-visible:ring-2 dark:hover:bg-blue-600`}
                                        autoFocus={mode === 'qrcode'}
                                    >
                                        QR Code
                                    </button>
                                </div>

                                {mode === 'shorten' ? (
                                    <>
                                        <div className="text-center">
                                            <h2 className="text-2xl font-bold dark:text-white">Shorten a long link</h2>
                                        </div>
                                        <label className="mt-2 mb-1 text-base font-semibold dark:text-white">Paste your long link here</label>
                                        <input
                                            type="text"
                                            placeholder="https://example.com"
                                            value={data.url}
                                            onChange={(e) => setData('url', e.target.value)}
                                            className="w-full rounded-md border p-3 dark:border-[#333] dark:bg-[#232326] dark:text-white dark:placeholder:text-gray-500"
                                        />
                                        {errors.url && <div className="text-sm text-red-500">{errors.url}</div>}
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full rounded-md bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                                        >
                                            Get your link
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="text-left">
                                            <h2 className="text-2xl font-bold dark:text-white">Create a QR Code</h2>
                                        </div>
                                        <label className="mt-2 mb-1 text-base font-semibold dark:text-white">Enter your QR Code destination</label>
                                        <input
                                            type="text"
                                            placeholder="https://example.com"
                                            value={data.url}
                                            onChange={(e) => setData('url', e.target.value)}
                                            className="w-full rounded-md border p-3 dark:border-[#333] dark:bg-[#232326] dark:text-white dark:placeholder:text-gray-500"
                                        />
                                        {errors.url && <div className="text-sm text-red-500">{errors.url}</div>}
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                                        >
                                            Get your QR Code
                                            <span aria-hidden>→</span>
                                        </button>
                                    </>
                                )}
                            </div>
                            {mode === 'qrcode' && (
                                <div className="hidden flex-1 items-center justify-center lg:flex">
                                    <img src="/storage/qrcodes/QR-Code-Default.png" alt="QR Code Example" className="max-w-xs rounded-lg" />
                                </div>
                            )}
                        </form>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </Fragment>
    );
}
