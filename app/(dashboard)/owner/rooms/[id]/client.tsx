"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
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
    UserPlus,
    Plus,
    Settings as SettingsIcon,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { CreateTaskDialog } from "@/components/dashboard/create-task-dialog"

type TaskStatus = "pending" | "inProgress" | "done"

interface Task {
    id: number
    title: string
    priority: "High" | "Medium" | "Low"
    due: string
    status: TaskStatus
    description?: string
    assignedTo: string
}

interface Member {
    id: number
    name: string
    email: string
    role: "owner" | "admin" | "member"
}

interface RoomDetailClientProps {
    id: string
}

export default function RoomDetailClient({ id }: RoomDetailClientProps) {
    
    const room = {
        id: id,
        name: "Website Redesign",
        description: "Complete overhaul of company website with modern design and improved UX",
        status: "active" as const,
        createdDate: "Jan 15, 2024"
    }

    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: "Fix navigation bug", priority: "High", due: "Today", status: "inProgress", assignedTo: "Alice Smith" },
        { id: 2, title: "Update homepage design", priority: "High", due: "Tomorrow", status: "pending", assignedTo: "Bob Johnson" },
        { id: 3, title: "Optimize images", priority: "Medium", due: "Next Week", status: "pending", assignedTo: "Sarah Williams" },
        { id: 4, title: "Add contact form", priority: "Low", due: "Next Week", status: "done", assignedTo: "Alice Smith" },
    ])

    const members: Member[] = [
        { id: 1, name: "Alice Smith", email: "alice@example.com", role: "admin" },
        { id: 2, name: "Bob Johnson", email: "bob@example.com", role: "member" },
        { id: 3, name: "Sarah Williams", email: "sarah@example.com", role: "member" },
    ]

    const updateTaskStatus = (taskId: number, newStatus: TaskStatus) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
        ))
    }

    const getStatusBadge = (status: TaskStatus) => {
        switch (status) {
            case "done":
                return <Badge variant="success" className="gap-1"><CheckCircle2 className="h-3 w-3" />Done</Badge>
            case "inProgress":
                return <Badge variant="inProgress" className="gap-1"><Loader2 className="h-3 w-3" />In Progress</Badge>
            case "pending":
                return <Badge variant="pending" className="gap-1"><Clock className="h-3 w-3" />Pending</Badge>
        }
    }

    const pendingCount = tasks.filter(t => t.status === "pending").length
    const doneCount = tasks.filter(t => t.status === "done").length
    const inProgressCount = tasks.filter(t => t.status === "inProgress").length

    const handleCreateTask = (newTask: any) => {
        const task: Task = {
            id: tasks.length + 1,
            title: newTask.title,
            priority: newTask.priority,
            due: newTask.due,
            status: "pending",
            assignedTo: newTask.assignedTo
        }
        setTasks([...tasks, task])
    }

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Link href="/owner/rooms" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm">Back to Rooms</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-indigo-500/20 ring-1 ring-white/20">
                            {room.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-white mb-1">{room.name}</h1>
                            <p className="text-gray-400 text-sm max-w-xl">{room.description}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2 glass border-white/10 hover:bg-white/5">
                        <UserPlus className="h-4 w-4" />
                        Add Member
                    </Button>
                    <CreateTaskDialog onCreate={handleCreateTask} members={members} />
                </div>
            </div>

            {/* Stats Dashboard */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="glass border-blue-500/20 bg-blue-500/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
                        <Clock className="h-12 w-12 text-blue-400" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-blue-100">Pending</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white mb-1">{pendingCount}</div>
                        <p className="text-xs text-blue-300/60">Tasks awaiting start</p>
                    </CardContent>
                </Card>
                <Card className="glass border-purple-500/20 bg-purple-500/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
                        <Loader2 className="h-12 w-12 text-purple-400" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-purple-100">In Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white mb-1">{inProgressCount}</div>
                        <p className="text-xs text-purple-300/60">Currently active</p>
                    </CardContent>
                </Card>
                <Card className="glass border-green-500/20 bg-green-500/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="h-12 w-12 text-green-400" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-green-100">Completed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white mb-1">{doneCount}</div>
                        <p className="text-xs text-green-300/60">Finished tasks</p>
                    </CardContent>
                </Card>
                <Card className="glass border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
                        <Users className="h-12 w-12 text-gray-400" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">Team Size</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white mb-1">{members.length}</div>
                        <p className="text-xs text-gray-400">Collaborators</p>
                    </CardContent>
                </Card>
            </div>

            {/* Kanban Board */}
            <div className="grid gap-6 lg:grid-cols-3 min-h-[500px]">
                {/* Column Components */}
                <KanbanColumn
                    title="Pending"
                    count={pendingCount}
                    color="bg-blue-500"
                    tasks={tasks.filter(t => t.status === "pending")}
                    onStatusChange={updateTaskStatus}
                />
                <KanbanColumn
                    title="In Progress"
                    count={inProgressCount}
                    color="bg-violet-500"
                    tasks={tasks.filter(t => t.status === "inProgress")}
                    onStatusChange={updateTaskStatus}
                />
                <KanbanColumn
                    title="Done"
                    count={doneCount}
                    color="bg-emerald-500"
                    tasks={tasks.filter(t => t.status === "done")}
                    onStatusChange={updateTaskStatus}
                />
            </div>
        </div>
    )
}

