import { Head, usePage } from '@inertiajs/react';
import AdminSidebar from '@/components/admin/admin-sidebar';

type Link = {
    id: string;
    original_url: string;
    shortener_url: string;
    clicks: number;
    created_at: string;
};

type User = {
    id: string;
    name: string;
    username: string;
    email: string;
};

type PageProps = {
    user: User;
    links: {
        data: Link[];
        current_page: number;
        last_page: number;
        next_page_url: string | null;
        prev_page_url: string | null;
    };
};

export default function AdminUserLinks() {
    const { user, links } = usePage<PageProps>().props;

    const goToPage = (url: string | null) => {
        if (url) window.location.href = url;
    };

    return (
        <div className="flex min-h-screen bg-[#18181b]">
            <AdminSidebar active="users" />
            <main className="flex-1">
                <Head title={`Links of ${user.name || user.username}`} />
                <div className="mx-auto mt-8 w-full max-w-4xl rounded-2xl bg-white/90 p-8 shadow-2xl ring-1 ring-black/10 dark:bg-[#232326]/90 dark:ring-white/10">
                    <h2 className="mb-6 text-2xl font-bold dark:text-white text-center">
                        Links of {user.name || user.username}
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Original URL</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Short Link</th>
                                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Clicks</th>
                                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Created</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {links.data.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="py-6 text-center text-gray-400 dark:text-gray-500">
                                            No links found.
                                        </td>
                                    </tr>
                                )}
                                {links.data.map(link => (
                                    <tr key={link.id}>
                                        <td className="px-4 py-2 break-all text-sm text-gray-700 dark:text-gray-200">{link.original_url}</td>
                                        <td className="px-4 py-2 text-sm">
                                            <a
                                                href={link.shortener_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline dark:text-blue-400 break-all"
                                            >
                                                {link.shortener_url}
                                            </a>
                                        </td>
                                        <td className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-200">{link.clicks}</td>
                                        <td className="px-4 py-2 text-center text-xs text-gray-500 dark:text-gray-400">
                                            {new Date(link.created_at).toLocaleDateString('en-GB')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <div className="mt-6 flex justify-center gap-2">
                        <button
                            disabled={!links.prev_page_url}
                            onClick={() => goToPage(links.prev_page_url)}
                            className="rounded px-3 py-1 text-sm font-semibold bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="px-2 py-1 text-sm text-gray-600 dark:text-gray-300">
                            Page {links.current_page} of {links.last_page}
                        </span>
                        <button
                            disabled={!links.next_page_url}
                            onClick={() => goToPage(links.next_page_url)}
                            className="rounded px-3 py-1 text-sm font-semibold bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
