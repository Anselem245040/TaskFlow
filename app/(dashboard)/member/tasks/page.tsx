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
    CheckCircle2,
    Clock,
    Loader2,
    MoreHorizontal,
    Filter,
    Search
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
import { Input } from "@/components/ui/input"

type TaskStatus = "pending" | "inProgress" | "done"

interface Task {
    id: number
    title: string
    priority: "High" | "Medium" | "Low"
    due: string
    project: string
    status: TaskStatus
    assignedBy: string
}

export default function MemberTasksPage() {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: "Fix navigation bug", priority: "High", due: "Today", project: "Website Redesign", status: "inProgress", assignedBy: "John Doe" },
        { id: 2, title: "Update documentation", priority: "Medium", due: "Tomorrow", project: "App Core", status: "pending", assignedBy: "Alice Smith" },
        { id: 3, title: "Review PR #45", priority: "Low", due: "Next Week", project: "App Core", status: "pending", assignedBy: "Bob Johnson" },
        { id: 4, title: "Design new landing page", priority: "High", due: "Today", project: "Marketing", status: "done", assignedBy: "Sarah Williams" },
        { id: 5, title: "Implement user authentication", priority: "High", due: "Tomorrow", project: "App Core", status: "inProgress", assignedBy: "John Doe" },
        { id: 6, title: "Write unit tests", priority: "Medium", due: "Next Week", project: "Website Redesign", status: "pending", assignedBy: "Alice Smith" },
        { id: 7, title: "Optimize database queries", priority: "High", due: "Today", project: "App Core", status: "done", assignedBy: "Bob Johnson" },
        { id: 8, title: "Create API documentation", priority: "Low", due: "Next Month", project: "App Core", status: "pending", assignedBy: "John Doe" },
    ])

    const [filter, setFilter] = useState<TaskStatus | "all">("all")

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

    const filteredTasks = filter === "all" ? tasks : tasks.filter(t => t.status === filter)
    const pendingCount = tasks.filter(t => t.status === "pending").length
    const doneCount = tasks.filter(t => t.status === "done").length
    const inProgressCount = tasks.filter(t => t.status === "inProgress").length

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">My Tasks</h1>
                    <p className="text-gray-400 mt-2">View and manage all your assigned tasks.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input className="pl-9 w-64" placeholder="Search tasks..." />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2">
                                <Filter className="h-4 w-4" />
                                Filter
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setFilter("all")} className="cursor-pointer">
                                All Tasks
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilter("pending")} className="cursor-pointer">
                                Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilter("inProgress")} className="cursor-pointer">
                                In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilter("done")} className="cursor-pointer">
                                Done
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="bg-gradient-to-br from-slate-500/10 to-gray-500/10 border-slate-500/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">
                            All Tasks
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{tasks.length}</div>
                        <p className="text-xs text-gray-400">
                            Total assigned
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">
                            Pending
                        </CardTitle>
                        <Clock className="h-4 w-4 text-blue-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{pendingCount}</div>
                        <p className="text-xs text-gray-400">
                            Waiting to start
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">
                            In Progress
                        </CardTitle>
                        <Loader2 className="h-4 w-4 text-purple-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{inProgressCount}</div>
                        <p className="text-xs text-gray-400">
                            Currently working
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">
                            Completed
                        </CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{doneCount}</div>
                        <p className="text-xs text-gray-400">
                            This week
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Tasks List */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        {filter === "all" ? "All Tasks" : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Tasks`}
                    </CardTitle>
                    <CardDescription>
                        {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} found
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {filteredTasks.map((task) => (
                            <div key={task.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className={`h-3 w-3 rounded-full ${task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className={`font-medium ${task.status === 'done' ? 'line-through text-gray-500' : 'text-white'}`}>
                                                {task.title}
                                            </p>
                                            {getStatusBadge(task.status)}
                                        </div>
                                        <p className="text-xs text-gray-400">
                                            {task.project} • Due {task.due} • Assigned by {task.assignedBy}
                                        </p>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() => updateTaskStatus(task.id, "pending")}
                                            className="cursor-pointer"
                                        >
                                            <Clock className="mr-2 h-4 w-4 text-blue-400" />
                                            <span>Pending</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => updateTaskStatus(task.id, "inProgress")}
                                            className="cursor-pointer"
                                        >
                                            <Loader2 className="mr-2 h-4 w-4 text-purple-400" />
                                            <span>In Progress</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => updateTaskStatus(task.id, "done")}
                                            className="cursor-pointer"
                                        >
                                            <CheckCircle2 className="mr-2 h-4 w-4 text-green-400" />
                                            <span>Done</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
