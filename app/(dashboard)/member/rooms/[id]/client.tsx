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
    Users,
    MoreHorizontal,
    CheckCircle2,
    Clock,
    Loader2,
    ArrowLeft,
    Calendar
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
    assignedTo: string
}

interface Member {
    id: number
    name: string
    email: string
    role: "admin" | "member"
}

interface MemberRoomDetailClientProps {
    id: string
}

export default function MemberRoomDetailClient({ id }: MemberRoomDetailClientProps) {
    // Mock data - in real app, fetch based on id
    const room = {
        id: id,
        name: "Website Redesign",
        description: "Complete overhaul of company website with modern design and improved UX",
        status: "active" as const,
        createdDate: "Jan 15, 2024"
    }

    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: "Fix navigation bug", priority: "High", due: "Today", status: "inProgress", assignedTo: "You" },
        { id: 2, title: "Update homepage design", priority: "High", due: "Tomorrow", status: "pending", assignedTo: "Bob Johnson" },
        { id: 3, title: "Optimize images", priority: "Medium", due: "Next Week", status: "pending", assignedTo: "Sarah Williams" },
        { id: 4, title: "Add contact form", priority: "Low", due: "Next Week", status: "done", assignedTo: "You" },
    ])

    const members: Member[] = [
        { id: 1, name: "Alice Smith", email: "alice@example.com", role: "admin" },
        { id: 2, name: "Bob Johnson", email: "bob@example.com", role: "member" },
        { id: 3, name: "Sarah Williams", email: "sarah@example.com", role: "member" },
        { id: 4, name: "You", email: "john@example.com", role: "member" },
    ]

    const updateTaskStatus = (taskId: number, newStatus: TaskStatus) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
        ))
    }

    const pendingCount = tasks.filter(t => t.status === "pending").length
    const doneCount = tasks.filter(t => t.status === "done").length
    const inProgressCount = tasks.filter(t => t.status === "inProgress").length
    const myTasksCount = tasks.filter(t => t.assignedTo === "You").length

    return (
        <div className="space-y-10 animate-fade-in-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4">
                    <Link href="/member" className="flex items-center gap-2 text-gray-500 hover:text-white transition-all w-fit group">
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Dashboard Overview</span>
                    </Link>
                    <div className="flex items-center gap-5">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-[1px] shadow-2xl shadow-indigo-600/20 ring-1 ring-white/10">
                            <div className="w-full h-full rounded-2xl bg-[#0f111a] flex items-center justify-center text-indigo-400 font-black text-2xl italic">
                                {room.name.substring(0, 2).toUpperCase()}
                            </div>
                        </div>
                        <div>
                            <h1 className="text-4xl font-black tracking-tight text-white mb-1.5">{room.name}</h1>
                            <div className="flex items-center gap-3">
                                <p className="text-gray-400 text-sm">{room.description}</p>
                                <span className="h-1 w-1 rounded-full bg-gray-700" />
                                <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest border-emerald-500/20 text-emerald-400/80 bg-emerald-500/5 px-2">
                                    {room.status}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex -space-x-3 overflow-hidden p-1">
                        {members.slice(0, 4).map((member) => (
                            <Avatar key={member.id} className="inline-block h-10 w-10 ring-4 ring-[#0f111a] hover:z-10 transition-all hover:-translate-y-1">
                                <AvatarFallback className="text-[10px] font-bold bg-zinc-800 text-gray-400">
                                    {member.name === "You" ? "JD" : member.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                        ))}
                        {members.length > 4 && (
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600/20 text-indigo-400 text-xs font-bold border-2 border-[#0f111a] ring-4 ring-[#0f111a]">
                                +{members.length - 4}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Premium Stats Row */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="My Workspace Tasks"
                    value={myTasksCount}
                    icon={<Users className="h-5 w-5" />}
                    color="text-orange-400"
                    bg="bg-orange-500/5"
                    border="border-orange-500/20"
                />
                <StatCard
                    title="In Progress"
                    value={inProgressCount}
                    icon={<Loader2 className="h-5 w-5" />}
                    color="text-purple-400"
                    bg="bg-purple-500/5"
                    border="border-purple-500/20"
                />
                <StatCard
                    title="Awaiting Review"
                    value={pendingCount}
                    icon={<Clock className="h-5 w-5" />}
                    color="text-blue-400"
                    bg="bg-blue-500/5"
                    border="border-blue-500/20"
                />
                <StatCard
                    title="Completed"
                    value={doneCount}
                    icon={<CheckCircle2 className="h-5 w-5" />}
                    color="text-emerald-400"
                    bg="bg-emerald-500/5"
                    border="border-emerald-500/20"
                />
            </div>

            {/* Kanban Board */}
            <div className="grid gap-6 lg:grid-cols-3 min-h-[600px] pb-10">
                <KanbanColumn
                    title="Backlog"
                    count={pendingCount}
                    color="bg-blue-600"
                    tasks={tasks.filter(t => t.status === "pending")}
                    onStatusChange={updateTaskStatus}
                />
                <KanbanColumn
                    title="In Development"
                    count={inProgressCount}
                    color="bg-violet-600"
                    tasks={tasks.filter(t => t.status === "inProgress")}
                    onStatusChange={updateTaskStatus}
                />
                <KanbanColumn
                    title="Prod / Done"
                    count={doneCount}
                    color="bg-emerald-600"
                    tasks={tasks.filter(t => t.status === "done")}
                    onStatusChange={updateTaskStatus}
                />
            </div>
        </div>
    )
}

function StatCard({ title, value, icon, color, bg, border }: any) {
    return (
        <Card className={`glass border-transparent ${bg} ${border} ring-1 ring-white/5 shadow-xl`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    {title}
                </CardTitle>
                <div className={`${color} opacity-40`}>{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-black text-white">{value}</div>
            </CardContent>
        </Card>
    )
}

function KanbanColumn({ title, count, color, tasks, onStatusChange }: any) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                    <div className={`h-1.5 w-1.5 rounded-full ${color} shadow-[0_0_12px] shadow-current`} />
                    <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest">{title}</h3>
                </div>
                <Badge variant="outline" className="bg-white/5 border-white/5 text-gray-600 h-5 px-1.5 text-[9px] font-black">
                    {count}
                </Badge>
            </div>
            <div className="flex-1 space-y-3 p-1 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                {tasks.map((task: any) => (
                    <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} />
                ))}
                {tasks.length === 0 && (
                    <div className="flex items-center justify-center py-10 opacity-20">
                        <div className="text-center space-y-2">
                            <Clock className="h-5 w-5 mx-auto" />
                            <p className="text-[10px] uppercase tracking-tighter font-bold">Queue Empty</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function TaskCard({ task, onStatusChange }: { task: Task, onStatusChange: (id: number, status: TaskStatus) => void }) {
    const isAssignedToMe = task.assignedTo === "You"

    return (
        <Card className="glass group border-white/5 bg-[#1a1c2e]/40 hover:bg-[#20223b]/60 hover:border-violet-500/20 transition-all duration-300 shadow-lg">
            <CardContent className="p-4 space-y-4">
                <div className="flex items-start justify-between">
                    <Badge className={`text-[9px] font-black uppercase tracking-tighter px-1.5 py-0 border-0 ${task.priority === 'High' ? 'bg-red-500/10 text-red-500/80 shadow-[inset_0_0_4px_rgba(239,68,68,0.2)]' :
                            task.priority === 'Medium' ? 'bg-amber-500/10 text-amber-500/80 shadow-[inset_0_0_4px_rgba(245,158,11,0.2)]' :
                                'bg-blue-500/10 text-blue-500/80 shadow-[inset_0_0_4px_rgba(59,130,246,0.2)]'
                        }`}>
                        {task.priority}
                    </Badge>
                    {isAssignedToMe && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-600 hover:text-white-200 transition-colors rounded-lg">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="glass border-white/10 bg-[#0f111a] text-gray-200">
                                <DropdownMenuLabel className="text-[10px] font-bold opacity-40 uppercase tracking-widest p-2">Status Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-white/10" />
                                <DropdownMenuItem onClick={() => onStatusChange(task.id, "pending")} disabled={task.status === "pending"}>
                                    Move to Backlog
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onStatusChange(task.id, "inProgress")} disabled={task.status === "inProgress"}>
                                    Start Progress
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onStatusChange(task.id, "done")} disabled={task.status === "done"}>
                                    Mark as Finished
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>

                <Link href={`/member/tasks/${task.id}`} className="block">
                    <h4 className={`font-bold text-sm tracking-tight leading-snug group-hover:text-violet-400 transition-colors ${task.status === 'done' ? 'line-through text-gray-600 opacity-60' : 'text-gray-100'
                        }`}>
                        {task.title}
                    </h4>
                </Link>

                <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5 border border-white/5 ring-2 ring-transparent group-hover:ring-violet-500/20 transition-all">
                            <AvatarFallback className="text-[8px] font-black bg-zinc-800 text-gray-400">
                                {task.assignedTo === "You" ? "JD" : task.assignedTo.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-[10px] font-bold text-gray-500">{task.assignedTo === "You" ? "JD (You)" : task.assignedTo}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] font-black text-gray-600 uppercase italic">
                        <Calendar className="h-3 w-3" />
                        {task.due}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
