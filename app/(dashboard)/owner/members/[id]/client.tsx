"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Mail,
    ArrowLeft,
    CheckCircle2,
    Clock,
    Loader2,
    MoreHorizontal,
    Shield,
    UserX,
    Calendar,
    MessageSquare,
    ExternalLink,
    Trophy
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

type TaskStatus = "pending" | "inProgress" | "done"

interface Task {
    id: number
    title: string
    priority: "High" | "Medium" | "Low"
    due: string
    status: TaskStatus
    room: string
}

interface MemberDetailClientProps {
    id: string
}

export default function MemberDetailClient({ id }: MemberDetailClientProps) {
    // Mock data - in real app, fetch based on id
    const member = {
        id: id,
        name: "Alice Smith",
        email: "alice@example.com",
        role: "admin" as const,
        status: "active" as const,
        joinedDate: "Jan 15, 2024",
        bio: "Senior developer with 5+ years of experience in web development and team leadership.",
        tasksCompleted: 38,
        tasksInProgress: 5,
        tasksPending: 3
    }

    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: "Fix navigation bug", priority: "High", due: "Today", status: "inProgress", room: "Website Redesign" },
        { id: 2, title: "Update documentation", priority: "Medium", due: "Tomorrow", status: "pending", room: "App Core" },
        { id: 3, title: "Review PR #45", priority: "Low", due: "Next Week", status: "pending", room: "App Core" },
        { id: 4, title: "Add contact form", priority: "Low", due: "Last Week", status: "done", room: "Website Redesign" },
        { id: 5, title: "Optimize images", priority: "Medium", due: "Yesterday", status: "done", room: "Marketing" },
    ])

    const rooms = [
        { id: 1, name: "Website Redesign", role: "Admin" },
        { id: 2, name: "App Core", role: "Member" },
        { id: 3, name: "Marketing", role: "Member" },
    ]

    const updateTaskStatus = (taskId: number, newStatus: TaskStatus) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
        ))
    }

    const getStatusBadge = (status: TaskStatus) => {
        switch (status) {
            case "done":
                return <Badge variant="success" className="gap-1 px-2 h-5 text-[10px]"><CheckCircle2 className="h-3 w-3" />Done</Badge>
            case "inProgress":
                return <Badge variant="inProgress" className="gap-1 px-2 h-5 text-[10px]"><Loader2 className="h-3 w-3 animate-spin" />Active</Badge>
            case "pending":
                return <Badge variant="pending" className="gap-1 px-2 h-5 text-[10px]"><Clock className="h-3 w-3" />Pending</Badge>
        }
    }

    return (
        <div className="space-y-10 animate-fade-in-up pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-6">
                    <Link href="/owner/members" className="flex items-center gap-2 text-gray-500 hover:text-white transition-all w-fit group">
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-bold uppercase tracking-widest text-[10px]">Back to Team</span>
                    </Link>

                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
                            <Avatar className="h-24 w-24 rounded-3xl border-2 border-white/10 relative z-10">
                                <AvatarFallback className="text-3xl font-black bg-[#0f111a] text-indigo-400 italic">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-2 -right-2 bg-emerald-500 h-6 w-6 rounded-full border-4 border-[#0f111a] z-20" title="Online" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <h1 className="text-4xl font-black tracking-tight text-white">{member.name}</h1>
                                <Badge variant="outline" className="glass border-indigo-500/20 text-indigo-400 gap-1 px-2 h-6 font-bold uppercase tracking-widest text-[9px]">
                                    <Shield className="h-3 w-3" />
                                    {member.role}
                                </Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400 font-medium">
                                <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 opacity-50" /> {member.email}</span>
                                <span className="h-1 w-1 rounded-full bg-gray-700 hidden md:block" />
                                <span className="flex items-center gap-1.5 italic"><Calendar className="h-3.5 w-3.5 opacity-50" /> Joined {member.joinedDate}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="premium" className="gap-2 h-11 px-6 rounded-2xl shadow-xl shadow-indigo-600/20">
                        <Mail className="h-4 w-4" />
                        Send Direct Message
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="glass h-11 w-11 rounded-2xl border-white/5 hover:bg-white/10">
                                <MoreHorizontal className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="glass border-white/10 bg-[#0f111a] text-gray-200 min-w-[180px]">
                            <DropdownMenuLabel className="text-[10px] font-black uppercase text-gray-500 tracking-widest p-2">Member Control</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem className="p-2.5 cursor-pointer focus:bg-white/5">
                                <Shield className="mr-2 h-4 w-4 text-violet-400" />
                                <span className="text-sm font-medium">Elevate Privileges</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="p-2.5 cursor-pointer focus:bg-white/5">
                                <Calendar className="mr-2 h-4 w-4 text-blue-400" />
                                <span className="text-sm font-medium">Review Performance</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem className="p-2.5 cursor-pointer text-red-400 focus:text-red-300 focus:bg-red-500/10">
                                <UserX className="mr-2 h-4 w-4" />
                                <span className="text-sm font-bold uppercase tracking-tight">Revoke Access</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <PerformanceCard
                    label="Completed"
                    value={member.tasksCompleted}
                    icon={<CheckCircle2 className="h-5 w-5" />}
                    color="text-emerald-400"
                    glow="shadow-emerald-500/10"
                />
                <PerformanceCard
                    label="Active"
                    value={member.tasksInProgress}
                    icon={<Loader2 className="h-5 w-5" />}
                    color="text-violet-400"
                    glow="shadow-violet-500/10"
                />
                <PerformanceCard
                    label="Pipeline"
                    value={member.tasksPending}
                    icon={<Clock className="h-5 w-5" />}
                    color="text-blue-400"
                    glow="shadow-blue-500/10"
                />
                <PerformanceCard
                    label="Success Rate"
                    value="98.2%"
                    icon={<Trophy className="h-5 w-5" />}
                    color="text-amber-400"
                    glow="shadow-amber-500/10"
                />
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Tasks List */}
                <Card className="lg:col-span-2 glass border-white/5 bg-[#161726]/40 shadow-2xl">
                    <CardHeader className="pb-6 border-b border-white/[0.04]">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-lg font-black text-gray-100 uppercase tracking-widest">Assigned Inventory</CardTitle>
                                <CardDescription className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">
                                    Current and historical tasks for {member.name.split(' ')[0]}
                                </CardDescription>
                            </div>
                            <Button variant="ghost" className="text-[10px] uppercase font-black tracking-widest h-8 px-3 glass border-white/5 hover:bg-white/10">
                                View Full History
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6 px-0">
                        <div className="space-y-1">
                            {tasks.map((task) => (
                                <div key={task.id} className="group flex items-center justify-between p-4 hover:bg-white/[0.03] transition-colors border-b border-white/[0.02] last:border-0 border-l-2 border-l-transparent hover:border-l-indigo-500">
                                    <div className="flex items-center gap-5 flex-1 min-w-0">
                                        <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'
                                            } shadow-[0_0_8px] shadow-current opacity-80`} />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-1">
                                                <p className={`font-bold text-sm tracking-tight truncate ${task.status === 'done' ? 'line-through text-gray-600' : 'text-gray-100'}`}>
                                                    {task.title}
                                                </p>
                                                {getStatusBadge(task.status)}
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-tight">
                                                <span className="text-indigo-400/80">{task.room}</span>
                                                <span className="h-1 w-1 rounded-full bg-gray-800" />
                                                <span>Deadline: {task.due}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10 rounded-xl">
                                            <ExternalLink className="h-4 w-4 text-gray-500" />
                                        </Button>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10 rounded-xl">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="glass border-white/10 bg-[#0f111a] text-gray-200">
                                                <DropdownMenuLabel className="text-[9px] uppercase font-black text-gray-500">Quick Override</DropdownMenuLabel>
                                                <DropdownMenuSeparator className="bg-white/10" />
                                                <DropdownMenuItem onClick={() => updateTaskStatus(task.id, "pending")} className="cursor-pointer">Force Backlog</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => updateTaskStatus(task.id, "inProgress")} className="cursor-pointer text-indigo-400">Force Active</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => updateTaskStatus(task.id, "done")} className="cursor-pointer text-emerald-400">Mark Completed</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Network & Presence */}
                <div className="space-y-8">
                    <Card className="glass border-white/5 bg-[#161726]/40 shadow-2xl p-1">
                        <CardHeader className="pb-6 pt-6 px-6">
                            <CardTitle className="text-base font-black text-gray-100 uppercase tracking-widest">Active Shards</CardTitle>
                            <CardDescription className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Rooms currently occupied</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 px-6 pb-8">
                            {rooms.map((room) => (
                                <Link key={room.id} href={`/owner/rooms/${room.id}`} className="group/room block">
                                    <div className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.02] group-hover/room:bg-indigo-500/5 group-hover/room:border-indigo-500/20 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-indigo-600/20 group-hover/room:scale-110 transition-transform">
                                                {room.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-100 text-sm">{room.name}</p>
                                                <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest">{room.role}</p>
                                            </div>
                                        </div>
                                        <ArrowLeft className="h-4 w-4 rotate-180 opacity-0 group-hover/room:opacity-100 group-hover/room:translate-x-1 transition-all text-indigo-400" />
                                    </div>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="glass border-indigo-500/10 bg-indigo-500/[0.02]">
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500/60">Bio & Brief</p>
                                <p className="text-sm text-gray-400 font-medium leading-relaxed italic">{member.bio}</p>
                                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-gray-600 uppercase">Availability</span>
                                    <Badge className="bg-emerald-500/10 text-emerald-500 border-0 h-5 px-2 text-[9px] font-black uppercase italic">Full-Time</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function PerformanceCard({ label, value, icon, color, glow }: any) {
    return (
        <Card className={`glass border-white/5 bg-[#161726]/40 shadow-xl ${glow}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{label}</CardTitle>
                <div className={`${color} opacity-40`}>{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-black text-white">{value}</div>
            </CardContent>
        </Card>
    )
}
