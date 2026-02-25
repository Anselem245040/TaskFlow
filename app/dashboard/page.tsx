"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Plus,
    Search,
    LayoutGrid,
    List as ListIcon,
    MoreVertical,
    Users,
    Clock,
    ChevronRight,
    LogOut,
    User as UserIcon,
    Settings,
    Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface Room {
    id: string;
    name: string;
    description: string;
    ownerId: string;
    createdAt: string;
    _count?: {
        members: number;
        tasks: number;
    };
}

export default function DashboardPage() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    const handleLogout = () => {
        // UI Action: Add your logout logic here
    };

    return (
        <div className="min-h-screen bg-[#0f0c29] text-white">
            {/* Dashboard Nav */}
            <nav className="border-b border-white/5 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                                <LayoutGrid className="h-4 w-4" />
                            </div>
                            <span className="text-xl font-bold">TaskFlow</span>
                        </Link>
                        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
                            <Link href="/dashboard" className="text-white">Dashboard</Link>
                            <Link href="/tasks" className="hover:text-white transition-colors">My Tasks</Link>
                            <Link href="/calendar" className="hover:text-white transition-colors">Calendar</Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                            <Search className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                            <Bell className="h-5 w-5" />
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8 border border-white/10">
                                        <AvatarImage src="" alt={user?.name} />
                                        <AvatarFallback className="bg-violet-600 text-white">
                                            {user?.name?.charAt(0) || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 glass border-white/10 text-white" align="end">
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                                        <p className="text-xs leading-none text-zinc-400">{user?.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-white/10" />
                                <DropdownMenuItem className="hover:bg-white/5 cursor-pointer">
                                    <UserIcon className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-white/5 cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-white/10" />
                                <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:bg-red-400/10 cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">My Workspaces</h1>
                        <p className="text-zinc-400">Manage your rooms and collaborate with your team</p>
                    </div>
                    <Button className="bg-white text-black hover:bg-zinc-200 transition-all">
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Room
                    </Button>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <Card key={i} className="glass border-white/5 bg-white/5 animate-pulse h-48" />
                        ))}
                    </div>
                ) : rooms.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rooms.map((room) => (
                            <RoomCard key={room.id} room={room} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center glass rounded-3xl border-dashed border-2 border-white/10">
                        <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                            <LayoutGrid className="h-10 w-10 text-zinc-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No rooms found</h3>
                        <p className="text-zinc-400 max-w-sm mb-8">
                            You haven't joined or created any rooms yet. Start by creating your first workspace.
                        </p>
                        <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white">
                            Create My First Room
                        </Button>
                    </div>
                )}
            </main>
        </div>
    );
}

function RoomCard({ room }: { room: Room }) {
    return (
        <Link href={`/rooms/${room.id}`}>
            <Card className="glass glass-hover border-white/10 bg-white/5 overflow-hidden transition-all group">
                <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-white/10 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
                            <Users className="h-6 w-6" />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                                <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="glass border-white/10 text-white">
                                <DropdownMenuItem>Rename</DropdownMenuItem>
                                <DropdownMenuItem>Room Settings</DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-white/10" />
                                <DropdownMenuItem className="text-red-400">Leave Room</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <CardTitle className="text-xl mt-4 group-hover:text-violet-400 transition-colors">{room.name}</CardTitle>
                    <CardDescription className="line-clamp-2 text-zinc-400 mt-2">
                        {room.description || "No description provided for this workspace."}
                    </CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                    <div className="flex items-center gap-4 text-sm text-zinc-500">
                        <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{room._count?.members || 0} Members</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{new Date(room.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="pt-0 flex items-center justify-between border-t border-white/5 mt-2 bg-black/20 px-6 py-4">
                    <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                        Active
                    </Badge>
                    <div className="flex items-center text-xs text-zinc-400 group-hover:text-white transition-colors">
                        Open Room
                        <ChevronRight className="ml-1 h-3 w-3" />
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}

import Link from "next/link";
