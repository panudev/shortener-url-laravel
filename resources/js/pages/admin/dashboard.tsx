import { Head, usePage } from '@inertiajs/react';
import AdminSidebar from '@/components/admin/admin-sidebar';
import { route } from 'ziggy-js';

type User = {
    id: string;
    name: string;
    username: string;
    email: string;
    created_at: string;
};

type PageProps = {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        next_page_url: string | null;
        prev_page_url: string | null;
    };
};

export default function Dashboard() {
    const { users } = usePage<PageProps>().props;

    if (!users) return <div className="text-red-500">No user data.</div>;

    const goToPage = (url: string | null) => {
        if (url) window.location.href = url;
    };

    return (
        <div className="flex min-h-screen bg-[#18181b]">
            <AdminSidebar active="users" />
            <main className="flex-1">
                <Head title="All Users" />
                <div className="mx-auto mt-8 w-full max-w-4xl rounded-2xl bg-white/90 p-8 shadow-2xl ring-1 ring-black/10 dark:bg-[#232326]/90 dark:ring-white/10">
                    <h2 className="mb-6 text-2xl font-bold dark:text-white text-center">All Users</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Name</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Username</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Email</th>
                                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Created</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {users.data.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="py-6 text-center text-gray-400 dark:text-gray-500">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                                {users.data.map(user => (
                                    <tr
                                        key={user.id}
                                        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                                        onClick={() => window.location.href = route('admin.userlinks', { userId: user.id })}
                                    >
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">{user.name}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">{user.username}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">{user.email}</td>
                                        <td className="px-4 py-2 text-center text-xs text-gray-500 dark:text-gray-400">
                                            {new Date(user.created_at).toLocaleDateString('en-GB')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <div className="mt-6 flex justify-center gap-2">
                        <button
                            disabled={!users.prev_page_url}
                            onClick={() => goToPage(users.prev_page_url)}
                            className="rounded px-3 py-1 text-sm font-semibold bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="px-2 py-1 text-sm text-gray-600 dark:text-gray-300">
                            Page {users.current_page} of {users.last_page}
                        </span>
                        <button
                            disabled={!users.next_page_url}
                            onClick={() => goToPage(users.next_page_url)}
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
