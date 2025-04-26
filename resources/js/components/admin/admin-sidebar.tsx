import { Link, router, usePage } from '@inertiajs/react';

type Admin = {
    username: string;
    name?: string;
};

type SidebarProps = {
    active?: string; 
};

type PageProps = { auth?: { user: Admin } };

export default function AdminSidebar({ active }: SidebarProps) {
    const { auth } = usePage<PageProps>().props;
    console.log(auth)
    const handleLogout = () => {
        router.post('/admin/logout');
    };

   
    const getInitials = (name?: string, username?: string) => {
        if (name && name.trim().length > 0) {
            return name.split(' ').map(w => w[0]).join('').toUpperCase();
        }
        if (username) {
            return username.slice(0, 2).toUpperCase();
        }
        return 'AD';
    };

    return (
        <aside className="flex flex-col h-screen w-64 bg-[#232326] text-white shadow-lg">
            <div className="flex items-center gap-3 px-6 py-6 border-b border-[#333]">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-700 text-white font-bold text-xl">
                    {getInitials(auth?.user?.name, auth?.user?.username)}
                </div>
                <div>
                    <div className="font-semibold">{auth?.user?.name || auth?.user?.username}</div>
                    <div className="text-xs text-gray-400">Admin</div>
                </div>
            </div>
            <nav className="flex-1 px-4 py-6">
                <ul className="space-y-2">
                    <li>
                        <Link
                            href={route('admin.dashboard')}
                            className={`block rounded px-4 py-2 font-medium transition ${
                                active === 'users'
                                    ? 'bg-blue-600 text-white'
                                    : 'hover:bg-[#18181b] hover:text-blue-400'
                            }`}
                        >
                            Users
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="px-6 py-4 border-t border-[#333]">
                <button
                    onClick={handleLogout}
                    className="w-full rounded bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </div>
        </aside>
    );
}
