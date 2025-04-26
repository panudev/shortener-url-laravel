import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function AdminLogin() {
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-[#18181b]">
            <Head title="Admin Login" />
            <form onSubmit={submit} className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-[#000000]">
                <h2 className="mb-6 text-center text-2xl font-bold dark:text-white">Admin Login</h2>
                <div className="mb-4">
                    <Label htmlFor="email">Username</Label>
                    <Input
                        id="username"
                        type="text"
                        required
                        autoFocus
                        tabIndex={0}
                        autoComplete="username"
                        value={data.username}
                        onChange={(e) => setData('username', e.target.value)}
                        placeholder="Username"
                    />
                    <InputError message={errors.username} />
                </div>
                <div className="mb-6">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        required
                        tabIndex={1}
                        autoComplete="current-password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="***********"
                    />
                    <InputError message={errors.password} />
                </div>
                <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Log in
                </Button>
            </form>
        </div>
    );
}
