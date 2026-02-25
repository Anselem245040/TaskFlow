"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import {
    Plus,
    Users,
    Settings,
    Layout,
    CheckCircle2,
    Clock,
    Filter,
    MoreHorizontal,
    PlusCircle,
    Search,
    ArrowLeft,
    Calendar,
    UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import Link from "next/link";

interface Task {
    id: string;
    title: string;
    description: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    assignee?: {
        id: string;
        name: string;
    };
}

interface RoomDetails {
    id: string;
    name: string;
    description: string;
    inviteCode: string;
    members: any[];
}

export default function RoomPage({ params }: { params: Promise<{ roomId: string }> }) {
    const { roomId } = use(params);
    const [room, setRoom] = useState<RoomDetails | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const getTasksByStatus = (status: Task['status']) => {
        return tasks.filter(task => task.status === status);
    };

    return (
        <div className="min-h-screen bg-[#0f0c29] text-white">
            {/* Room Header */}
            <header className="border-b border-white/5 bg-black/20 backdrop-blur-xl sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="h-8 w-8 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors">
                            <ArrowLeft className="h-4 w-4 text-zinc-400" />
                        </Link>
                        <div className="h-px w-4 bg-white/10 hidden sm:block" />
                        <div>
                            <h1 className="text-lg font-bold">Project: {room?.name || "Loading..."}</h1>
                            <p className="text-xs text-zinc-400 hidden sm:block">Invite Code: <span className="text-violet-400 font-mono">{room?.inviteCode}</span></p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-2 mr-4">
                            {room?.members?.slice(0, 3).map((member, i) => (
                                <Avatar key={i} className="h-8 w-8 border-2 border-[#0f0c29]">
                                    <AvatarFallback className="bg-indigo-600 text-[10px]">{member.user?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                            ))}
                            {room?.members && room.members.length > 3 && (
                                <div className="h-8 w-8 rounded-full bg-zinc-800 border-2 border-[#0f0c29] flex items-center justify-center text-[10px] text-zinc-400">
                                    +{room.members.length - 3}
                                </div>
                            )}
                        </div>
                        <Button size="sm" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Invite
                        </Button>
                        <Button size="sm" variant="ghost" className="text-zinc-400 hover:text-white">
                            <Settings className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-[1600px] mx-auto p-6">
                {/* Kanban Board */}
                <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-elegant">
                    <BoardColumn
                        title="To Do"
                        tasks={getTasksByStatus('PENDING')}
                        color="bg-zinc-500/10 border-zinc-500/20"
                        borderColor="border-zinc-500/50"
                    />
                    <BoardColumn
                        title="In Progress"
                        tasks={getTasksByStatus('IN_PROGRESS')}
                        color="bg-violet-500/10 border-violet-500/20"
                        borderColor="border-violet-500/50"
                    />
                    <BoardColumn
                        title="Completed"
                        tasks={getTasksByStatus('COMPLETED')}
                        color="bg-green-500/10 border-green-500/20"
                        borderColor="border-green-500/50"
                    />
                </div>
            </main>
        </div>
    );
}

function BoardColumn({ title, tasks, color, borderColor }: { title: string, tasks: Task[], color: string, borderColor: string }) {
    return (
        <div className={`flex-shrink-0 w-80 rounded-2xl ${color} border p-4 flex flex-col h-[calc(100vh-12rem)]`}>
            <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm tracking-wide uppercase text-zinc-300">{title}</h3>
                    <Badge variant="outline" className="bg-white/5 border-white/10 text-zinc-400">
                        {tasks.length}
                    </Badge>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-500 hover:text-white">
                    <Plus className="h-4 w-4" />
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
                {tasks.length === 0 && (
                    <div className="h-20 border-2 border-dashed border-white/5 rounded-xl flex items-center justify-center text-xs text-zinc-600">
                        No tasks here
                    </div>
                )}
                <Button variant="ghost" className="w-full justify-start text-zinc-500 hover:text-white hover:bg-white/5 h-9 text-xs mt-2">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Task
                </Button>
            </div>
        </div>
    );
}

function TaskCard({ task }: { task: Task }) {
    const priorityColors = {
        LOW: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        MEDIUM: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
        HIGH: "bg-red-500/10 text-red-500 border-red-500/20"
    };

    return (
        <Card className="glass border-white/5 bg-black/40 hover:border-white/10 hover:bg-black/60 transition-all cursor-pointer group shadow-xl">
            <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className={`text-[10px] h-5 ${priorityColors[task.priority]}`}>
                        {task.priority}
                    </Badge>
                    <button className="text-zinc-600 hover:text-zinc-400">
                        <MoreHorizontal className="h-4 w-4" />
                    </button>
                </div>
                <h4 className="font-semibold text-sm mb-2 group-hover:text-violet-400 transition-colors">{task.title}</h4>
                <p className="text-xs text-zinc-500 line-clamp-2 mb-4">{task.description}</p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-zinc-500">
                        <Avatar className="h-5 w-5 border border-white/10">
                            <AvatarFallback className="text-[8px] bg-zinc-800">{task.assignee?.name?.charAt(0) || <Clock className="h-3 w-3" />}</AvatarFallback>
                        </Avatar>
                        <span className="text-[10px]">{task.assignee?.name || "Unassigned"}</span>
                    </div>
                    <div className="flex items-center gap-1 text-zinc-600">
                        <Calendar className="h-3 w-3" />
                        <span className="text-[10px]">Aug 24</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