function KanbanColumn({ title, count, color, tasks, onStatusChange }: {
    title: string,
    count: number,
    color: string,
    tasks: Task[],
    onStatusChange: (id: number, status: TaskStatus) => void
}) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between glass px-4 py-2 rounded-xl border-white/5 bg-white/5">
                <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${color} shadow-[0_0_8px] shadow-current`} />
                    <h3 className="font-semibold text-white text-sm">{title}</h3>
                </div>
                <Badge variant="outline" className="bg-white/5 border-white/10 text-gray-400 px-2 h-5 text-[10px] font-bold">
                    {count}
                </Badge>
            </div>
            <div className="space-y-3">
                {tasks.map((task) => (
                    <KanbanTaskCard key={task.id} task={task} onStatusChange={onStatusChange} />
                ))}
                {tasks.length === 0 && (
                    <div className="h-24 rounded-xl border border-dashed border-white/5 flex items-center justify-center">
                        <p className="text-xs text-gray-500 italic">No tasks here</p>
                    </div>
                )}
            </div>
        </div>
    )
}

function KanbanTaskCard({ task, onStatusChange }: { task: Task, onStatusChange: (id: number, status: TaskStatus) => void }) {
    return (
        <Card className="glass border-white/5 bg-[#16161e]/40 hover:bg-white/5 hover:border-violet-500/30 transition-all group overflow-hidden">
            <CardContent className="p-4 space-y-4">
                <div className="flex items-start justify-between gap-2">
                    <Badge className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0 border-0 ${task.priority === 'High' ? 'bg-red-500/10 text-red-400' :
                            task.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                                'bg-blue-500/10 text-blue-400'
                        }`}>
                        {task.priority}
                    </Badge>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-500 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="glass border-white/10 bg-[#0f111a] text-gray-200 min-w-[140px]">
                            <DropdownMenuLabel className="text-[10px] uppercase text-gray-500 font-bold p-2">Move to</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem
                                onClick={() => onStatusChange(task.id, "pending")}
                                disabled={task.status === "pending"}
                                className="text-sm px-3 py-2 cursor-pointer focus:bg-white/5"
                            >
                                Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onStatusChange(task.id, "inProgress")}
                                disabled={task.status === "inProgress"}
                                className="text-sm px-3 py-2 cursor-pointer focus:bg-white/5"
                            >
                                In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onStatusChange(task.id, "done")}
                                disabled={task.status === "done"}
                                className="text-sm px-3 py-2 cursor-pointer focus:bg-white/5"
                            >
                                Done
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem className="text-sm px-3 py-2 text-red-400 focus:text-red-300 p-2 cursor-pointer focus:bg-red-500/10">
                                Delete Task
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <Link href={`/owner/tasks/${task.id}`} className="group/title block">
                    <h4 className={`font-semibold text-sm leading-snug group-hover/title:text-violet-400 transition-colors ${task.status === 'done' ? 'line-through text-gray-500' : 'text-gray-100'
                        }`}>
                        {task.title}
                    </h4>
                </Link>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6 border border-white/10 ring-2 ring-transparent group-hover:ring-violet-500/20 transition-all">
                            <AvatarFallback className="text-[9px] font-bold bg-violet-500/20 text-violet-300 italic">
                                {task.assignedTo.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-[11px] font-medium text-gray-400">{task.assignedTo}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-500 bg-white/5 px-2 py-0.5 rounded-md">
                        <Calendar className="h-3 w-3" />
                        {task.due}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
