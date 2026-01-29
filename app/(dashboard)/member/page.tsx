"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    CheckCircle2,
    Clock,
    FolderKanban,
    MoreHorizontal,
    Circle,
    Loader2,
    LayoutDashboard,
    ArrowUpRight,
    Calendar,
    Target
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

type TaskStatus = "pending" | "inProgress" | "done"

interface Task {
    id: number
    title: string
    priority: "High" | "Medium" | "Low"
    due: string
    project: string
    status: TaskStatus
}

export default function MemberDashboard() {

    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: "Fix navigation bug", priority: "High", due: "Today", project: "Website Redesign", status: "inProgress" },
        { id: 2, title: "Update documentation", priority: "Medium", due: "Tomorrow", project: "App Core", status: "pending" },
        { id: 3, title: "Review PR #45", priority: "Low", due: "Next Week", project: "App Core", status: "pending" },
        { id: 4, title: "Design new landing page", priority: "High", due: "Today", project: "Marketing", status: "done" },
    ])

    const rooms = [
        { id: 1, name: "Website Redesign", updated: "2h ago" },
        { id: 2, name: "Mobile App Development", updated: "5h ago" },
        { id: 3, name: "Marketing Campaign", updated: "1d ago" },
    ]

    const updateTaskStatus = (taskId: number, newStatus: TaskStatus) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
        ))
    }

    const getStatusBadge = (status: TaskStatus) => {
        switch (status) {
            case "done":
                return <Badge variant="success" className="gap-1 px-2 h-5 text-[9px] font-black uppercase"><CheckCircle2 className="h-3 w-3" />Finished</Badge>
            case "inProgress":
                return <Badge variant="inProgress" className="gap-1 px-2 h-5 text-[9px] font-black uppercase"><Loader2 className="h-3 w-3 animate-spin" />Active</Badge>
            case "pending":
                return <Badge variant="pending" className="gap-1 px-2 h-5 text-[9px] font-black uppercase"><Clock className="h-3 w-3" />Queued</Badge>
        }
    }

    const pendingCount = tasks.filter(t => t.status === "pending").length
    const doneCount = tasks.filter(t => t.status === "done").length
    const inProgressCount = tasks.filter(t => t.status === "inProgress").length

    return (
        <div className="space-y-10 animate-fade-in-up pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black tracking-tight text-white leading-tight">My Workspace</h1>
                    <div className="flex items-center gap-3">
                        <p className="text-gray-500 font-bold text-xs uppercase tracking-widest italic">Personal Terminal</p>
                        <span className="h-1 w-1 rounded-full bg-gray-700" />
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter">Sync Active: 99.9%</span>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-2 glass px-4 py-2 rounded-2xl border-white/5 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px] shadow-emerald-500 animate-pulse mr-1" />
                    Realtime Sync
                </div>
            </div>

            {/* Performance Shards */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <MemberStatCard label="Task Backlog" value={pendingCount} icon={<Clock className="h-5 w-5" />} color="text-blue-400" glow="shadow-blue-500/10" />
                <MemberStatCard label="Current Sprint" value={inProgressCount} icon={<Loader2 className="h-5 w-5" />} color="text-violet-400" glow="shadow-violet-500/10" />
                <MemberStatCard label="Total Output" value={doneCount} icon={<CheckCircle2 className="h-5 w-5" />} color="text-emerald-400" glow="shadow-emerald-500/10" />
                <MemberStatCard label="Shared Hubs" value={rooms.length} icon={<FolderKanban className="h-5 w-5" />} color="text-indigo-400" glow="shadow-indigo-500/10" />
            </div>

            <div className="grid gap-8 lg:grid-cols-7">
                {/* Tasks Shard */}
                <Card className="lg:col-span-4 glass border-white/5 bg-[#161726]/40 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl pointer-events-none" />
                    <CardHeader className="pb-8">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-base font-black text-gray-100 uppercase tracking-widest flex items-center gap-3">
                                    <Target className="h-4 w-4 text-violet-400" />
                                    Active Mission
                                </CardTitle>
                                <CardDescription className="text-[10px] font-bold text-gray-600 uppercase tracking-tight">
                                    High priority objectives assigned to your terminal
                                </CardDescription>
                            </div>
                            <Button variant="ghost" className="h-8 -mt-2 glass border-white/5 px-3 text-[9px] font-black uppercase tracking-widest hover:bg-white/10">
                                Expand View
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="px-0">
                        <div className="space-y-0.5">
                            {tasks.map((task) => (
                                <Link key={task.id} href={`/member/tasks/${task.id}`} className="block group">
                                    <div className="flex items-center justify-between gap-4 p-5 hover:bg-white/[0.04] transition-all border-b border-white/[0.02] last:border-0 border-l-2 border-l-transparent hover:border-l-indigo-500">
                                        <div className="flex items-center gap-5 flex-1 min-w-0">
                                            <div className={`h-2.5 w-2.5 rounded-full shrink-0 shadow-[0_0_8px] shadow-current ${task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'
                                                }`} />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <p className={`font-bold text-sm tracking-tight truncate ${task.status === 'done' ? 'line-through text-gray-500 opacity-50' : 'text-gray-100'}`}>
                                                        {task.title}
                                                    </p>
                                                    {getStatusBadge(task.status)}
                                                </div>
                                                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-tight truncate">
                                                    {task.project} • <span className="opacity-60 italic">Deadline: {task.due}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <ArrowUpRight className="h-4 w-4 text-gray-700 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all opacity-0 group-hover:opacity-100" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Collaboration Hubs */}
                <Card className="lg:col-span-3 glass border-white/5 bg-[#161726]/40 shadow-2xl relative overflow-hidden">
                    <CardHeader className="pb-8">
                        <CardTitle className="text-base font-black text-gray-100 uppercase tracking-widest flex items-center gap-3">
                            <FolderKanban className="h-4 w-4 text-indigo-400" />
                            Force Hubs
                        </CardTitle>
                        <CardDescription className="text-[10px] font-bold text-gray-600 uppercase tracking-tight">Active collaborative environments</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-2 pb-8">
                        {rooms.map((room) => (
                            <Link key={room.id} href={`/member/rooms/${room.id}`}>
                                <div className="group flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:ring-1 hover:ring-indigo-500/20 transition-all shadow-lg">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-black text-xs shadow-xl shadow-indigo-600/20 group-hover:scale-110 transition-transform">
                                            {room.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-black text-gray-100 text-sm tracking-tight">{room.name}</p>
                                            <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] mt-1 italic">Last Pulse: {room.updated}</p>
                                        </div>
                                    </div>
                                    <Circle className="h-1.5 w-1.5 fill-indigo-500 text-indigo-500 opacity-20 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </Link>
                        ))}
                        <div className="pt-4 mt-2 border-t border-white/[0.04]">
                            <Button variant="ghost" className="w-full h-12 rounded-2xl border border-dashed border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-indigo-400 hover:border-indigo-500/30 hover:bg-indigo-500/5">
                                Browse Archive Hubs
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function MemberStatCard({ label, value, icon, color, glow }: any) {
    return (
        <Card className={`glass border-white/5 bg-[#161726]/40 hover:bg-white/[0.05] transition-all group shadow-2xl ${glow}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 group-hover:text-gray-400 transition-colors">
                    {label}
                </CardTitle>
                <div className={`${color} opacity-30 group-hover:opacity-100 transition-all duration-500`}>{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-black text-white group-hover:scale-105 transition-transform w-fit origin-left">{value}</div>
            </CardContent>
        </Card>
    )
}
