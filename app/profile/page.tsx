"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    User,
    Mail,
    Shield,
    Trash2,
    ArrowLeft,
    Save,
    Loader2,
    Camera,
    Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import Link from "next/link";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);
    const router = useRouter();

    const handleUpdateProfile = (e: React.FormEvent) => {
        e.preventDefault();
        // UI Action: Add your profile update logic here
    };

    const handleDeactivate = () => {
        // UI Action: Add your deactivation logic here
    };

    return (
        <div className="min-h-screen bg-[#0f0c29] text-white">
            <nav className="border-b border-white/5 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="h-8 w-8 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors">
                            <ArrowLeft className="h-4 w-4 text-zinc-400" />
                        </Link>
                        <h1 className="text-lg font-bold">Account Settings</h1>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sidebar / Info */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="text-center md:text-left">
                            <div className="relative inline-block mb-4">
                                <div className="h-24 w-24 rounded-full bg-indigo-600 flex items-center justify-center text-3xl font-bold border-4 border-[#0f0c29] shadow-xl">
                                    {name?.charAt(0) || "U"}
                                </div>
                                <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                    <Camera className="h-4 w-4" />
                                </button>
                            </div>
                            <h2 className="text-xl font-bold">{name}</h2>
                            <p className="text-zinc-400 text-sm">{email}</p>
                        </div>

                        <div className="space-y-1">
                            <Button variant="ghost" className="w-full justify-start text-indigo-400 bg-white/5">
                                <User className="mr-2 h-4 w-4" />
                                Public Profile
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-white">
                                <Shield className="mr-2 h-4 w-4" />
                                Security
                            </Button>
                        </div>
                    </div>

                    {/* Forms */}
                    <div className="md:col-span-2 space-y-6">
                        <Card className="glass border-white/10 bg-black/40">
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Update your account details and email address.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleUpdateProfile} className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-zinc-300">Display Name</Label>
                                            <Input
                                                id="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="bg-white/5 border-white/10 text-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-zinc-300">Email Address</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="bg-white/5 border-white/10 text-white"
                                            />
                                        </div>
                                    </div>
                                    <div className="pt-4 flex justify-end">
                                        <Button type="submit" className="bg-white text-black hover:bg-zinc-200" disabled={isSaving}>
                                            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                            Save Changes
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        <Card className="glass border-white/10 bg-black/40">
                            <CardHeader>
                                <CardTitle>Preferences</CardTitle>
                                <CardDescription>Manage how TaskFlow works for you.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-zinc-300">Email Notifications</Label>
                                        <p className="text-xs text-zinc-500 text-balance italic">Receive updates about your tasks and rooms.</p>
                                    </div>
                                    <Switch checked />
                                </div>
                                <Separator className="bg-white/5" />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-zinc-300">Desktop Notifications</Label>
                                        <p className="text-xs text-zinc-500">Get push notifications in your browser.</p>
                                    </div>
                                    <Switch checked />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-red-500/20 bg-red-500/5 glass">
                            <CardHeader>
                                <CardTitle className="text-red-400">Danger Zone</CardTitle>
                                <CardDescription className="text-red-400/60">Actions that cannot be undone.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-zinc-300">Deactivate Account</Label>
                                        <p className="text-xs text-zinc-500">Your data will be permanently deleted.</p>
                                    </div>
                                    <Button variant="destructive" size="sm" onClick={handleDeactivate} disabled={isDeactivating}>
                                        {isDeactivating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4 mr-2" />}
                                        Deactivate
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
